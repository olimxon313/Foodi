'use client';
import "./login.scss";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Login() {
    const [users, setUsers] = useState([]); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const router = useRouter();
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users. Please try again later.");
            });
    }, []);
    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            toast.success("Login successful!");
            localStorage.setItem("token", user.email);
            localStorage.setItem("id", user.id);
            setTimeout(() => {
                router.push("/");
            },2000)
            setTimeout(() => {
                window.location.reload();
            },2600)
        } else {
            toast.error("Invalid email or password!");
        }
    };

    return (
        <div className="login">
            <div className="login-wrapper">
                <span className="login-title">Login</span>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                    <Link href="registr">don't have an account?</Link>
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
