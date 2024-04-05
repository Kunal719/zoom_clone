import React, { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='flex-center min-h-screen w-full'>
            {children}
        </main>
    )
}

export default RootLayout