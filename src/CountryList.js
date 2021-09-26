import React, { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { fetchCountries, searchCountries } from './services/fetchCountries';

export default function CountryList() {
    const [countries, setCountries] = useState();
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState();
    const [search, setSearch] = useState();
    const [isLoading, setLoading] = useState(false);
    console.log('page', page);
    useEffect(() => {
        setLoading(true);
        fetchCountries(search, page, order, orderBy).then(result => {
            console.log('result is', result);
            if (result) {
                const { total = 0, data = [] } = result;
                setTotal(total);
                setCountries(data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    }, [page, search, order, orderBy]);
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
            setSearch={setSearch}
            isLoading={isLoading} />
    );
}
