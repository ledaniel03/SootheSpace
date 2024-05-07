import { useEffect, useState } from "react"
import { checkLogin } from "../utils/db"
import { useLocation } from "wouter"


export const useLogin = () => {
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [location] = useLocation()

    useEffect(() => {
        (async () => {
            const [res, state] = await checkLogin()
            console.log(res, state)

            if (res && state) {
                setIsLoggedin(true)
            } else {
                setIsLoggedin(false)
            }
        })()
    }, [location])

    return { isLoggedin }
}