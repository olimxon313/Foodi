'use client';
import "./registr.scss";
import { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; // Импортируйте useTranslation

export default function Registr() {
    const router = useRouter();
    const { t } = useTranslation(); // Инициализация перевода
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        basket: [],
        confirmPassword: "",
        id: Math.random()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, basket, id } = formData;

        if (!email || !password || !confirmPassword) {
            toast.error(t("registr.error.missingFields"));
            return;
        }
        if (password !== confirmPassword) {
            toast.error(t("registr.error.passwordMismatch"));
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/users");
            const users = await response.json();

            const userExists = users.some((user) => user.email === email);
            if (userExists) {
                toast.error(t("registr.error.userExists"));
                return;
            }
            const newUser = { email, password, basket, id };
            await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            toast.success(t("registr.success"));
            setFormData({ email: "", password: "", confirmPassword: "", id: Math.random() });
            setTimeout(() => router.push("/login"), 2000);
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error(t("registr.error.registrationFailed"));
        }
    };

    return (
        <div className="registr">
            <div className="registr-wrapper">
                <h1 className="registr-title">{t("registr.title")}</h1>
                <form className="registr-form" onSubmit={handleRegister}>
                    <label>{t("registr.emailLabel")}</label>
                    <input
                        type="email"
                        name="email"
                        placeholder={t("registr.emailPlaceholder")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>{t("registr.passwordLabel")}</label>
                    <input
                        type="password"
                        name="password"
                        placeholder={t("registr.passwordPlaceholder")}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <label>{t("registr.confirmPasswordLabel")}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t("registr.confirmPasswordPlaceholder")}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="registr-button">
                        {t("registr.submitButton")}
                    </button>
                    <Link href="login">{t("registr.alreadyAccount")}</Link>
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
