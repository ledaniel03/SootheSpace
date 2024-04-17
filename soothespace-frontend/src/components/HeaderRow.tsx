import Avatar from "./Avatar"

export const HeaderRow = ({ title }: { title: string}) => {

    return (
        <div className='bg-slate-50 flex items-center justify-between py-1 px-1'>
            <div className="flex flex-col items-start gap-1">
                <Avatar />
                <div className="flex gap-2 items-center pl-3" >
            {/*        <Icon className='text-black' size={30} /> */}
                    <div className="text-black font-bold text-3xl  font-sans" >{title}</div>
                </div>
            </div>
        </div>
    )
}
