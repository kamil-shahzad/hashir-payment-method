import React, { Component } from "react";
import { Bar } from "react-chartjs-2";



class ActiveChart1 extends Component {
   render() {
      const data = {
         labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct",
         ],
         datasets: [
            {
               label: "My First dataset",
               data: [15, 40, 55, 40, 25, 35, 40, 50, 85, 40],
               borderColor: "rgba(254, 99, 78, 1)",
               borderWidth: "0",
               backgroundColor: "rgba(254, 99, 78, 1)",
               hoverBackgroundColor: "rgba(254, 99, 78, 1)",  
               barThickness: 4       
            },
         ],
      };
      
      const options = {
         plugins :{
            legend: {
               display: false,
            },
         },
         responsive: true,
         maintainAspectRatio: false,
         tooltips : {
            display: false,
         },
      
         scales: {
            y:
               {
                  display: false,                 
                     beginAtZero: true,
                     ticks: {
                        display: false,
                     },
                     max: 100,
                     min: 0,
                     //stepSize: 10,
                  
                  gridLines: {
                     display: false,
                     drawBorder: false,
                  },
               },
            
            x: 
               {
                  display: false,
                  barPercentage: 0.4,
                  gridLines: {
                     display: false,
                     drawBorder: false,
                  },
                  ticks: {
                     display: false,
                  },
               },
         },
      };
      return (
         <div className="lineChart chartjs-render-monitor">
            <Bar data={data}  options={options} />
         </div>
      );
   }
}

export default ActiveChart1;
