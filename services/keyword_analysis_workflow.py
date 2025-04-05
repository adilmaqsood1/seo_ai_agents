from agents.web_crawler import SimpleWebCrawler
from agents.groq_analyzer import GroqKeywordAnalyzer
from utils.logger import log_info, log_error
import json

class KeywordAnalysisWorkflow:
    def __init__(self, groq_api_key):
        if not groq_api_key:
            log_error("Missing GROQ_API_KEY in environment variables")
            raise ValueError("GROQ_API_KEY is not set. Please check your environment variables.")
            
        self.crawler = SimpleWebCrawler()
        self.analyzer = GroqKeywordAnalyzer(groq_api_key)

    def run(self, url):
        """Run the workflow: Crawl -> Analyze -> Generate Report."""
        try:
            log_info(f"Starting analysis for URL: {url}")
            
            # Step 1: Extract keywords
            keywords = self.crawler.extract_keywords(url)
            if not keywords or len(keywords) == 0:
                log_error(f"No keywords extracted from URL: {url}")
                return {
                    "keywords": [],
                    "analysis": json.dumps({"error": "No keywords could be extracted from the provided URL"})
                }
                
            log_info(f"Extracted {len(keywords)} keywords from {url}")
            
            # Step 2: Analyze keywords
            analysis = self.analyzer.analyze_keywords(keywords)
            
            # Step 3: Return results
            return {
                "keywords": keywords[:100],  # Limit to first 100 keywords to avoid response size issues
                "analysis": analysis
            }
            
        except Exception as e:
            error_message = f"Workflow error: {str(e)}"
            log_error(error_message)
            return {
                "keywords": [],
                "analysis": json.dumps({"error": error_message})
            }