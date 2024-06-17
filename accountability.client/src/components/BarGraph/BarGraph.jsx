import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

const BarGraph = ({dataset}) => {
    return ( 
        <div>
            <Bar data={{
                labels: ["12", "13", "14", "15", "16"], 
                datasets: [
                    {
                        label: "timespent", 
                        data: dataset.timeSpent
                    }, 
                ],
            }}/>
        </div>
    );
}
 
export default BarGraph;