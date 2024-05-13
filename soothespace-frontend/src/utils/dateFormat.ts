
const weekday: readonly string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; // Array readonly, cannot be modified

/**
 * @author @ledaniel03
 * @description Functions to format dates and times for the journal history and current date.
 */

// Function to get the current date in the format "Day Abbrev. Month Abbrev. Day Number Year"
export const getCurrentDate = (): string => {
    const d: Date = new Date(); // TS infers type of d as Date
    let day: string = weekday[d.getDay()].slice(0, 3); // Get day of the week (0 to 6 of a date, indexed day from array, & then sliced for abbrev.)
    let dayNumber: number = d.getDate() // Get day of the month (1 to 31 of a date)
    let month: string = d.toLocaleString('default', { month: 'long' }).slice(0, 3); // Get month of the year (0 to 11 of a date, converted to january to december) (Then sliced for abbrev.)
    let year: number = d.getFullYear(); // Get year of the date
    
    return `${day} ${month} ${dayNumber.toString()} ${year.toString()}`;
}

// Formatting the entries date & time for journal history
export const formatDateTime = (isoString: string): { date: string; time: string } => {
    const date = new Date(isoString);

    // Object to specify date formatting options (Utilizing JS predefined options for Intl.DateTimeFormatOptions)
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',  // 'numeric' = display  year as a number
        month: 'long',    // 'long' = display the full name of the month
        day: 'numeric'    // 'numeric' = display the day as a number
    };

    const formattedDate = date.toLocaleDateString('en-US', dateOptions); // converts to local date format
    const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); // converts to time date format (without the seconds & removing 0 in hrs if not 2-digit)

    return {
        date: formattedDate,
        time: formattedTime
    };
};