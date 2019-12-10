import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';

const NewsCards = ({
  data: {
    allArticle: { totalCount, edges: articles }
  }
}) => {
  const [unreadArticles, setUnreadArticles] = useState(() => {
    if (typeof window !== 'undefined' && window) {
      window.numOfCards = totalCount;
      const readCounter = window.localStorage.getItem('cardsCounter') || 0;
      return _.slice(articles, 0, totalCount - readCounter);
    }
  });

  const handleOnCardClick = url => {
    window.location.href = url;
  };

  const handleOnCardShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'WebShare API Demo',
          url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
      console.log('eLSE Thanks for sharing!');
    }
  };

  return (
    <Layout>
      <header>
        <div className="row">
          <div className="icon bulb-light">
            <div className="bulb" />
          </div>
          <div className="icon">
            <div className="share" onClick={handleOnCardShareClick} />
          </div>
        </div>
      </header>
      <section className="demo">
        <main className="demo__content">
          <div className="demo__card-cont">
            {unreadArticles && unreadArticles.length > 0 ? (
              _.map(unreadArticles, article => (
                <div
                  onClick={() => handleOnCardClick(article.node.url)}
                  className="demo__card"
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
