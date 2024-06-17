import { useState, useEffect } from "react";

import "./NewEventModal.css"
import axios from "axios";

const NewEventModal = ({ openModal, handleEvent }) => {
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [comment, setComment] = useState('');
    

    const handleNewEvent = async (e) => {
        e.preventDefault();

        const EventData = {
            startTime, 
            endTime, 
            comment,
        }

        try{
            const responce = await axios.post(`https://localhost:7163/api/events`, EventData)
            if(responce.status === 201){
                console.log('Times', startTime, endTime)
                handleEvent()
                openModal(false)
            }
        }
        catch (error){
            console.log("Error sending event data:", error)
        }
    }

    const setTimes = () => {
        const now = new Date();
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        if(month < 10){
            month = `0${month}`
        }
        var day = now.getDate()
        if(day < 10){
            day = `0${day}`
        }
        var hours = now.getHours()
        var earlierHours = hours
        if(earlierHours === 0){
            earlierHours = 22
        }
        else if(earlierHours === 1){
            earlierHours = 21
        }
        else{
            earlierHours -= 2
        }
        if(hours < 10){
            hours = `0${hours}`
        }
        if(earlierHours < 10){
            earlierHours = `0${earlierHours}`
        }
        var minutes = now.getMinutes()


        setEndTime(`${year}-${month}-${day}T${hours}:${minutes}:00`)
        setStartTime(`${year}-${month}-${day}T${earlierHours}:${minutes}:00`)
    }

    useEffect(() => {
        setTimes()
    }, []);
    
    return (
        <div className='modal-background' >
            <form className='modal' onSubmit={handleNewEvent}>
                <button className="exit-button" onClick={() => openModal(false)}>X</button>
                <div className='event-inputs'>
                    <label className="input-label">Start Time</label>
                    <input className="time-input" value={startTime} type="datetime-local" onChange={(e) => setStartTime(e.target.value)} />
                    <label className="input-label">End Time</label>
                    <input className="time-input" value={endTime} type="datetime-local" onChange={(e) => setEndTime(e.target.value)} />
                    <label className="input-label">Comments</label>
                    <textarea className="comment-input" type="text" onChange={(e) => setComment(e.target.value)} />
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewEventModal;