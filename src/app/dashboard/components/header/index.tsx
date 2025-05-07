"use client"

import Link from 'next/link'
import styles from '@/app/dashboard/components/header/styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/logo.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Header(){
    const router = useRouter();

    async function handLogout() {
        deleteCookie("session", {path: "/"})
        toast.success('Logout feito com sucesso!')
        router.replace("/")
    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image 
                        alt="Logo do dashboard"
                        src={logoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href='/dashboard/category'>
                        Categoria
                    </Link>
                    <Link href='/dashboard/product'>
                        Produto
                    </Link>

                    <form action={handLogout}>
                        <button>
                            <LogOutIcon size={24} color='#fff'/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}