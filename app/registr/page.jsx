'use client';
import "./registr.scss";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Registr() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        basket : [],
        confirmPassword: "",
        id : Math.random()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword , basket ,id } = formData;

        if (!email || !password || !confirmPassword) {
            toast.error("All fields are required!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/users");
            const users = await response.json();

            const userExists = users.some((user) => user.email === email);
            if (userExists) {
                toast.error("User with this email already exists!");
                return;
            }
            const newUser = { email, password ,basket , id };
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            toast.success("Registration successful!");
            setFormData({ email: "", password: "", confirmPassword: "" ,id : Math.random()});
            setTimeout(() => router.push("/login"), 2000);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Failed to register. Please try again.");
        }
    };

    return (
        <div className="registr">
            <div className="registr-wrapper">
                <h1 className="registr-title">Register</h1>
                <form className="registr-form" onSubmit={handleRegister}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password..."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="registr-button">
                        Register
                    </button>
                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
}
