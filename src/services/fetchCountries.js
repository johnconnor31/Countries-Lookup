export function fetchCountries(search, page, order, orderBy) {
    console.log('ordering', order, orderBy);
    return fetch(`/countries?search=${search || ''}&page=${page}&order=${order || ''}&orderBy=${orderBy || ''}`).then(response => {
        const data = response.json();
        return data;
    }).catch(error => {
        return { message: 'There was an error fetching data' };   
    });
}
