'use client'

import { useEffect, useRef, useState } from "react"

export const Popup = (props: { ms?: number }) => {
    const { ms = 2500 } = props
    // delay its render by 5 sec
    const [render, setRender] = useState<boolean>(true)
    const popupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setTimeout(() => {
            popupRef.current?.classList.remove('opacity-0')
            popupRef.current?.classList.add('opacity-100')
        }, ms)
    }, [ms])
    if (!render) return null

    return (
        <div className="absolute bottom-2 right-2 h-fit w-96 bg-neutral-100 rounded-lg shadow-lg p-4 border-2 border-black space-y-4 opacity-0 transition-all duration-750" ref={popupRef}>
            <h1 className="text-lg font-thin"> Do you want to add a new device? </h1>
            <div className="flex gap-4">
                <button
                    className="bg-primary text-white rounded-lg p-2 w-1/2"
                    onClick={() => { setRender(false) }}
                >
                    Yes
                </button>
                <button
                    onClick={() => { setRender(false) }}
                    className="bg-neutral-300 text-neutral-700 rounded-lg p-2 w-1/2"
                >
                    No
                </button>
            </div>
        </div>
    )
}