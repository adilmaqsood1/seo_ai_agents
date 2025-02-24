# **AI SEO Agent with FastAPI and Groq**

This project is an **AI-powered SEO analysis tool** that crawls websites, extracts keywords, and generates detailed SEO reports using **FastAPI**, **Groq API**, and **LangGraph**. It consists of two agents:
1. **Agent 1**: Crawls websites and extracts keywords (like an SEO bot).
2. **Agent 2**: Analyzes keywords using Groq's LLM and generates a detailed SEO report.

---

## **Features**
- **Web Crawling**: Extracts keywords from any website.
- **Keyword Analysis**: Uses Groq's LLM for advanced keyword analysis.
- **SEO Report**: Generates a detailed report with:
  - Keyword categorization.
  - Sentiment analysis.
  - SEO recommendations.
  - Competitor gap analysis.
  - Actionable next steps.
- **FastAPI Backend**: Provides a RESTful API for easy integration.

---

## **Tech Stack**
- **Backend**: FastAPI
- **AI Integration**: Groq API
- **Web Crawling**: `requests` and `BeautifulSoup` (or `crawl4ai`)
- **Environment Management**: `python-dotenv`
- **Deployment**: Vercel

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/ai-seo-agent.git
cd ai-seo-agent
```

### **2. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add your Groq API key:
```plaintext
# .env
GROQ_API_KEY=your-groq-api-key
```

---

## **Running Locally**

### **1. Start the FastAPI Server**
```bash
uvicorn main:app --reload
```

### **2. Test the API**
Use `curl` or Postman to test the `/crawl` endpoint:
```bash
curl -X POST "http://127.0.0.1:8000/crawl" -H "Content-Type: application/json" -d '{"url": "https://example.com"}'
```

---

## **API Endpoints**

### **1. Crawl and Analyze Website**
- **Endpoint**: `POST /crawl`
- **Request Body**:
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "keywords": ["example", "domain", "website", ...],
      "analysis": {
        "categories": {
          "Brand & Team": ["Marketingwaly", "Afridi", ...],
          "Core Services": ["SEO", "Web Design", ...]
        },
        "sentiment": {
          "overall": "positive",
          "keywords_indicating_trust": ["Transparency", "24/7 Support", ...]
        },
        "recommendations": {
          "on_page": ["Optimize title tags with 'Award-Winning Digital Marketing'", ...],
          "content": ["Publish blog on 'AI-Driven SEO'", ...],
          "technical": ["Fix broken links using Screaming Frog", ...]
        },
        "next_steps": [
          "Build a 'Client Success Hub' showcasing ROI metrics",
          "Create a 'Cybersecurity Checklist' PDF for lead generation"
        ]
      }
    }
  }
  ```

---

## **Project Structure**
```
ai_seo_agent/
│
├── main.py                  # FastAPI entry point
├── vercel.json              # Vercel configuration
├── requirements.txt         # Dependencies
├── .env                     # Local environment variables (not pushed to Vercel)
├── .gitignore               # Ignore .env and other files
│
├── agents/                  # Agent modules
│   ├── __init__.py
│   ├── web_crawler.py       # Web crawling logic
│   └── groq_analyzer.py     # Groq API integration
│
├── services/                # Business logic
│   ├── __init__.py
│   └── keyword_analysis_workflow.py  # Workflow to coordinate agents
│
└── schemas/                 # Pydantic models
    ├── __init__.py
    └── models.py            # Request/response schemas
```

---

## **Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- **FastAPI** for the backend framework.
- **Groq API** for advanced keyword analysis.
- **Koyeb** for deployment and hosting.

---

## **Contact**
For questions or feedback, feel free to reach out:
- **Email**: adilmaqsood501@gmail.com
- **GitHub**: https://github.com/adilmaqsood1/

---

Enjoy using the **AI SEO Agent**! 🚀
