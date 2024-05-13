import { useEffect, useState } from "react"
import { checkLogin } from "../utils/db"
import { useLocation } from "wouter"

/**
 * @author @ledaniel03 
 * @description A custom hook that checks the user's login status by querying the server.
 * Updates the `isLoggedin` state based on the response, ensuring that the user interface reflects
 * the user's current authentication status, particularly after navigation events.
 */


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