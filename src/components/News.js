import React, { useEffect, useState, useCallback } from 'react';

function News({ darkMode, query }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [category, setCategory] = useState("general");
  const [error, setError] = useState(null);

  const pageSize = 9;

  //  Safe URL generator with dependencies
  const buildURL = useCallback((pageNum) => {
    return `https://newsapi.org/v2/top-headlines?country=us${
      category ? `&category=${category}` : ''
    }${query ? `&q=${query}` : ''}&page=${pageNum}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  }, [category, query, pageSize]);

  //  Infinite Scroll Loader
  const fetchMoreNews = useCallback(async () => {
    setLoading(true);
    const nextPage = page + 1;
    const url = buildURL(nextPage);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "ok") {
        setArticles(prev => [...prev, ...data.articles]);
        setPage(nextPage);
        setError(null);
      } else {
        setError(data.message || "API error");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }, [page, buildURL]);

  //  Initial News Fetch
  const fetchInitialNews = async () => {
    setLoading(true);
    setPage(1);
    const url = buildURL(1);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "ok") {
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setError(null);
      } else {
        setError(data.message || "API error");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  //  On scroll → load more
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        articles.length < totalResults
      ) {
        fetchMoreNews();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles, loading, totalResults, fetchMoreNews]);

  //  On category or search query change → load new
  useEffect(() => {
    fetchInitialNews();
    // eslint-disable-next-line
  }, [category, query]);

  const categories = ["general", "business", "technology", "sports", "entertainment"];

  return (
    <div className={`container my-4 ${darkMode ? 'text-light' : 'text-dark'}`}>
      <h2 className="text-center mb-4">Newsnet - {category.toUpperCase()} News</h2>

      {/* Category Buttons */}
      <div className="d-flex justify-content-center flex-wrap mb-4 gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-${cat === category ? 'primary' : 'outline-primary'} m-1`}
            onClick={() => {
              setCategory(cat);
              setArticles([]);
              setPage(1);
              setTotalResults(0);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-danger text-center"> {error}</p>}

      {/* News Cards */}
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-white' : ''}`}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="news"
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-primary mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading more news...</p>
        </div>
      )}
    </div>
  );
}

export default News;
