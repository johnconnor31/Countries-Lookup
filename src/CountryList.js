import React, { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { fetchCountries, searchCountries } from './services/fetchCountries';

export default function CountryList() {
    const [countries, setCountries] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('desc');
    const [search, setSearch] = useState();
    console.log('page', page);
    useEffect(() => {
        (fetchCountries(search, page)).then(result => {
            console.log('result is', result);
            if (Array.isArray(result)) {
                setCountries(result);
            } else {

            }
        });
    }, [page, search]);
    return (
        <CountryTable
            countries={countries}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setSearch={setSearch} />
    );
}
