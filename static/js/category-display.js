/**
 * Category Display Component
 * Handles the display of keyword categories in collapsible sections
 */

class CategoryDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
    }

    /**
     * Renders the categories in the container
     * @param {Object} categories - Object with category names as keys and arrays of keywords as values
     */
    render(categories) {
        if (!categories || Object.keys(categories).length === 0) {
            this.container.innerHTML = '<p class="text-gray-500">No categories available.</p>';
            return;
        }

        // Clear the container
        this.container.innerHTML = '';

        // Create a div for each category
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords && keywords.length > 0) {
                const categoryDiv = this.createCategorySection(category, keywords);
                this.container.appendChild(categoryDiv);
            }
        }
    }

    /**
     * Creates a collapsible section for a category
     * @param {string} categoryName - The name of the category
     * @param {Array} keywords - Array of keywords in the category
     * @returns {HTMLElement} - The category section element
     */
    createCategorySection(categoryName, keywords) {
        // Create the category section container
        const section = document.createElement('div');
        section.className = 'mb-6 bg-white rounded-lg shadow-sm overflow-hidden';

        // Create the header (clickable for collapse/expand)
        const header = document.createElement('div');
        header.className = 'flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition';
        header.innerHTML = `
            <h4 class="font-medium text-dark">${categoryName}</h4>
            <svg class="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;

        // Create the content container (initially expanded)
        const content = document.createElement('div');
        content.className = 'p-4 border-t border-gray-100';

        // Add keywords as tags
        const keywordsContainer = document.createElement('div');
        keywordsContainer.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 keywords-container';

        // Get a color for this category
        const colorClass = this.getCategoryColorClass(categoryName);

        // Add each keyword as a tag in its own div
        keywords.forEach(keyword => {
            // Create a div for each keyword
            const keywordDiv = document.createElement('div');
            keywordDiv.className = 'keyword-item p-2 border border-gray-100 rounded-md shadow-sm';
            
            // Create the tag inside the div
            const tag = document.createElement('span');
            tag.className = `block w-full text-center ${colorClass} text-sm font-medium px-3 py-2 rounded keyword-tag`;
            tag.textContent = keyword;
            
            // Add the tag to the div
            keywordDiv.appendChild(tag);
            
            // Add the div to the container
            keywordsContainer.appendChild(keywordDiv);
        });

        content.appendChild(keywordsContainer);
        section.appendChild(header);
        section.appendChild(content);

        // Add toggle functionality
        header.addEventListener('click', () => {
            content.classList.toggle('hidden');
            const arrow = header.querySelector('svg');
            arrow.classList.toggle('rotate-180');
        });

        return section;
    }

    /**
     * Returns a color class based on the category name
     * @param {string} categoryName - The name of the category
     * @returns {string} - Tailwind CSS color class
     */
    getCategoryColorClass(categoryName) {
        // Map category names to color classes
        const colorMap = {
            'Brand & Team': 'bg-blue-100 text-blue-800',
            'Core Services': 'bg-green-100 text-green-800',
            'Features & Benefits': 'bg-purple-100 text-purple-800',
            'Technology & Security': 'bg-red-100 text-red-800',
            'Customer Support & Experience': 'bg-yellow-100 text-yellow-800',
            'Compliance & Regulation': 'bg-indigo-100 text-indigo-800',
            'Marketing & Promotion': 'bg-pink-100 text-pink-800',
            'Location & Accessibility': 'bg-teal-100 text-teal-800',
            'Financial Products': 'bg-orange-100 text-orange-800'
        };

        return colorMap[categoryName] || 'bg-gray-100 text-gray-800';
    }
}

// Export the class for use in main.js
window.CategoryDisplay = CategoryDisplay;