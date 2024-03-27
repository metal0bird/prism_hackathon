import { Popup } from "@/components/suggestion/popup"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

type BentoCardProps = {
  row?: number
  col?: number
  href?: string
  children: React.ReactNode
}
const BentoCard = (props: BentoCardProps) => {
  const { row, col, href, children } = props
  return (
    <Link
      href={href ?? '/'}
      className={`col-span-${col ?? 1} row-span-${row ?? 1} bg-gradient-to-br from-neutral-100 to-neutral-300 rounded-lg border-2 border-black flex items-center justify-center h-80 text-black cursor-pointer`}
    >
      {children ?? 'PLACEHOLDER'}
    </Link>
  )
}

const UserSelector = () => {
  const dummyUsers = [
    'Joe Biden',
    'Barack Obama',
    'Donald Trump',
    'Bill Gates',
    'Elon Musk',
    'Mark Zuckerberg',
    'Jeff Bezos',
    'Larry Page',
    'Sergey Brin',
    'Bill Gates',
    'Steve Jobs',
    'Richard Branson',
    'Jack Ma',
    'Jeff Bezos',
    'Larry Page',
    'Sergey Brin',
    'Bill Gates',
    'Steve Jobs',
    'Richard Branson',
    'Jack Ma',
  ]
  return (
    <Select defaultValue={dummyUsers[0]}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Names</SelectLabel>
          {dummyUsers.map((user) => (
            <SelectItem key={user} value={user}>
              {user}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const LocationSelector = () => {
  const dummyLocations = [
    'Home',
    'Office',
    'Kitchen',
    'Bedroom',
    'Living Room',
    'Garage',
  ]
  return (
    <Select defaultValue={dummyLocations[0]}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Locations</SelectLabel>
          {dummyLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Team Pythonic</h1>
        <div className="flex w-full items-center justify-between px-4 py-4">
          {/* UserSelector */}
          <UserSelector />
          {/* LocationSelector */}
          <LocationSelector />
        </div>
        {/* Bento Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4 h-fit w-full">
          <BentoCard> ACCOUNT </BentoCard>
          <BentoCard href="/devices"> DEVICES </BentoCard>
          <BentoCard href='/routines'> ROUTINES </BentoCard>
          <BentoCard href='http://localhost:7860//'> SAM </BentoCard>
          <BentoCard> ADD DEVICES </BentoCard>
          <BentoCard href='/automated_routines'> AUTOMATED ROUTINES </BentoCard>
        </div>
        <div className="flex w-full items-center justify-center px-4 py-4 gap-4">
          {/* ECO BUTTON */}
          ECO MODE
          <Switch defaultChecked={true} />
        </div>
      </div>
      <Popup />
    </>
  )
}
