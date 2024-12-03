import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

// reference : https://explodingtopics.com/blog/generative-ai-stats

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  chartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.http
        .get<{ labels: string[]; data: number[] }>('http://134.122.7.165:3000/api/charts/reports')
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
    const ctx = document.getElementById('ReportsChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Percentage of overall generative AI Market Share',
            font: {
              size: 18,
              weight: 'bold',
            },
            color: 'black',
          },
          legend: {
            position: 'bottom',
            labels: {
              color: 'black',
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });
  }
}
