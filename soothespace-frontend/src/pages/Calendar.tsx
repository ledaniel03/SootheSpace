import React, { useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";


// Defines the structure of a day object used in the calendar
type Day = {
    day: number;          // The day of the month
    dayOfWeek: string;    // The name of the day of the week
};

// Weekday names
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

const Calendar: React.FC = () => {
    // State to keep track of the currently displayed date
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Function to generate an array of days for the current month
    const getDaysArray = (year: number, month: number): Day[] => {
        const monthIndex = month - 1; // Converts 1-based month to 0-based for the Date object
        const date = new Date(year, monthIndex, 1); // Starts at the first day of the month
        const result: Day[] = [];
        while (date.getMonth() === monthIndex) {
            // Pushes each day and its corresponding weekday name to the result array
            result.push({ day: date.getDate(), dayOfWeek: weekdays[date.getDay()] });
            date.setDate(date.getDate() + 1); // Moves to the next day
        }
        return result;
    };

    // Generates array of days for the current month & year
    const days: Day[] = getDaysArray(currentDate.getFullYear(), currentDate.getMonth() + 1);

    // Function to move the calendar to the next month
    const nextMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Function to move the calendar to the previous month
    const prevMonth = (): void => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Component layout
    return (
        <div className="flex flex-col items-center my-2">
            <div className="flex gap-2 mb-4 items-center">
                <button onClick={prevMonth} className="px-2 py-2 text-3xl text-slate-400  rounded hover:text-teal-500"><IoIosArrowDropleft/></button>
                <div className="flex justify-center text-lg w-[40vw] text-slate-600 font-semibold tracking-wide">{currentDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</div>
                <button onClick={nextMonth} className="px-2 py-2 text-3xl text-slate-400  rounded hover:text-teal-500"><IoIosArrowDropright/></button>
            </div>

            <div className="grid grid-cols-7 gap-1 gap-y-4 mt-2">
                {weekdays.map((day, index) => (
                    <div key={index} className="py-1 text-center text-slate-600 font-medium">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="px-4 py-3 text-center text-slate-500 border rounded-full border-gray-300">
                        {day.day} {/*Replace day with mood emoji if it exists*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
