import React from 'react'
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' });
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
                        Upcoming Meeting at 12:00 PM
                    </h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-4xl font-bold lg:text-7xl'>{time}</h1>
                        <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
                    </div>
                </div>
            </div>

            <MeetingTypeList />
        </section>
    )
}

export default Home