const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 5000;
const baseUrl = `https://restcountries.com/v3`;
app.listen(port, () => console.log(`Listening on port ${port}`));
let countryList;
// create a GET route
app.get('/countries', (req, res) => {
  const page = req.query.page;
  const search = req.query.search;
  if(!countryList) {
  request.get(`${baseUrl}/all`, (error, response, body) => {
    const bodyJson = JSON.parse(body);
    if(!error && response.statusCode === 200) {
        countryList = bodyJson;
        sendData(res, countryList, search, page);
    }
  })
} else {
    sendData(res, countryList, search, page);
}
});

function sendData(res, countryList, search, page) {
    const filteredData = search ? countryList.filter(({ name: { common='' } }) => { 
        return common.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }) : countryList;
    const currentIndex = page*10;
    let responseData;
    if(currentIndex + 10 < filteredData.length) {
        responseData = filteredData.slice(currentIndex, currentIndex + 10);
    } else {
        responseData = filteredData.slice(currentIndex);
    }
    console.log('filtered data', responseData);
    res.status(200).send({ data: responseData, total: filteredData.length });
}

app.use(express.static(__dirname+'/public'))
