import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Search from './search/Search';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        
        setInputValue(e);
      };

      const updateSearchNews= async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&q=${inputValue}`;
        console.log(url) 
        let data = await fetch(url);
        let parsedData = await data.json()
        const filteredArticles = parsedData.articles.filter(
            (article) => article.source.name  !== "Hindustan Times"
          );
        setArticles(filteredArticles);
        setTotalResults(parsedData.totalResults)
      }
      useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateSearchNews(); 
    }, [inputValue])

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}&q=${inputValue}`;
        console.log(url) 
        setLoading(true)
        console.log(url)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        setLoading(false)
        console.log(parsedData);
        props.setProgress(70);
        const filteredArticles = parsedData.articles.filter(
            (article) => article.source.name  !== "Hindustan Times"
          );
          
        setArticles(filteredArticles);
        setTotalResults(parsedData.totalResults)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
    }, [])


 
 
     const handleNextClick = async () => {
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
        }
        else {
            props.setProgress(10);

            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}&`;
            setLoading(true)
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json()
            props.setProgress(70);
            setPage(page+1)
            const filteredArticles = parsedData.articles.filter(
                (article) => article.source.name  !== "Hindustan Times"
              );
            setArticles(filteredArticles);
            setLoading(false)
           props.setProgress(100);
            
        }
    }

    const handlePrevClick = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page-1}&pageSize=${props.pageSize}&`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setPage(page-1)
        const filteredArticles = parsedData.articles.filter(
            (article) => article.source.name  !== "Hindustan Times"
          );
        setArticles(filteredArticles);
        setLoading(false)
        props.setProgress(100);
        
    }
        return (
            <>

                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>News-feed - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                <div className='col-12' style={{display:"flex",justifyContent:"center"}}>
                            <Search handleSearch={handleChange}/>
                        </div>
                {loading && <Spinner />}
               
                    <div className="container">
                         
                    <div className="row">
                        
                    {!loading && articles && articles.map((element) => {
                      
                      return (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>
                        
                    );
    
})}
                    </div>
                    <div className="mb-5 container d-flex justify-content-between">
                    <button disabled={page<=1} type="button" class="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
</div>
                    </div> 
                {/* </InfiniteScroll> */}
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
