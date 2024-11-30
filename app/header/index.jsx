'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoCartSharp } from "react-icons/io5";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import './header.scss';
import productsData from '../../db.json'; 

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setIsLogged(!!storedToken); 
    }, []);

    const products = productsData; 

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleSearch = () => {
        setSearchOpen((prev) => !prev);
        if (searchOpen) {
            setSearchValue('');
            setSearchResults([]);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);

        if (value.trim().length === 0) {
            setSearchResults([]);
        } else {
            const result = products.filter((p) => 
                p.title && p.title.toLowerCase().includes(value)
            );
            setSearchResults(result.length ? result : [{ id: 0, title: "No results found" }]);
        }
    };

    return (
        <div className={`header ${menuOpen ? 'open' : ''}`} id="header">
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
            </div>
            <div className="logo">
                <img src={'/images/Logo.png'} alt="Logo" />
            </div>
            <div className="icons">
                <div className="language-dropdown">
                    <span className="selected-language">Русский</span>
                    <div className="dropdown-menu">
                        <div className="dropdown-item">Русский</div>
                        <div className="dropdown-item">Turkish</div>
                        <div className="dropdown-item">English</div>
                    </div>
                </div>

                
                <Link href="/basket"><IoCartSharp className="cart" /></Link>
                <div className="search-container">
                    <div className="search-icon" onClick={toggleSearch}>
                        {searchOpen ? <RiCloseLine className="close" /> : <RiSearchLine className="search" />}
                    </div>
                    {searchOpen && (
                        <div className="search-dropdown">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={handleSearch}
                                autoFocus
                            />
                            <ul className="search-results">
                                {searchResults.map((result) => (
                                    <li key={result.id}>
                                        {result.id !== 0 ? (
                                            <div className="search-item">
                                                <a href="#menu" onClick={() => { setSearchOpen(false); setMenuOpen(false); }}>
                                                    <div className="search-item-details">
                                                        <h4>{result.title}</h4>
                                                    </div>
                                                </a>
                                            </div>
                                        ) : (
                                            <span>{result.title}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {isLogged ? (
                    <Link href="/basket"><button className="member">Account</button></Link>
                ) : (
                    <Link href="/login"><button className="member">Become a Member</button></Link>
                )}
            </div>
        </div>
    );
}
