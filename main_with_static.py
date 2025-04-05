from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from schemas.models import CrawlRequest, CrawlResponse
from services.keyword_analysis_workflow import KeywordAnalysisWorkflow
from fastapi.responses import HTMLResponse
from dotenv import load_dotenv
import os 

app = FastAPI()

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    # Redirect to the static index.html file
    return HTMLResponse(content=open("static/index.html", "r").read())

@app.post("/crawl", response_model=CrawlResponse)
async def crawl_website(request: CrawlRequest):
    workflow = KeywordAnalysisWorkflow(GROQ_API_KEY)

    try:
        result = workflow.run(request.url)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))