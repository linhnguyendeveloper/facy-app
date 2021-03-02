import React from "react";
import { Line } from "@reactchartjs/react-chart.js";

const data = {
  labels: ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 18, 3,7,9,17,12,14,18],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: '# of Votessss',
      data: [22, 14, 11, 9, 6, 5,2,9,14,11,10,5],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
}

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  elements: {
    point:{
        radius: 0
    }
}
};

const MultiAxisLine = () => (
  <div style={{
    position:'relative',
    width:'100%',
    height:'40vh'
  }}>
   
    <Line data={data} options={options} />
  </div>
);

export default MultiAxisLine;
