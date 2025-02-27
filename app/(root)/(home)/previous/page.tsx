import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='text-3xl font-bold'>
                <h1>Previous</h1>
                <CallList type='ended' />
            </div>
        </section>
    )
}

export default Previous