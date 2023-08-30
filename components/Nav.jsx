"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  
  useEffect(() => {
    const setProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/icons/logo.jpg"
                alt="Loan Shark Logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <p className="logo_text">Loan Shark</p>
        </Link>

        {/*Desktop Navigation*/}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/loan-apply" className="black_btn">Apply for a Loan</Link>
                    <button type="button" className="outline_btn" onClick={signOut}>Sign Out</button>
                    <Link href="/profile" alt="profile">profileName</Link>
                </div>
            ) : (
                <>
                    {providers && 
                        Object.values(providers).map((providers) => (
                            <button type="button" onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))
                    }
                </>    
            )}
        </div>
    </nav>
  )
}

export default Nav;