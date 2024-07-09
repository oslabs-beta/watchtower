import React from 'react';
import { defaults } from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';




const ConsumedCapacity = () => {
  return (
    <div>
      <div>Chart 1</div>
      <div>
        <Bar 
          data={{
            labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Revenue',
                data: [200, 300, 400],
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
              {
                label: 'Loss',
                data: [90, 80, 70],
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              }
            ]
          }}
          options={{
            plugins: {
              title: {
                text: 'Revenue Sources',
              }
            }
          }}
        />
      </div>
      <div>Chart 2</div>
      <div>
        <Doughnut 
          data={{
            labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Revenue',
                data: [200, 300, 400],
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
              },
              {
                label: 'Loss',
                data: [90, 80, 70],
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                hoverOffset:4,
              }
            ]
          }}
          options={{
            plugins: {
              title: {
                text: 'Revenue Sources',
              }
            }
          }}
        />
      </div>
      <div>Chart 1</div>
      <div>
        <Line 
          data={{
            labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Revenue',
                data: [200, 300, 400],
                backgroundColor: '#064FF0',
                borderColor: '#064FF0',
              },
              {
                label: 'Loss',
                data: [90, 80, 70],
                backgroundColor: '#FF3030',
                borderColor: '#FF3030',
              },
            ]
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: 'Monthly Revenue & Cost',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default ConsumedCapacity;