import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Search from './search/Search';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (e) => {
    setInputValue(e);
  };

  const updateNews = async () => {
    setLoading(true);
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&q=${inputValue}`;

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      props.setProgress(100);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [page, props.category, props.country, props.apiKey, props.pageSize, inputValue]);

  const handleNextClick = () => {
    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
      return;
    }

    setPage(page + 1);
  };

  const handlePrevClick = () => {
    if (page <= 1) {
      return;
    }

    setPage(page - 1);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        News-feed - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
        <Search handleSearch={handleChange} />
      </div>
      {loading && <Spinner />}
      <div className="container">
        <div className="row">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        <div className="mb-5 container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>
            &larr; Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };
  
  News.propTypes = {
    country: PropTypes.string
  }

  export default News