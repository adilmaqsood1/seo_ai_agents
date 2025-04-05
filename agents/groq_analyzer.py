import groq
from utils.logger import log_info, log_error
import json

class GroqKeywordAnalyzer:
    def __init__(self, api_key):
        if not api_key or api_key.isspace():
            raise ValueError("GROQ_API_KEY is missing or empty. Please check your environment variables.")
        self.client = groq.Client(api_key=api_key)

    def analyze_keywords(self, keywords):
        """Use Groq API to generate a detailed SEO analysis report."""
        if not keywords or len(keywords) == 0:
            raise ValueError("No keywords provided for analysis")
            
        keyword_text = ", ".join(keywords)
        log_info(f"Analyzing {len(keywords)} keywords with Groq API")

        # Define the prompt for Groq
        prompt = f"""
        Analyze these keywords: {keyword_text}. Provide a detailed SEO report including:
        1. **Keyword Categorization**: Group keywords into categories like Brand, Services, Core Values, etc.
        2. **Sentiment Analysis**: Determine the overall sentiment and highlight positive/neutral keywords.
        3. **SEO Recommendations**: Suggest actionable on-page, content, and technical SEO strategies.
        4. **Competitor Gap Analysis**: Identify missing keywords or opportunities.
        5. **Actionable Next Steps**: Provide a clear roadmap for SEO improvement.

        Format the report as a JSON object with the following structure:
        {{
          "categories": {{
            "Brand & Team": ["keyword1", "keyword2", ...],
            "Core Services": ["keyword1", "keyword2", ...],
            ...
          }},
          "sentiment": {{
            "overall": "positive/neutral/negative",
            "keywords_indicating_trust": ["keyword1", "keyword2", ...]
          }},
          "recommendations": {{
            "on_page": ["Optimize title tags with 'Award-Winning Digital Marketing'", ...],
            "content": ["Publish blog on 'AI-Driven SEO'", ...],
            "technical": ["Fix broken links using Screaming Frog", ...]
          }},
          "next_steps": [
            "Build a 'Client Success Hub' showcasing ROI metrics",
            "Create a 'Cybersecurity Checklist' PDF for lead generation"
          ]
        }}
        """

        try:
            # Call Groq API
            response = self.client.chat.completions.create(
                model="deepseek-r1-distill-llama-70b",  
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful AI trained in SEO and keyword analysis. Analyze the following keywords and provide a detailed SEO report."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                max_tokens=1000
            )

            # Extract the analysis from the response
            analysis = response.choices[0].message.content
            log_info("Successfully received Groq API response")
            
            # Validate that the response is valid JSON
            try:
                json.loads(analysis)
            except json.JSONDecodeError:
                log_error("Groq API returned non-JSON response")
                # Return a simplified JSON response instead of failing
                return json.dumps({
                    "error": "Invalid response format from Groq API",
                    "raw_keywords": keywords[:10]  # Include some of the keywords for reference
                })
                
            return analysis
            
        except Exception as e:
            error_message = f"Error calling Groq API: {str(e)}"
            log_error(error_message)
            # Return a JSON error response instead of raising an exception
            return json.dumps({
                "error": error_message,
                "keywords_count": len(keywords)
            })
