
export const getCurrentDate = (): string => {
    const weekday: readonly string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; // Array readonly, cannot be modified

    const d: Date = new Date(); // TS infers type of d as Date
    let day: string = weekday[d.getDay()].slice(0, 3); // Get day of the week (0 to 6 of a date, indexed day from array, & then sliced for abbrev.)
    let dayNumber: number = d.getDate() // Get day of the month (1 to 31 of a date)
    let month: string = d.toLocaleString('default', { month: 'long' }).slice(0, 3); // Get month of the year (0 to 11 of a date, converted to january to december) (Then sliced for abbrev.)
    let year: number = d.getFullYear(); // Get year of the date
    
    return `${day} ${month} ${dayNumber.toString()} ${year.toString()}`;
}


