"use client"

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamOn, setIsMicCamOn] = useState(false);
    const call = useCall(); // contains access to mic and camera

    if (!call) {
        throw new Error('useCall must be used within a StreamCall component')
    }

    useEffect(() => {
        if (isMicCamOn) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamOn, call?.camera, call?.microphone])
    return (
        <div className='flex h-screen w-full items-center flex-col justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center font-medium'>
                    <input
                        className='mr-2'
                        type='checkbox'
                        checked={isMicCamOn}
                        onChange={(e) => setIsMicCamOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>

                <DeviceSettings />
            </div>
            <Button className='rounded-md bg-blue-1 px-4 py-2.5'
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}>
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup