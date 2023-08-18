const express = require('express');
const axios = require('axios');

// URL of the JSON data
const url = 'https://guts-cdn.s3.eu-central-1.amazonaws.com/gametest.json';

let jsonData = ''

const app = express();
const port = 3006;

app.use(express.json());

app.get('/games', (req, res) => {
    // Using axios to make a GET request
axios.get(url)
.then(response => {
  // Data is available in response.data
   jsonData = response.data;
  //console.log(jsonData);
})
.catch(error => {
  console.error('Error fetching data:', error);
});
  let pageSize = parseInt(req.query.pageSize) || 10;
  let page = parseInt(req.query.page) || 1;

  let startIndex = (page - 1) * pageSize;
  let endIndex = page * pageSize;

  let paginatedGames = jsonData.slice(startIndex, endIndex);
   
  res.json({
    totalPages: Math.ceil(jsonData.length / pageSize),
    currentPage: page,
    games: paginatedGames,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
