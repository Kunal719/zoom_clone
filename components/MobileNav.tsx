"use client"

import React from 'react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src='/icons/hamburger.svg' height={36} width={36} alt='hamburgerIcon' className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side='left' className='bg-dark-1 text-white border-none'>
                    <Link href='/' className='flex items-center gap-1'>
                        <Image src='/icons/logo.svg' width={32} height={32} alt='Zoom logo' className='max-sm:size-10' />
                        <p className='text-[26px] text-white'>Zoom</p>
                    </Link>

                    <div className='flex flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.route;

                                    return (
                                        <SheetClose asChild key={link.route}>
                                            <Link href={link.route} key={link.label} className={cn('flex gap-4 w-full max-w-60 items-center p-4 rouned-lg', { 'bg-blue-1': isActive })}>
                                                <Image src={link.imgURL} width={20} height={20} alt={link.label} />
                                                <p className='font-semibold'>{link.label}</p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav