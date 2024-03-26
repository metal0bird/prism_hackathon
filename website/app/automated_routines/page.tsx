'use client'
import routines from '@/automated_routines.json'
import { useState } from 'react'

type RoutineType = {
    name: string
    devices: string[]
}

const Routines: RoutineType[] = routines
type RoutineCardProps = {
    routine: RoutineType
    onClick: (routine: RoutineType) => void
}

const RoutineCard = (props: RoutineCardProps) => {
    const { routine, onClick } = props
    return (
        <div
            className="flex gap-2 border-2 border-black rounded-lg p-2 cursor-pointer"
            onClick={() => onClick(routine)}
        >
            <h3 className="text-thin">{routine.name}</h3>
        </div>
    )
}

const AutomatedRoutinesPage = () => {
    const [currentRoutine, setCurrentRoutine] = useState<RoutineType>()
    return (
        <div className='flex w-full justify-between h-screen'>
            <div className='w-1/2 border-r mr-2 h-full'>
                <h1 className="text-4xl font-bold underline pb-2">Devices</h1>
                <div className="flex flex-wrap gap-4">
                    {/* ROutines */}
                    {Routines.map((routine) => (
                        <RoutineCard routine={routine} key={routine.name} onClick={() => setCurrentRoutine(routine)} />
                    ))}
                </div>
            </div>
            <div className='w-1/2 ml-2'>
                {currentRoutine && (
                    <div>
                        <h1 className="text-4xl font-bold underline pb-2">{currentRoutine.name}</h1>
                        <div className="flex gap-4">
                            {currentRoutine.devices.map((device) => (
                                <div className="flex gap-2 border-2 border-black rounded-lg p-2 cursor-pointer w-fit" key={device}>
                                    <h3 className="text-thin">{device}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AutomatedRoutinesPage