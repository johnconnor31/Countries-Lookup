import React from 'react';
import get from 'lodash/get';
import Popover from '@material-ui/core/Popover';
import { CardContent, Typography } from '@material-ui/core';

export default function CountryDetails({ country, setCountry }) {
    return (
        <Popover
            open={Boolean(country)}
            onClose={() => setCountry(-1)}
            anchorReference="anchorPosition"
            anchorPosition={{
                left: 700,
                top: 100
            }}>
            <CountryDetail country={country} />
        </Popover>
    )
};

function CountryDetail({ country = {} }) {
    const data = prepareData(country);
    const flag = data.flags.length ? data.flags[0] : '';
    return (
        <CardContent style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div>
                {Object.keys(data).map((key) => key !== 'flags' && (
                    <>
                        <Typography style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }} color="text.secondary" gutterBottom>
                            {key}
                        </Typography>
                        <Typography style={{ marginTop: -5 }}>
                            {data[key]} &nbsp;&nbsp;{key === 'Latitute and Longitude' && <a target='_blank' href={`https://www.google.com/maps/place/46%C2%B000'00.0%22N+2%C2%B000'00.0%22E/@${data[key]},5z/`}>View on Map</a>}
                        </Typography>
                    </>
                )
                )}
            </div>
            <div>
                <img style={{ border: '1px solid grey' }} src={flag} height={150} width={300} />
            </div>
        </CardContent>
    );
}

function prepareData(country) {
    const result = {};
    result['Common Name'] = get(country, 'name.common', 'NA');
    result['Offical Name'] = get(country, 'name.official', 'NA');
    result['capitals'] = get(country, 'capital', []).toString();
    const languages = get(country, 'languages', {});
    let langList = '';
    for (var key in languages) {
        langList = langList.concat(languages[key]);
    }
    result['Languages'] = langList;
    result['code'] = get(country, 'cca2', 'NA');
    result['Is Independent'] = get(country, 'independent') ? 'Yes' : 'No';
    result['Is UN Member'] = get(country, 'unMember') ? 'Yes' : 'No';
    const currencies = get(country, 'currencies', {});
    let currencyList = '';
    for (var key in currencies) {
        const { name = '', symbol = '' } = currencies[key];
        currencyList = currencyList.concat(`${name} (${symbol})`);
    }
    result['Currencies'] = currencyList;
    result['region'] = get(country, 'region', 'NA');
    result['Latitute and Longitude'] = get(country, 'latlng', []).toString();
    result['area in Sqare km'] = get(country, 'area', 0);
    result['flags'] = get(country, 'flags', []);
    return result;
}