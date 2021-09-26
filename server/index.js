const express = require('express');
const request = require('request');
const lodash = require('lodash');
const app = express();
const port = process.env.PORT || 5000;
const baseUrl = `https://restcountries.com/v3`;
app.listen(port, () => console.log(`Listening on port ${port}`));
let countryList;
// create a GET route
app.get('/countries', (req, res) => {
  const page = req.query.page;
  const search = req.query.search;
  const order = req.query.order;
  const orderBy = req.query.orderBy;
  if(!countryList) {
  request.get(`${baseUrl}/all`, (error, response, body) => {
    const bodyJson = JSON.parse(body);
    if(!error && response.statusCode === 200) {
        countryList = bodyJson;
        sendData(res, countryList, search, page);
    }
  })
} else {
    sendData(res, countryList, search, page, order, orderBy);
}
});

function sendData(res, countryList, search, page, order, orderBy) {
    const filteredData = search ? countryList.filter(({ name: { common='' } }) => { 
        return common.toLowerCase().indexOf(search.toLowerCase()) !== -1
    }) : countryList;
    const sortedData = sortData(filteredData, order, orderBy);
    const currentIndex = page*10;
    let responseData;
    if(currentIndex + 10 < filteredData.length) {
        responseData = sortedData.slice(currentIndex, currentIndex + 10);
    } else {
        responseData = sortedData.slice(currentIndex);
    }
    // console.log('filtered data', responseData);
    res.status(200).send({ data: responseData, total: filteredData.length });
}

function sortData(data, order, orderBy) {
    console.log('sorting', order, orderBy);
    return data.sort((a, b) => {
        let fieldA, fieldB;
        if(orderBy === 'countryName') {
            fieldA = lodash.get(a, 'name.common');
            fieldB = lodash.get(b, 'name.common');
        } else if(orderBy === 'currency') {
            fieldA = Object.keys(lodash.get(a, 'currencies', {}))[0];
            fieldB = Object.keys(lodash.get(b, 'currencies', {}))[0];
        } else if(order === 'area') {
            console.log('for area', a,b);
            fieldA = lodash.get(a, 'area', 0);
            fieldB = lodash.get(b, 'area', 0);
        } else if(order === 'independent') {
            fieldA = lodash.get(a, order);
            fieldB = lodash.get(b, order);
        }
        console.log('fields', fieldA, fieldB, order);
        if(order  === 'asc') {
            if(fieldA > fieldB) {
                return 1;
            } else if(fieldB > fieldA) {
                return -1
            } 
            return 0;
        } else {
            if(fieldA > fieldB) {
                return -1;
            } else if(fieldB > fieldA) {
                return 1
            } 
            return 0;
        }
    });
}

app.use(express.static(__dirname+'/public'))
