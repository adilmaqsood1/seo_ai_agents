/**
 * CategoryDisplay Component
 * Renders keyword categories with interactive UI elements
 */
class CategoryDisplay {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.colorClasses = [
            'color-primary',
            'color-secondary',
            'color-tertiary',
            'color-quaternary',
            'color-quinary',
            'color-senary'
        ];
    }

    /**
     * Render the categories in the container
     * @param {Object} categories - Object with category names as keys and arrays of keywords as values
     */
    render(categories) {
        if (!categories || Object.keys(categories).length === 0) {
            this.container.innerHTML = '<p class="text-gray-500">No categories available.</p>';
            return;
        }

        let categoriesHtml = '';
        let colorIndex = 0;

        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords && keywords.length > 0) {
                const currentColorClass = this.colorClasses[colorIndex % this.colorClasses.length];
                colorIndex++;

                categoriesHtml += `
                    <div class="category-container mb-4 rounded-lg overflow-hidden shadow-sm">
                        <div class="category-header p-3 flex justify-between items-center cursor-pointer">
                            <div class="flex items-center">
                                <h4 class="font-medium text-dark">${category}</h4>
                                <span class="category-count ml-2 px-2 py-1 rounded-full text-xs font-medium bg-white">${keywords.length}</span>
                            </div>
                            <svg class="dropdown-arrow w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                        <div class="category-content p-3 bg-white">
                            <div class="flex flex-wrap gap-2 keywords-container">
                                ${keywords.map((keyword, index) => 
                                    `<span class="keyword-tag keyword-item ${currentColorClass} text-sm font-medium px-2.5 py-0.5 rounded" style="animation-delay: ${index * 0.05}s">${keyword}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        this.container.innerHTML = categoriesHtml || '<p class="text-gray-500">No categories available.</p>';
        this.addEventListeners();
    }

    /**
     * Add event listeners to the category headers for toggling content
     */
    addEventListeners() {
        const headers = this.container.querySelectorAll('.category-header');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isVisible = !content.classList.contains('hidden');
                
                // Toggle visibility using the CSS classes
                content.classList.toggle('hidden', isVisible);
                
                // Update header appearance
                header.classList.toggle('active', !isVisible);
                
                // Add animation for dropdown arrow if it exists
                const arrow = header.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('rotate', !isVisible);
                }
            });
        });
    }
}