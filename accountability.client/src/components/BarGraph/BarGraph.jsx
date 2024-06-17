import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const BarGraph = ({dataset}) => {
    const [timeData, setTimeData] = useState([]);
    const [labelData, setLabelData] = useState([]);

    const setData = () => {
        var timeSpentArray = []
        var dateLabelArray = []
        for(var obj of dataset){
            timeSpentArray.push(obj.timeSpent)
            dateLabelArray.push(obj.startDate)
        }
        setTimeData(timeSpentArray)
        setLabelData(dateLabelArray)
    }
    
    useEffect(() => {
        setData()
    }, []);

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