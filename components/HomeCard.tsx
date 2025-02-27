import React from 'react'
import Image from 'next/image'

type HomeCardProps = {
    image: string
    title: string
    description: string
    handleClick: () => void
    bgColor: string
};

const HomeCard = ({ image, title, description, handleClick, bgColor }: HomeCardProps) => {
    return (
        <div
            className={`${bgColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
            onClick={handleClick}
        >
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image src={image} height={27} width={27} alt='Add Meeting' />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{description}</p>
            </div>
        </div>
    )
}

export default HomeCard