import React from 'react'
import CallList from '@/components/CallList'

const Upcoming = () => {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='text-3xl font-bold'>
                <h1>Upcoming</h1>

                <CallList type='upcoming' />
            </div>
        </section>
    )
}

export default Upcoming