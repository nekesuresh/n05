import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  topicSummary: string = '';
  referenceUrl: string = '';
  techDetails: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.topicSummary = `Generative AI has experienced a surge of innovation in recent months, driving advancements across various fields. A notable development is the emergence of reasoning AI models from China, rivaling OpenAI's GPT models in their capability to comprehend and process complex tasks. OpenAI continues to push boundaries with tools like ChatGPT, even releasing a teacher's guide to promote educational use. Google's Gemini chatbot has also made waves with its advanced memory capabilities, offering enhanced interactivity and adaptability. The technology has become increasingly practical, influencing industries such as design, media, and social platforms. Tools like Meta's AI integration into Ray-Ban glasses highlight AI's role in augmenting daily life, while companies like Moonvalley are developing ethical AI video models to address privacy and fairness concerns. Startups such as Norwegian Factiverse are tackling misinformation, showcasing AI's societal benefits. Generative AI is also drawing significant investments, with startups like Neural Magic and others raising millions to develop faster and more efficient AI infrastructure. These tools are democratizing creative processes, enabling applications like text-to-image generation and content moderation to improve accessibility and efficiency across industries. From AI-driven glasses to disinformation countermeasures, the evolution of generative AI reflects its transformative potential and highlights its expanding influence in the modern world.`;

    this.referenceUrl = ' https://techcrunch.com/tag/generative-ai/';

    this.techDetails = `This project is built using Angular for the frontend, Node.js for the backend, and MySQL
    as the database. The application is a single-page application (SPA) that uses JWT-based authentication.
    The frontend communicates with the backend via RESTful APIs. The backend runs on port 3000 to handle API requests securely. Chart.js is used for visualizing data dynamically, making the
    interface user-friendly and informative.`;
  }
}
