Evaluate News NLP - Project Instructions

This repository contains the starter code for the Evaluate News NLP project. It is based on the starter code from Lesson 2, and you will install and configure Webpack just as we did in the course.

The goal of this project is to give you hands-on practice with:

Setting up Webpack

Using Sass for styling

Configuring Webpack Loaders and Plugins

Creating responsive layouts and page designs

Implementing Service Workers

Making API requests to external URLs

Additionally, this project introduces Natural Language Processing (NLP), a subfield of AI that enables computers to analyze and interpret human language.

Getting Started

Step 1: Clone the Repository

git clone https://github.com/YOUR_USERNAME/evaluate-news-nlp.git
cd evaluate-news-nlp

Step 2: Install Dependencies

Run the following command to install all required dependencies:

npm install --legacy-peer-deps

If you experience dependency issues, try removing node_modules and package-lock.json, then running the command again.

Setting Up the API

We will be using the Aylien Text Analysis API for NLP processing. Aylien provides various text analysis tools such as sentiment analysis, entity recognition, and summarization.

Step 1: Sign Up for an API Key

Go to Aylien Developer Signup and create an account. After signing up, you will receive your API credentials.

Step 2: Install Required Packages

To interact with the Aylien API, install the official Node.js SDK:

npm install aylien_textapi dotenv

Step 3: Set Up API Credentials

To keep your API credentials secure:

Create a .env file in the root of your project.

Add your API credentials to the .env file:

API_ID=your-api-id
API_KEY=your-api-key

Ensure .env is added to .gitignore to prevent accidental exposure of your API keys.

Step 4: Configure the Server

Inside server/index.js, require the necessary modules and configure the Aylien API:

const dotenv = require('dotenv');
dotenv.config();

var aylien = require('aylien_textapi');

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

console.log('Aylien API is configured successfully.');

Running the Project

To start the development server, run:

npm start

Then open http://localhost:8080/ in your browser.

Testing API Requests

You can test the API using the following example request:

textapi.sentiment(
  { text: 'This is an amazing project!' },
  (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log(response);
    }
  }
);

Webpack Configuration

The project uses Webpack for bundling and optimizing assets.

Main Webpack Features Configured:

Entry & Output: Manages source files and generates a bundled output.

Loaders: Handles SCSS, Babel (JS), and HTML files.

Plugins: Includes HTMLWebpackPlugin, MiniCssExtractPlugin, and Service Workers.

Production Optimizations: Uses css-minimizer-webpack-plugin for CSS optimization.

Installing Webpack Dependencies

npm install webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin css-loader sass-loader style-loader babel-loader @babel/core @babel/preset-env css-minimizer-webpack-plugin

Note: optimize-css-assets-webpack-plugin is outdated and incompatible with Webpack 5. Instead, use css-minimizer-webpack-plugin.

Service Workers

Before deploying, ensure that the service worker is correctly registered in src/client/index.js:

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('Service worker registered:', reg))
      .catch((err) => console.log('Service worker registration failed:', err));
  });
}

Deploying the Project

You can deploy the project using:

Netlify

Vercel

Render

Deployment Steps (Netlify Example)

Push your code to a GitHub repository.

Go to Netlify and link your GitHub repository.

Set the build command to npm run build and output directory to dist/.

Deploy your project!

"# evaluate-news-nlp" 
