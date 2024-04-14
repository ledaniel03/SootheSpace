import { RxAvatar } from "react-icons/rx";
import avatarImg from '../assets/avatar.png'

const Avatar = () => {
    return (
        <div className="flex flex-col items-center px-3 mb-2" >
            <img src={avatarImg} className="w-8" />
            {/* <div className="text-sm text-black font-medium" >Daniel Le</div> */}
        </div>
    )
}

export default Avatar