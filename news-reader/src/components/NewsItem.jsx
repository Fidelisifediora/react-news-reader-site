/* eslint-disable react/prop-types */


const NewsItem = ({ article }) => {
  return (
    <div className="news-item">
      <h2>{article.title}</h2>
      <img src={article.urlToImage} alt={article.title} />
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default NewsItem;
