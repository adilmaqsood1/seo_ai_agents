document.addEventListener('DOMContentLoaded', function() {
    const crawlForm = document.getElementById('crawlForm');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resultsSection = document.getElementById('resultsSection');
    const noResultsSection = document.getElementById('noResultsSection');
    const keywordsList = document.getElementById('keywordsList');
    const sentimentAnalysis = document.getElementById('sentimentAnalysis');
    const categoriesList = document.getElementById('categoriesList');
    const recommendationsList = document.getElementById('recommendationsList');
    const nextStepsList = document.getElementById('nextStepsList');

    crawlForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        noResultsSection.classList.add('hidden');
        
        // Get form data
        const url = document.getElementById('url').value;
        
        try {
            // Call the API
            const response = await fetch('/crawl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            // Process and display results
            displayResults(result.data);
            
            // Show results section with animation
            resultsSection.classList.remove('hidden');
            noResultsSection.classList.add('hidden');
            
            // Add staggered fade-in animation to results sections
            const resultElements = resultsSection.querySelectorAll('.bg-white');
            resultElements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while analyzing the website. Please try again.');
        } finally {
            // Hide loading spinner
            loadingSpinner.classList.add('hidden');
            
            // If there was an error, show the no results section
            if (resultsSection.classList.contains('hidden')) {
                noResultsSection.classList.remove('hidden');
            }
        }
    });
    
    function displayResults(data) {
        // Display keywords
        displayKeywords(data.keywords);
        
        // Parse the analysis JSON if it's a string
        let analysis = data.analysis;
        if (typeof analysis === 'string') {
            try {
                analysis = JSON.parse(analysis);
            } catch (e) {
                console.error('Error parsing analysis JSON:', e);
                // If parsing fails, display raw text
                document.getElementById('sentimentAnalysis').innerHTML = `<pre class="whitespace-pre-wrap">${data.analysis}</pre>`;
                return;
            }
        }
        
        // Display sentiment analysis
        displaySentiment(analysis.sentiment);
        
        // Display categories
        displayCategories(analysis.categories);
        
        // Display recommendations
        displayRecommendations(analysis.recommendations);
        
        // Display next steps
        displayNextSteps(analysis.next_steps);
    }
    
    function displayKeywords(keywords) {
        keywordsList.innerHTML = '';
        
        if (keywords && keywords.length > 0) {
            const keywordsHtml = keywords.map(keyword => 
                `<span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">${keyword}</span>`
            ).join('');
            
            keywordsList.innerHTML = keywordsHtml;
        } else {
            keywordsList.innerHTML = '<p class="text-gray-500">No keywords found.</p>';
        }
    }
    
    function displaySentiment(sentiment) {
        if (!sentiment) {
            sentimentAnalysis.innerHTML = '<p class="text-gray-500">No sentiment analysis available.</p>';
            return;
        }
        
        let sentimentColor = 'bg-gray-100';
        if (sentiment.overall === 'positive') {
            sentimentColor = 'bg-green-100 text-green-800';
        } else if (sentiment.overall === 'negative') {
            sentimentColor = 'bg-red-100 text-red-800';
        } else if (sentiment.overall === 'neutral') {
            sentimentColor = 'bg-blue-100 text-blue-800';
        }
        
        let sentimentHtml = `
            <div class="mb-3">
                <span class="font-medium">Overall Sentiment:</span>
                <span class="${sentimentColor} text-sm font-medium px-2.5 py-0.5 rounded capitalize">${sentiment.overall}</span>
            </div>
        `;
        
        if (sentiment.keywords_indicating_trust && sentiment.keywords_indicating_trust.length > 0) {
            sentimentHtml += `
                <div>
                    <span class="font-medium">Trust Indicators:</span>
                    <div class="mt-1">
                        ${sentiment.keywords_indicating_trust.map(keyword => 
                            `<span class="inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
        
        sentimentAnalysis.innerHTML = sentimentHtml;
    }
    
    function displayCategories(categories) {
        // Check if the CategoryDisplay class is available
        if (window.CategoryDisplay) {
            // Use the new CategoryDisplay component
            const categoryDisplay = new CategoryDisplay('categoriesList');
            categoryDisplay.render(categories);
        } else {
            // Fallback to the original implementation if the component is not loaded
            if (!categories || Object.keys(categories).length === 0) {
                categoriesList.innerHTML = '<p class="text-gray-500">No categories available.</p>';
                return;
            }
            
            let categoriesHtml = '';
            
            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords && keywords.length > 0) {
                    categoriesHtml += `
                        <div class="mb-4">
                            <h4 class="font-medium text-dark mb-2">${category}</h4>
                            <div>
                                ${keywords.map(keyword => 
                                    `<span class="inline-block bg-gray-100 text-gray-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">${keyword}</span>`
                                ).join('')}
                            </div>
                        </div>
                    `;
                }
            }
            
            categoriesList.innerHTML = categoriesHtml || '<p class="text-gray-500">No categories available.</p>';
        }
    }
    
    function displayRecommendations(recommendations) {
        if (!recommendations || Object.keys(recommendations).length === 0) {
            recommendationsList.innerHTML = '<p class="text-gray-500">No recommendations available.</p>';
            return;
        }
        
        let recommendationsHtml = '';
        
        const recommendationTypes = {
            'on_page': { title: 'On-Page SEO', color: 'bg-blue-100 text-blue-800' },
            'content': { title: 'Content Strategy', color: 'bg-purple-100 text-purple-800' },
            'technical': { title: 'Technical SEO', color: 'bg-yellow-100 text-yellow-800' }
        };
        
        for (const [type, items] of Object.entries(recommendations)) {
            if (items && items.length > 0) {
                const typeInfo = recommendationTypes[type] || { title: type, color: 'bg-gray-100 text-gray-800' };
                
                recommendationsHtml += `
                    <div class="mb-4">
                        <h4 class="font-medium text-dark mb-2">
                            <span class="${typeInfo.color} text-sm font-medium px-2.5 py-0.5 rounded">${typeInfo.title}</span>
                        </h4>
                        <ul class="list-disc pl-5 space-y-1">
                            ${items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        }
        
        recommendationsList.innerHTML = recommendationsHtml || '<p class="text-gray-500">No recommendations available.</p>';
    }
    
    function displayNextSteps(nextSteps) {
        if (!nextSteps || nextSteps.length === 0) {
            nextStepsList.innerHTML = '<p class="text-gray-500">No next steps available.</p>';
            return;
        }
        
        const nextStepsHtml = nextSteps.map(step => `<li>${step}</li>`).join('');
        nextStepsList.innerHTML = nextStepsHtml;
    }
});