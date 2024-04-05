"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className='sticky left-0 flex min-h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route;

                    return (
                        <Link href={link.route} key={link.label} className={cn('flex gap-4 justify-start items-center p-4 rouned-lg', { 'bg-blue-1': isActive })}>
                            <Image src={link.imgURL} width={24} height={24} alt={link.label} />
                            <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar