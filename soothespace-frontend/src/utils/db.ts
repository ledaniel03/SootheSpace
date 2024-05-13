import axios from "axios"

/**
 * @author @ledaniel03
* @description This module handles communication with a backend server for a web application using API calls.
 * It includes functionalities for managing user accounts, sending and receiving chat messages,
 * and managing journal entries. The interactions are primarily with a Django backend, and the
 * API endpoints are structured to handle tasks such as user registration, login, logout,
 * adding and fetching chat messages, as well as creating and retrieving journal entries.
 */


const BASE_URL = 'https://daniel03.pythonanywhere.com' // Base URL for API requests (chat & other methods in db.ts)

// Async function to fetch JSON data from server- Parameters for path, method, body & headers
const fetchJson = async (path: string, method: string = 'GET', body?: object, headers?: HeadersInit): Promise<[boolean, any]> => {
    try {
        // Perform fetch req
        const res = await fetch(`${BASE_URL}${path}`, {
            method, // Method (GET, POST, PUT, DELETE)
            headers: headers, // Custom headers to send w request
            body: JSON.stringify(body) // Convert body object to JSON string to send to the server
        });
        // Extract text from the response
        const text = await res.text()
        console.log('Got', text)

        // Parse text to JSON
        const data = JSON.parse(text)
        return [true, data] // Successful fetch
    } catch (e) {
        console.log(e) // Log errors (if any)
        return [false, e] // Return tuple indicating fetch failure w the error
    }
}

// `addMessageToDB`: Adds a chat message to the database
export const addMessageToDB = async (mes: string, session_id: number) => {
    const message = { session_id, input: mes, username: localStorage['username'] }
    const [res, data] = await fetchJson('/chat/send_message/', "POST", message)
    return res
}

// `getAllMessagesFromDB`: Fetches all chat messages from the database
export const getAllMessagesFromDB = async (session_id: number) => {
    const [status, data] = await fetchJson(`/chat/get_messages/${session_id}/`)
    if (status) {
        let mes = data.messages as any[]
        let foundMes = []
        for (let i = 0; i < mes.length; i++) {
            if (mes[i].username == localStorage['username']) {
                foundMes.push(mes[i]) // add message and respond to users messages
                foundMes.push(mes[i + 1])
            }
        }
        return [
            true,
            foundMes,
        ]
    } else {
        return [false, []]
    }
}
// 'user': entry.user,
// 'date': entry.date,
// 'mood': entry.mood,
// 'activity': entry.activity,
// 'val': entry.val,

// `addEntryToDB`: Adds a journal entry to the database
export const addEntryToDB = async (message: {
    user: string, date: number, mood: string,
    activity: string, val: string
}) => {
    const [status, data] = await fetchJson(`/journal/add_entry/`, "POST", message)
    if (status) {
        return [true, data.messages as object[]]
    } else {
        return [false, []]
    }
}

// `getAllEntriesFromDB`: Fetches all journal entries from the database
export const getAllEntriesFromDB = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/journal/get_entries/`); // Change to actual API endpoint (via local server or network)
        if (Array.isArray(response.data.entries)) {
            let entries = response.data.entries.reverse()
            const name = localStorage['username']
            entries = entries.filter(
                (d: any) => d.user == name
            )
            return entries; // Set entries state to the array part of the response data (reversed to show newest on top)
        } else {
            console.error('Data fetched is not an array:', response.data.entries);
            return []; // Set to empty array if fetched data is not an array
        }
    } catch (error) {
        console.error('Failed to fetch entries:', error);
    }
}

// ACCOUNT ACTIONS (REGISTER, LOGIN, LOGOUT)
export const addUserToDB = async (message: { username: string, password: string }) => {
    const [status, data] = await fetchJson(`/accounts/register/`, "POST", message)
    if (status && data['success']) {
        saveUserDetails(message.username, message.password)
        return [true, true]
    } else {
        return [false, data['error']]
    }
}

// Handles user login, returning a boolean for success or error message
export const loginUserDB = async (message: { username: string, password: string }) => {
    const [status, data] = await fetchJson(`/accounts/login/`, "POST", message)
    if (status && data['success']) {
        saveUserDetails(message.username, message.password)
        return [true, true]
    } else {
        return [false, data['error']]
    }
}

// Handles user logout, returning a boolean for success or error message
export const logoutUserDB = async () => {
    const [status, data] = await fetchJson(`/accounts/logout/`, "POST", {
        "username": localStorage.getItem('username'),
    })
    if (status && data['success']) {
        saveUserDetails("", "")
        return [true, true]
    } else {
        return [false, data['error']]
    }
}

// Saves user details to local storage
const saveUserDetails = (name: string, password: string) => {
    localStorage.setItem('username', name)
    // localStorage.setItem('password', password)
}

// Checks if user is logged in
export const checkLogin = async () => {
    const [status, data] = await fetchJson(`/accounts/checklogin/`, "POST", {
        "username": localStorage.getItem('username'),
    })
    if (status && data['success']) {
        return [true, true]
    } else {
        return [false, data['error']]
    }
}

interface IProfile {
    newPassword: string;
    profilePic: string;
}

// Updates user profile (password and profile picture, but only password for now)
export const updateUserprofile = async ({
    newPassword,
    profilePic
}: IProfile) => {
    const [status, data] = await fetchJson(`/accounts/updateprofile/`, "POST", {
        "username": localStorage.getItem('username'),
        newpassword: newPassword,
        profilepic: profilePic
    })
    if (status && data['success']) {
        return [true, true]
    } else {
        return [false, data['error']]
    }
}

// `deleteEntryFromDB`: Deletes a journal entry from the database
export const deleteEntryFromDB = async ({ id }: { id: number }) => {
    const [status, data] = await fetchJson(`/journal/delete_entry/`, "POST", {
        "username": localStorage.getItem('username'),
        id,
    })
    if (status && data['success']) {
        return [true, true]
    } else {
        return [false, data['error']]
    }
}
