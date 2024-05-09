import axios from "axios"

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

export const addMessageToDB = async (mes: string, session_id: number) => {
    const message = { session_id, input: mes, username: localStorage['username'] }
    const [res, data] = await fetchJson('/chat/send_message/', "POST", message)
    return res
}

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

// ACCOUNT ACTIONS

export const addUserToDB = async (message: { username: string, password: string }) => {
    const [status, data] = await fetchJson(`/accounts/register/`, "POST", message)
    if (status && data['success']) {
        saveUserDetails(message.username, message.password)
        return [true, true]
    } else {
        return [false, data['error']]
    }
}


export const loginUserDB = async (message: { username: string, password: string }) => {
    const [status, data] = await fetchJson(`/accounts/login/`, "POST", message)
    if (status && data['success']) {
        saveUserDetails(message.username, message.password)
        return [true, true]
    } else {
        return [false, data['error']]
    }
}


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

const saveUserDetails = (name: string, password: string) => {
    localStorage.setItem('username', name)
    // localStorage.setItem('password', password)
}

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

