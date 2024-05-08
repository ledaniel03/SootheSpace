import { RxAvatar } from "react-icons/rx";
import sootheSpace from '../assets/soothespace_logo.png'

const Avatar = () => {
    return (
        <div className="flex flex-col items-center px-3 mb-2" >
            <img src={sootheSpace} className="w-8 rounded-full" />
            {/* <div className="text-sm text-black font-medium" >Daniel Le</div> */}
        </div>
    )
}

export default Avatar