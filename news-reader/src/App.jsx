/* eslint-disable react-hooks/exhaustive-deps */
import  { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import NewsItem from './components/NewsItem';
import Toggle from './components/Toggle';
import debounce from 'lodash.debounce';

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [theme, setTheme] = useState('light');

  // Debounced fetchNews function
  const fetchNews = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery) {
        setArticles([]);
        return;
      }
      const API_KEY = '1a3443308e9a49a38acc61a1d0f9f771'; // Replace with your NewsAPI key
      const url =`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      try {
        const response = await axios.get(url);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }, 500), // 500ms debounce delay
    [category]
  );

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    fetchNews(searchQuery);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <header>
        <h1>News Search</h1>
        <Toggle onToggle={handleToggleTheme} />
      </header>
      <form>
        <input
          type="text"
          placeholder="Search for news..."
          value={query}
          onChange={handleSearch}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </form>
      <div className="news-container">
        {articles.length === 0 ? (
          <p>No news found. Try a different query or category.</p>
        ) : (
          articles.map((article, index) => (
            <NewsItem key={index} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
