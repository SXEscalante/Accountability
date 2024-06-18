import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const BarGraph = ({dataset}) => {
    const [timeData, setTimeData] = useState([]);
    const [labelData, setLabelData] = useState([]);

    const setData = () => {
        var timeSpentArray = []
        var dateLabelArray = []

        let currentDate = new Date().getDate()
        for(let i = 1; i <= currentDate; i++){
            dateLabelArray.push(i)
        }

        for(let date of dateLabelArray){
            let timeSpent = 0
            for(let timeObj of dataset){
                if(parseInt(timeObj.startDate.split('-')[2]) === date){
                    timeSpent = timeObj.timeSpent
                }
            }
            timeSpentArray.push(timeSpent)
        }

        setTimeData(timeSpentArray)
        setLabelData(dateLabelArray)
    }
    
    useEffect(() => {
        setData()
    }, [dataset]);

    return ( 
        <div>
            <Bar data={{
                labels: labelData, 
                datasets: [
                    {
                        label: "timespent", 
                        data: timeData
                    }, 
                ],
            }}/>
        </div>
    );
}
 
export default BarGraph;