import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import Layout from '../components/layout';

const NewsCards = ({
  data: {
    allArticle: { totalCount, edges: articles }
  }
}) => {
  let unreadArticles = [];
  let readCounter = 0;
  const didUpdate = () => {
    readCounter = parseInt(window.localStorage.getItem('cardsCounter')) || 0;
    window.numOfCards = totalCount;
  };
  if (readCounter > 0) {
    unreadArticles = _.slice(articles, 0, totalCount - readCounter);
  }
  useEffect(didUpdate);

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
            {_.map(unreadArticles, article => (
              <div
                onClick={() => handleOnCardClick(article.url)}
                className="demo__card"
              >
                <div>
                  <div className="demo__card__img">
                    <img
                      className="image"
                      src={article.urlToImage}
                      alt={article.title}
                    />
                  </div>
                  <div className="demo__card__news_text">
                    <h5 className="demo__card__name">{article.title}</h5>
                    <span className="author">{`${article.author} / ${article.publishedAt}`}</span>
                    <p className="demo__card__we">{article.description}</p>
                    <div className="readmore">
                      <a href={article.url}>
                        Read More @ {article.source.name}
                      </a>
                    </div>
                  </div>
                  <div className="demo__card__choice m--reject" />
                  <div className="demo__card__choice m--like" />
                  <div className="demo__card__drag" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </Layout>
  );
};

export default NewsCards;

export const pageQuery = graphql`
  query Articles {
    allArticle {
      totalCount
      edges {
        node {
          author
          id
          title
          description
          url
          urlToImage
          publishedAt
        }
      }
    }
  }
`;
