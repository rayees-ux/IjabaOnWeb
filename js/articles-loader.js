// Load articles from JSON and render them
async function loadArticles(containerId, limit = null) {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();
        
        // Sort by latest first (reverse order)
        const sortedArticles = articles.reverse();
        
        // Limit articles if specified
        const displayArticles = limit ? sortedArticles.slice(0, limit) : sortedArticles;
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID "${containerId}" not found`);
            return;
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Render each article
        displayArticles.forEach(article => {
            const card = createArticleCard(article);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

// Create article card HTML element
function createArticleCard(article) {
    const link = document.createElement('a');
    link.href = `article-view.html?id=${article.id}`;
    link.className = 'post-card scroll-animate';
    link.style.textDecoration = 'none';
    
    link.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="post-card__image">
        <div class="post-card__content">
            <div class="post-card__meta">
                <span class="post-card__category">${article.category}</span>
                <span>${article.time}</span>
            </div>
            <h3 class="post-card__title">${article.title}</h3>
            <p class="post-card__excerpt">${article.preview}</p>
        </div>
    `;
    
    return link;
}

// Load article by ID and display full content
async function loadArticleById(articleId, containerIds) {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();
        
        // Find article by ID
        const article = articles.find(a => a.id == articleId);
        
        if (!article) {
            // Show error message
            const errorMessage = '<div class="alert alert-danger"><h3>Article Not Found</h3><p>The article you are looking for does not exist.</p></div>';
            Object.keys(containerIds).forEach(key => {
                const container = document.getElementById(containerIds[key]);
                if (container) container.innerHTML = errorMessage;
            });
            return;
        }
        
        // Render article content
        renderArticleContent(article, containerIds);
        
    } catch (error) {
        console.error('Error loading article:', error);
    }
}

// Render full article content
function renderArticleContent(article, containerIds) {
    // Render in each specified container
    Object.keys(containerIds).forEach(key => {
        const container = document.getElementById(containerIds[key]);
        if (container) {
            if (key === 'image') {
                container.innerHTML = `<img src="${article.image}" alt="${article.title}" class="img-fluid" style="width: 100%; max-height: 400px; object-fit: cover;">`;
            } else if (key === 'title') {
                container.innerHTML = `<h1 class="m-0 text-uppercase font-weight-bold">${article.title}</h1>`;
            } else if (key === 'meta') {
                container.innerHTML = `
                    <div class="mb-2">
                        <span class="badge badge-primary p-2 mr-2">${article.category}</span>
                        <span class="text-secondary">${article.time}</span>
                    </div>
                `;
            } else if (key === 'content') {
                container.innerHTML = `
                    <div class="article-content">
                        ${article.content}
                    </div>
                `;
            }
        }
    });
}

// Get article ID from URL query parameters
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Format article content with default styling
function formatArticleContent(content) {
    // Wrap content in article container
    return `<div class="article-content">${content}</div>`;
}
