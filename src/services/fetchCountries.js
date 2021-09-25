export function fetchCountries(search, page) {
    return fetch(`/countries?search=${search || ''}&page=${page}`).then(response => {
        const data = response.json();
        return data;
    });
}
