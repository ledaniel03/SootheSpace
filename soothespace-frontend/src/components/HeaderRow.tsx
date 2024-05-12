import { useLocation } from "wouter"
import Avatar from "./Avatar"
import { IoSettings } from "react-icons/io5"
import LogoutButton from "./LogoutButton"


const Settings = () => {
    const [loc, nav] = useLocation()
    const showSettings = () => {
      nav('/settings')
    }
    return (
      <div className="fixed top-2 right-[90px] " >
        <IoSettings className="text-[2rem] cursor-pointer"
          onClick={showSettings} />
      </div>
    )
  }
  

export const HeaderRow = ({ title }: { title: string}) => {

    return (
        <div className='bg-slate-50 flex items-center justify-between py-1 px-1'>
            <div className="flex flex-col items-start gap-1">
                <Avatar />
                <div className="flex gap-2 items-center pl-3" >
            {/*        <Icon className='text-black' size={30} /> */}
                    <div className="text-black font-bold text-3xl  font-sans" >{title}</div>
                </div>
                <Settings  />
                <LogoutButton />

            </div>
        </div>
    )
}
