'use client';
import { useState } from 'react';
import Link from 'next/link';
import { IoCartSharp } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import './header.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

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
                        <RiSearchLine className="search" />
                        <button className="member">Become a Member</button>
                    </div>
                )}
            </div>
            <div className="logo">
                <img src={'/images/Logo.png'} alt="Logo" />
            </div>
            {!menuOpen && (
                <div className="icons">
                    <IoCartSharp className="cart" />
                    <RiSearchLine className="search" />
                    <button className="member">Become a Member</button>
                </div>
            )}
        </div>
    );
}
