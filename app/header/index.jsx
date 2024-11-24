'use client';
import Link from 'next/link';
import { IoCartSharp } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import './header.scss'

export default function Header() {
    return (
        <div className="header">
            <div className='links'>
            <Link href="/">Welcome</Link>
            <Link href="/menu">Our Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            </div>
            <div className='logo'>
                <img src={'/images/Logo.png'} alt="" />
            </div>
            <div className='icons'> 
            <IoCartSharp className='cart' />
            <RiSearchLine className='search' />
            <button className='member'>Become a Member</button>
            </div>
        </div>
    )
}