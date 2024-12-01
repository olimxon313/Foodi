'use client';
import "./basket.scss";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next"; // Импортируйте useTranslation

export default function Basket() {
    const { t } = useTranslation(); // Инициализация перевода
    const [userBasket, setUserBasket] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [id, setId] = useState('');
    const [user , setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedId = localStorage.getItem("id");
        setIsLogged(!!storedToken);
        setId(storedId);
    }, []);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3001/users/${id}`)  
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data && data.basket) {
                        setUser(data);
                        setUserBasket(data.basket);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                    toast.error(t("basket.error.loadUsers"));
                });
        }
    }, [id]);

    function handleLogOut() {
        const isConfirmed = confirm("Are you sure?");
        if (isConfirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            setTimeout(() => {
                router.push('/');
            }, 2000);
            setTimeout(() => {
                window.location.reload();
            }, 2600);
        }
    }

    async function handleDeleteProduct(productId) {
        const isConfirmed = confirm(t("basket.confirmDelete"));
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3001/users/${id}`);
                const user = await response.json();
                if (!user) {
                    toast.error(t("basket.error.userNotFound"));
                    return;
                }

                const updatedBasket = user.basket.filter(product => product.id !== productId);
                const updatedUser = { ...user, basket: updatedBasket };

                await fetch(`http://localhost:3001/users/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedUser),
                });

                setUserBasket(updatedBasket);
                toast.success(t("basket.productRemoved"));
            } catch (error) {
                toast.error(t("basket.error.removeProduct"));
            }
        }
    }

    return (
        <>
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
            {isLogged ? (
                <div className="basket-container">
                    <h2 className="basket-header">{t("basket.title")}</h2>
                    <button className="basket-logout-button" onClick={() => handleLogOut()}>
                        {t("basket.logoutButton")}
                    </button>
                    <ul>
                        {userBasket.length > 0 ? (
                            userBasket.map((item, index) => (
                                <div key={index} className="basket-item">
                                    <img src={item.path} alt="" />
                                    <div>{item.description}</div>
                                    <div>{item.price}</div>
                                    <div>{item.title}</div>
                                    <div>{item.category}</div>
                                    <button className="basket-item-delete-button" onClick={() => handleDeleteProduct(item.id)}>
                                        {t("basket.productRemoved")}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="basket-empty-message">{t("basket.emptyBasketMessage")}</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>{t("basket.emptyBasketMessage")}</p>
            )}
        </>
    );
}
