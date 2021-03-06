require('dotenv').config();
const path = require('path');

const {
  name,
  shortName,
  title,
  description,
  themeColor,
  backgroundColor,
  siteUrl,
  logo,
  author,
  type,
  googleAnalyticsID,
  favicon
} = require('./data/site-config');

module.exports = {
  siteMetadata: {
    title,
    description,
    author,
    siteUrl,
    logo,
    type,
    favicon
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: googleAnalyticsID,
        head: true
      }
    },
    // {
    //   resolve: 'gatsby-source-rest-api',
    //   options: {
    //     endpoints: [
    //       'https://newsapi.org/v2/top-headlines?country=in&apiKey=fde476b63c444d7683985cb9d9e381a0'
    //     ]
    //   }
    // },
    // {
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     // develop: true, // Enable while using `gatsby develop`
    //     // tailwind: true, // Enable tailwindcss support
    //     whitelist: [
    //       'bulb-dark .bulb',
    //       'bulb-dark',
    //       'demo__card__dark__mode',
    //       'demo__card.reset',
    //       'demo__card.reset',
    //       'demo__card__choice',
    //       'demo__card.inactive',
    //       'demo__card.to-left',
    //       'demo__card.to-right',
    //       'demo__card.below',
    //       'demo__card__top',
    //       'demo__tip',
    //       'container'
    //     ] // Don't remove this selector
    //     // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, `src`, `static/images`)
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name,
        short_name: shortName,
        start_url: '/',
        background_color: backgroundColor,
        theme_color: themeColor,
        display: 'minimal-ui',
        icon: favicon
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', disallow: '' }]
      }
    }
  ]
};
