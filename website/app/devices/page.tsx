import { Switch } from "@/components/ui/switch"
import devices from '@/device.json'

type DevicesType = {
}

const DEVICES: DevicesType = devices
type DeviceCardProps = {
    device: string
    on: boolean
}

const DeviceCard = (props: DeviceCardProps) => {
    const { device, on } = props
    return (
        <div className="flex gap-2 border-2 border-black rounded-lg p-2">
            <h3 className="text-thin">{device}</h3>
            <Switch defaultChecked={on} />
        </div>
    )
}

const DevicesPage = () => {
    return (
        <>
            <h1 className="text-4xl font-bold underline pb-2">Devices</h1>
            <div className="flex flex-col gap-4">
                {/* Devices */}
                {/* {Object.keys(DEVICES).map((room) => (
                    <div key={room} className="mb-2">
                        <h3 className="text-2xl font-bold pb-1">{room}</h3>
                        <div className="flex gap-2">
                            {Object.keys(DEVICES[room]).map((device) => (
                                <DeviceCard
                                    device={device}
                                    on={DEVICES[room][device].on}
                                    key={device}
                                />
                            ))}
                        </div>
                    </div>
                ))} */}
                {Object.keys(DEVICES).map((location) => (
                    <div key={location} className="mb-2">
                        <h3 className="text-2xl font-bold pb-1 uppercase">{location}</h3>
                        <div className="flex gap-2 flex-row">
                            {/* @ts-ignore */}
                            {Object.keys(DEVICES[location]).map((room) => (
                                <div className="flex flex-col gap-2 border-2 border-black p-4 rounded-lg" key={room}>
                                    <h5 className="text-xl font-bold pb-1">{room}</h5>
                                    <div className="flex gap-2">
                                        {/* @ts-ignore */}
                                        {Object.keys(DEVICES[location][room]["devices"]).map((device) => (
                                            <DeviceCard
                                                device={device}
                                                // @ts-ignore
                                                on={DEVICES[location][room]["devices"][device].state === 'on'}
                                                key={device}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DevicesPage
// {
//     "Beach House": {
//         "Living Room": {
//             "id": "beach_house_living_room_id",
//             "devices": {
//                 "light": {
//                     "id": "beach_house_living_room_light_id",
//                     "state": "off"
//                 },
//                 "tv": {
//                     "id": "beach_house_living_room_tv_id",
//                     "state": "off"
//                 },
//                 "ac": {
//                     "id": "beach_house_living_room_ac_id",
//                     "state": "off",
//                     "mode": "fan"
//                 }
//             }
//         },
//         "Bedroom": {
//             "id": "beach_house_bedroom_id",
//             "devices": {
//                 "light": {
//                     "id": "beach_house_living_room_light_id",
//                     "state": "off"
//                 },
//                 "tv": {
//                     "id": "beach_house_living_room_tv_id",
//                     "state": "off"
//                 },
//                 "ac": {
//                     "id": "beach_house_living_room_ac_id",
//                     "state": "off",
//                     "mode": "fan"
//                 }
//             }
//         },
//         "spa": {
//             "id": "beach_house_fps_id",
//             "devices": {
//                 "thermostat": {
//                     "id": "beach_house_spa_thermostat_id",
//                     "state": "off"
//                 },
//                 "light": {
//                     "id": "beach_house_spa_light_id",
//                     "state": "off"
//                 }
//             }
//         }
//     },
//     "Home": {
//         "Living Room": {
//             "id": "home_living_room_id",
//             "devices": {
//                 "light": {
//                     "id": "home_living_room_light_id",
//                     "state": "off"
//                 },
//                 "ac": {
//                     "id": "home_living_room_ac_id",
//                     "state": "on"
//                 },
//                 "fan": {
//                     "id": "home_living_room_fan_id",
//                     "state": "off"
//                 }
//             }
//         },
//         "Bedroom": {
//             "id": "home_bedroom_id",
//             "devices": {
//                 "light": {
//                     "id": "home_living_room_light_id",
//                     "state": "off"
//                 },
//                 "tv": {
//                     "id": "home_living_room_tv_id",
//                     "state": "off"
//                 },
//                 "ac": {
//                     "id": "home_living_room_ac_id",
//                     "state": "off",
//                     "mode": "cool"
//                 }
//             }
//         },
//         "Kitchen": {
//             "id": "home_kitchen_id",
//             "devices": {
//                 "exhause": {
//                     "id": "home_bedroom_exhaust_id",
//                     "state": "on"
//                 },
//                 "fridge": {
//                     "id": "home_bedroom_fridge_id",
//                     "state": "on"
//                 }
//             }
//         }
//     },
//     "Office": {
//         "Conference Room": {
//             "id": "office_conference_room_id",
//             "devices": {
//                 "projector": {
//                     "id": "office_conference_room_projector_id",
//                     "state": "off"
//                 },
//                 "speaker": {
//                     "id": "office_conference_room_speaker_id",
//                     "state": "off"
//                 }
//             }
//         },
//         "Break Room": {
//             "id": "office_break_room_id",
//             "devices": {
//                 "coffee_maker": {
//                     "id": "office_break_room_coffee_maker_id",
//                     "state": "off"
//                 },
//                 "refrigerator": {
//                     "id": "office_break_room_refrigerator_id",
//                     "state": "on"
//                 }
//             }
//         },
//         "Workstation 1": {
//             "id": "office_workstation_1_id",
//             "devices": {
//                 "computer": {
//                     "id": "office_workstation_1_computer_id",
//                     "state": "off"
//                 },
//                 "monitor": {
//                     "id": "office_workstation_1_monitor_id",
//                     "state": "off"
//                 }
//             }
//         }
//     }
// }