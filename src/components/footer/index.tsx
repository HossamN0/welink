import React from 'react'
import Link from '../link'
import { Routes } from '@/constants/enums'

function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="pt-14 pb-10 content-container">
                <div className="h-0.5 bg-white/10 mb-4"></div>
                <div className="flex items-center justify-between *:opacity-50">
                    <Link href={`/${Routes.HOME}`} className="hover:opacity-100">Home Page</Link>
                    <p className="text-[12px]">&copy; 2025 All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
