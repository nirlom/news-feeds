import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';

const NewsCards = ({
  data: {
    allArticle: { totalCount, edges: articles }
  }
}) => {
  const [startX, setStartX] = useState(0);
  const [pullDeltaX, setPullDeltaX] = useState(0);
  const [readCounter, setReadCounter] = useState(() => {
    if (typeof window !== 'undefined' && window) {
      window.numOfCards = totalCount;
      const todaysDate = new Date().getDate();
      if (window.localStorage.getItem('publishDate') < todaysDate) {
        window.localStorage.setItem('publishDate', todaysDate);
        window.localStorage.setItem('cardsCounter', 0);
      }

      return window.localStorage.getItem('cardsCounter') || 0;
    }
  });
  const handleOnCardClick = url => {
    window.location.href = url;
  };

  const handleOnCardNextClick = () => {
    setReadCounter(prevReadCounter => {
      const nextReadCounter =
        prevReadCounter + 1 > totalCount ? totalCount : prevReadCounter + 1;
      window.localStorage.setItem('cardsCounter', nextReadCounter);
      return nextReadCounter;
    });
  };
  const handleOnCardPrevClick = () => {
    setReadCounter(prevReadCounter => {
      const nextReadCounter = prevReadCounter - 1 < 0 ? 0 : prevReadCounter - 1;
      window.localStorage.setItem('cardsCounter', nextReadCounter);
      return nextReadCounter;
    });
    // if (navigator.share) {
    //   navigator
    //     .share({
    //       title: 'WebShare API Demo',
    //       url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    //     })
    //     .then(() => {
    //       console.log('Thanks for sharing!');
    //     })
    //     .catch(console.error);
    // } else {
    //   console.log('eLSE Thanks for sharing!');
    // }
  };

  const handleOnCardMove = e => {
    const x = e.pageX || e.nativeEvent.touches[0].pageX;
    setPullDeltaX(x - startX);
    return false;
  };

  const handleOnCardMoveEnd = e => {
    if (!pullDeltaX) return false;
    setReadCounter(prevReadCounter => {
      const nextReadCounter = parseInt(prevReadCounter) + 1;
      window.localStorage.setItem('cardsCounter', nextReadCounter);
      return nextReadCounter;
    });
    setPullDeltaX(0);
  };

  const handleOnCardMoveStart = e => {
    setStartX(e.pageX || e.nativeEvent.touches[0].pageX);
  };
  return (
    <Layout>
      <header>
        <div className="row">
          <div className="icon">
            {/* <div className="share" onClick={handleOnCardNextClick} /> */}
            <div className="share" onClick={handleOnCardPrevClick} />
          </div>
          <div className="icon bulb-light">
            <div className="bulb" />
          </div>
        </div>
      </header>
      <section className="demo">
        <main className="demo__content">
          <div className="demo__card-cont">
            {articles.length > readCounter ? (
              _.map(articles, article => (
                <div
                  onTouchMove={handleOnCardMove}
                  onMouseMove={handleOnCardMove}
                  onTouchStart={handleOnCardMoveStart}
                  onMouseUp={handleOnCardMoveStart}
                  onMouseDown={handleOnCardMoveEnd}
                  onTouchEnd={handleOnCardMoveEnd}
                  key={article.node.id}
                  id={`div-${article.node.id}`}
                  className={`demo__card ${
                    article.node.id >= articles.length - readCounter
                      ? 'below'
                      : ''
                  }`}
                >
                  <div>
                    <div className="demo__card__img">
                      <img
                        className="image"
                        src={article.node.urlToImage}
                        alt={article.node.title}
                      />
                    </div>
                    <div className="demo__card__news_text">
                      <h5 className="demo__card__name">{article.node.title}</h5>
                      <span className="author">{`${article.node.author} / ${article.node.publishedAt}`}</span>
                      <p className="demo__card__we">
                        {article.node.description}
                      </p>
                      <div className="readmore">
                        <a href={article.node.url}>
                          Read More @ {article.node.source.name}
                        </a>
                      </div>
                    </div>
                    <div className="demo__card__choice m--reject" />
                    <div className="demo__card__choice m--like" />
                    <div className="demo__card__drag" />
                  </div>
                </div>
              ))
            ) : (
              <div id="div-thankyou" className="demo__card">
                <div className="demo__card__news_text">
                  <h5 className="demo__card__name">
                    Thank you so much for reading all the news
                  </h5>
                  <p className="demo__card__we">See you tomorrow</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>
    </Layout>
  );
};

export default NewsCards;

export const pageQuery = graphql`
  query {
    allArticle {
      totalCount
      edges {
        node {
          source {
            name
            id
          }
          author
          id
          title
          description
          url
          urlToImage
          publishedAt(formatString: "DD, MMM YYYY")
        }
      }
    }
  }
`;
