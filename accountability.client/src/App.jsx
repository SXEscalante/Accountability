import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import NewEventModal from './components/NewEventModal/NewEventModal';

import BarGraph from './components/BarGraph/BarGraph';

function App() {
    const [events, setEvents] = useState([]);
    const [addPost, setAddPost] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [timeData, setTimeData] = useState([]);

    const handleEventData = async () => {
        try {
            const response = await axios.get(`https://localhost:7163/api/events`)
            if (response.status === 200) {
                setEvents(response.data)
                setDataFetched(true)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const calculateTimes = () => {
        var times = []
        events.map(function(loggedEvent) {
            var startingTime = (loggedEvent.startTime.split('T')[1])
            var endingTime = (loggedEvent.endTime.split('T')[1])
            var startDate = (loggedEvent.startTime.split('T')[0])
            var timeSpent = 0

            startingTime = (parseInt(startingTime.split(':')[0] * 60) + parseInt(startingTime.split(':')[1]))
            endingTime = (parseInt(endingTime.split(':')[0] * 60) + parseInt(endingTime.split(':')[1]))

            if(startingTime < endingTime){
                timeSpent = endingTime - startingTime
            }
            else{
                timeSpent = (1440 - startingTime) + endingTime
            }

            var dateFound = false
            for(var timeObj of times){
                if(timeObj.startDate.includes(startDate)){
                    dateFound = true
                }
            }
            if(dateFound){
                const targetObj = times.find(timeObj => timeObj.startDate === startDate)
                targetObj.timeSpent += timeSpent
            }
            else{
                times.push({startDate, timeSpent})
            }
        })
        console.log("times", times)
        setTimeData(times)
    }
    
    useEffect(() => {
        handleEventData()
    }, []);

    useEffect(() => {
        if(events.length !== 0){
            calculateTimes()
        }
    }, [dataFetched]);

    return (
        <div>
            <h1 id="tabelLabel">Time Accountability</h1>
            <p>Track how much time you are spending</p>
            <button onClick={() => setAddPost(true)}>Add new event</button>
            {addPost && 
                <NewEventModal openModal={setAddPost} handleEvent={handleEventData}/>}
            <BarGraph dataset={timeData}/> 
        </div>
        
    );
}

export default App;