'use client';
import "./login.scss";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

export default function Login() {
    const [users, setUsers] = useState([]); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const router = useRouter();
    const { t } = useTranslation();

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
                toast.error(t("error.loadingUsers"));
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            toast.success(t("login.success"));
            localStorage.setItem("token", user.email);
            localStorage.setItem("id", user.id);
            setTimeout(() => {
                router.push("/");
            }, 2000);
            setTimeout(() => {
                window.location.reload();
            }, 2600);
        } else {
            toast.error(t("login.invalidCredentials"));
        }
    };

    return (
        <div className="login">
            <div className="login-wrapper">
                <span className="login-title">{t("login.title")}</span>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">{t("login.emailLabel")}</label>
                    <input
                        id="email"
                        type="email"
                        placeholder={t("login.emailPlaceholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">{t("login.passwordLabel")}</label>
                    <input
                        id="password"
                        type="password"
                        placeholder={t("login.passwordPlaceholder")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">
                        {t("login.submitButton")}
                    </button>
                    <Link href="registr">{t("login.noAccount")}</Link>
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
