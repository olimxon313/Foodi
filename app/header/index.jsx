'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IoCartSharp } from "react-icons/io5";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import './header.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // Для управления инпутом

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleSearch = () => setSearchOpen(!searchOpen); // Переключаем состояние инпута

    return (
        <div className={`header ${menuOpen ? 'open' : ''}`}>
            <div id="burger-menu-wrapper" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="links">
                <Link href="/" onClick={() => setMenuOpen(false)}>Welcome</Link>
                <Link href="#menu" onClick={() => setMenuOpen(false)}>Our Menu</Link>
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                {menuOpen && (
                    <div className="icons">
                        <IoCartSharp className="cart" />
                        <div className="search-container">
                            <div className="search-icon" onClick={toggleSearch}>
                                {searchOpen ? <RiCloseLine className="close" /> : <RiSearchLine className="search" />}
                            </div>
                            {searchOpen && (
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search..."
                                    autoFocus
                                />
                            )}
                        </div>
                        <button className="member">Become a Member</button>
                    </div>
                )}
            </div>
            <div className="logo">
                <img src={'/images/Logo.png'} alt="Logo" />
            </div>
            {!menuOpen && (
                <div className="icons">
                    <div>EN</div>
                    <IoCartSharp className="cart" />
                    <div className="search-container">
                        <div className="search-icon" onClick={toggleSearch}>
                            {searchOpen ? <RiCloseLine className="close" /> : <RiSearchLine className="search" />}
                        </div>
                        {searchOpen && (
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                autoFocus
                            />
                        )}
                    </div>
                    <button className="member">Become a Member</button>
                </div>
            )}
        </div>
    );
}
