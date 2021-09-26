import React, { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { fetchCountries, searchCountries } from './services/fetchCountries';

export default function CountryList() {
    const [countries, setCountries] = useState();
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('desc');
    const [search, setSearch] = useState();
    console.log('page', page);
    useEffect(() => {
        (fetchCountries(search, page)).then(result => {
            console.log('result is', result);
            if (result) {
                const { total = 0, data = [] } = result;
                setTotal(total);
                setCountries(data);
            } else {

            }
        });
    }, [page, search]);
    return (
        <CountryTable
            countries={countries}
            page={page}
            setPage={setPage}
            total={total}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setSearch={setSearch} />
    );
}
