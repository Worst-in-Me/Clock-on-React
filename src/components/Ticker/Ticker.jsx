import { useEffect, useState } from "react";
import { Clock } from "../Clock/Clock";

export const Ticker = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {setInterval(() => setDate(new Date()), 1)}, []);

    return (
        <div>
            <Clock date={date}/>
        </div>    
    );
};