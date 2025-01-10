document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const queryInput = document.getElementById('input-search');
    const newsContainer = document.getElementById('news-container');
    const toggleBtn = document.getElementById('toggle');
    const body = document.body;
    const API_KEY = '1a3443308e9a49a38acc61a1d0f9f771';
    const BASE_URL = 'https://newsapi.org/v2';
  
    // Initialize theme based on localStorage
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.replace('light', 'dark');
      toggleBtn.textContent = 'Dark theme: ON';
    }
  
    // Handle form submission for search queries
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = queryInput.value.trim();
      if (query) {
        await fetchNews('everything', { q: query });
      }
    });
  
    // Handle navigation link clicks for categories
    document.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', async (event) => {
        event.preventDefault();
        const category = link.getAttribute('data-category');
        await fetchNews('top-headlines', { category });
      });
    });
  
    // Fetch news based on type and parameters
    const fetchNews = async (endpoint, params) => {
      newsContainer.innerHTML = '<p>Loading...</p>';
      try {
        const url = new URL(`${BASE_URL}/${endpoint}`);
        url.search = new URLSearchParams({
          ...params,
          apiKey: API_KEY,
          country: 'us', // Adjust as needed
        });
  
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          displayNews(data.articles);
        } else {
          newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
      } catch (error) {
        newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
      }
    };
  
    // Display news articles in the DOM
    const displayNews = (articles) => {
      newsContainer.innerHTML = articles.map(article => `
        <div class="news-item">
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      `).join('');
    };
  
    // Fetch general news on initial load
    fetchNews('top-headlines', { category: 'general' });
  
    // Theme toggle function
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = 'Light theme: ON';
      } else {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = 'Dark theme: ON';
      }
    });
  });
  
