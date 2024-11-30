'use client'
import "./basket.scss"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Basket() {
    const [userBasket, setUserBasket] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [id, setId] = useState('');
    const [user , setUser] = useState()
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
                    toast.error("Failed to load users. Please try again later.");
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
        const isConfirmed = confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3001/users/${id}`);
                const user = await response.json();
                if (!user) {
                    toast.error("User not found");
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
                toast.success("Product removed from basket");
            } catch (error) {
                toast.error("Error removing product from basket");
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
                    <h2 className="basket-header">Your Basket</h2>
                    <button className="basket-logout-button" onClick={() => handleLogOut()}>Log out</button>
                    <ul>
                        {userBasket.length > 0 ? (
                            userBasket.map((item, index) => (
                                <div key={index} className="basket-item">
                                    <img src={item.path} alt="" />
                                    <div>{item.description}</div>
                                    <div>{item.price}</div>
                                    <div>{item.title}</div>
                                    <div>{item.category}</div>
                                    <button className="basket-item-delete-button" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p className="basket-empty-message">Your basket is empty.</p>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Please log in to see your basket.</p>
            )}
        </>
    );
}
