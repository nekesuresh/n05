import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

// reference : https://explodingtopics.com/blog/generative-ai-stats

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  chartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {

      const response = await this.http
        .get<{ labels: string[]; data: number[] }>('http://134.122.7.165:3000/api/charts/summary')
        .toPromise();


      if (response) {
        this.chartData.labels = response.labels;
        this.chartData.datasets[0].data = response.data;
      }


      this.renderChart();
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  }

  renderChart() {
    const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Industries with the Highest Potential for Automation', // Chart title
            font: {
              size: 18,
              weight: 'bold',
            },
            color: 'black',
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Industry',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: 'black',
            },
            ticks: {
              color: 'black',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Percentage of Jobs',
              font: {
                size: 14,
                weight: 'bold',
              },
              color: 'black',
            },
            ticks: {
              color: 'black',
            },
          },
        },
      },
    });
  }
}
