"use client"

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from "@/components/ui/input"

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isInstantMeeting' | 'isJoiningMeeting' | undefined>()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()

    const router = useRouter();

    const user = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!user || !client) return;

        try {
            if (!values.dateTime) {
                toast({ title: 'Error', description: 'Please select a date and time', variant: 'destructive' });
            }
            const id = crypto.randomUUID();

            const call = client.call('default', id);

            if (!call) {
                throw new Error('Failed to create a call')
            }

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast({ title: 'Success', description: 'Meeting created successfully', variant: 'default' });
        } catch (error) {
            console.log(error);
            toast({ title: 'Error', description: 'Failed to create a meeting', variant: 'destructive' });

        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                image='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start a new meeting'
                handleClick={() => { setMeetingState('isInstantMeeting') }}
                bgColor='bg-orange-1'
            />
            <HomeCard
                image='/icons/join-meeting.svg'
                title='Join Meeting'
                description='via Invitation Link'
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
                bgColor='bg-blue-1'
            />
            <HomeCard
                image='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={() => { setMeetingState('isScheduleMeeting') }}
                bgColor='bg-purple-1'
            />
            <HomeCard
                image='/icons/recordings.svg'
                title='View Recordings'
                description='Meeting Recordings'
                handleClick={() => { router.push('/recordings') }}
                bgColor='bg-yellow-1'
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => { setMeetingState(undefined) }}
                    title='Create a meeting'
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-sky-2 leading-[22px]'>Add a description</label>
                        <Textarea
                            className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => { setValues({ ...values, description: e.target.value }) }}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-2.5'>
                        <label className='text-base text-sky-2 leading-[22px]'>Select Date and Time</label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={date => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='Time'
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => { setMeetingState(undefined) }}
                    title='Meeting Created'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: 'Link copied' })
                    }}
                    image='/icons/checked.svg'
                    btnIcon='/icons/copy.svg'
                    btnText='Copy Meeting Link'
                />
            )}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => { setMeetingState(undefined) }}
                title='Start an instant meeting'
                className='text-center'
                btnText='Start Meeting'
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => { setMeetingState(undefined) }}
                title='Type or paste the meeting link'
                className='text-center'
                btnText='Join Meeting'
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Meeting Link" className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList