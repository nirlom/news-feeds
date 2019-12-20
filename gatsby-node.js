const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;

  // fetch raw data from the randomuser api

  const fetchAllArticles = () =>
    axios.get(
      `https://newsapi.org/v2/everything?pageSize=100&sources=the-times-of-india,the-hindu,google-news-in&apiKey=fde476b63c444d7683985cb9d9e381a0&language=en`
    );
  // await for results
  const res = await fetchAllArticles();
  const {
    data: { articles, totalResults }
  } = res;

  // map into these results and create nodes
  articles.map((article, i) => {
    if (!article.description) {
      return false;
    }
    // Create your node object
    const articleNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Article`
      },
      children: [],

      // Other fields that you want to query with graphQl
      ...article
    };

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(articleNode))
      .digest(`hex`);
    // add it to userNode
    articleNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(articleNode);
    return true;
  });
};
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   // `getPokemonData` is a function that fetches our data
//   const allNewsItems = await axios.get(
//     'https://newsapi.org/v2/everything?sources=the-times-of-india,the-hindu&apiKey=fde476b63c444d7683985cb9d9e381a0'
//   );
//   const {
//     data: { articles, totalResults }
//   } = allNewsItems;
//   // Create a page that lists all Pokémon.
//   // console.log('articles', allNewsItems);
//   createPage({
//     path: `/`,
//     component: require.resolve('./src/templates/news-cards.js'),
//     context: {
//       articles,
//       totalResults
//     }
//   });
//   return new Promise((resolve, reject) => {
//     resolve();
//   });
// };
