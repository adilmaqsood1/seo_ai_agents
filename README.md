# SEO AI Agents

An AI-powered SEO keyword analysis tool that crawls websites, extracts keywords, and provides detailed SEO analysis using Groq's AI capabilities.

## Features

- Website crawling and keyword extraction
- AI-powered keyword analysis using Groq API
- Detailed SEO reports including:
  - Keyword categorization
  - Sentiment analysis
  - SEO recommendations
  - Competitor gap analysis
  - Actionable next steps
- Modern, responsive UI built with Tailwind CSS

## Project Structure

```
├── agents/                # AI agents for different tasks
│   ├── groq_analyzer.py   # Groq API integration for keyword analysis
│   ├── web_crawler.py     # Web crawler for extracting keywords
│   └── keyword_analyzer.py
├── schemas/               # Data models
│   └── models.py          # Pydantic models for API requests/responses
├── services/              # Business logic
│   └── keyword_analysis_workflow.py  # Orchestrates the analysis workflow
├── static/                # Frontend assets
│   ├── css/               # CSS stylesheets
│   │   └── styles.css     # Custom styles
│   ├── js/                # JavaScript files
│   │   └── main.js        # Frontend logic
│   └── index.html         # Main HTML page
├── utils/                 # Utility functions
│   └── logger.py          # Logging utilities
├── main.py                # Original FastAPI application
├── main_with_static.py    # FastAPI application with static file serving
└── requirements.txt       # Project dependencies
```

## Setup and Installation

1. Clone the repository

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root with your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Run the application with static file serving:
   ```
   uvicorn main_with_static:app --reload
   ```

5. Open your browser and navigate to `http://localhost:8000`

## Usage

1. Enter a website URL in the input field
2. Click "Analyze Keywords" to start the analysis
3. View the detailed SEO analysis results, including:
   - Extracted keywords
   - Sentiment analysis
   - Keyword categories
   - SEO recommendations
   - Next steps

## Technologies Used

- **Backend**: FastAPI, Python
- **Frontend**: HTML, Tailwind CSS, JavaScript
- **AI**: Groq API (deepseek-r1-distill-llama-70b model)
- **Web Crawling**: BeautifulSoup4, Requests

## License

MIT