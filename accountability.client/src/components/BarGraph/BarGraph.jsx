import './BarGraph.css'

import { useState, useEffect } from 'react';
import Chart, { Tooltip, plugins } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import { callback } from 'chart.js/helpers';

const BarGraph = ({dataset, newData}) => {
    const [timePeriod, setTimePeriod] = useState('month');
    const [graphTitle, setGraphTitle] = useState('Time spent this month');
    const [timeData, setTimeData] = useState([]);
    const [labelData, setLabelData] = useState([]);

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    min: 0,
                    max: Math.max(...timeData) + 60,
                    stepSize: 60,
                },
            },
        },
        tooltip: {
            callback: {
                label: function(context) {
                    var hours = Math.floor(context.yLabel / 60)
                    var minutes = context.yLabel % 60
                    return `${hours} hr ${minutes} min`
                }
            }
        }
    };

    const setData = () => {
        var timeSpentArray = []

        for(let date of labelData){
            let timeSpent = 0
            for(let timeObj of dataset){
                if(parseInt(timeObj.startDate.split('-')[2]) === date){
                    timeSpent = timeObj.timeSpent
                }
            }
            timeSpentArray.push(timeSpent)
        }

        setTimeData(timeSpentArray)
    }

    const setupLabels = () => {
        var dateLabelArray = []
        let currentDate = new Date().getDate()

        if(timePeriod === 'month'){
            for(let i = 1; i <= currentDate; i++){
                dateLabelArray.push(i)
            }
        }

        if(timePeriod === 'past week'){
            for(let i = (currentDate - 7); i <= currentDate; i++){
                dateLabelArray.push(i)
            }
        }

        setLabelData(dateLabelArray)
    }
    
    useEffect(() => {
        setupLabels()
    }, [dataset, timePeriod]);

    useEffect(() => {
        if(newData){
            setupLabels()
        }
    }, [newData]);

    useEffect(() => {
        setData()
    }, [labelData]);

    return ( 
        <div className='bar-graph'>
            <div className='button-container'>
                <button onClick={() => setTimePeriod('month')}>This Month</button>
                <button onClick={() => setTimePeriod('past week')}>Past Week</button>
            </div>
            <h3>{graphTitle}</h3>
            <Bar data={{
                labels: labelData, 
                datasets: [
                    {
                        label: "Time Spent", 
                        data: timeData
                    }, 
                ],
            }} 
            options={chartOptions}/>
        </div>
    );
}
 
export default BarGraph;