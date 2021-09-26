import React, { useState, useEffect } from 'react';
import CountryTable from './CountryTable';
import { fetchCountries } from '../services/fetchCountries';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

export default function CountryList() {
    const [countries, setCountries] = useState();
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('countryName');
    const [search, setSearch] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState();
    useEffect(() => {
        setLoading(true);
        fetchCountries(search, page, order, orderBy).then(result => {
            // console.log('result is', result);
            if (result) {
                const { total = 0, data = [], message } = result;
                setTotal(total);
                setCountries(data);
                setLoading(false);
                if (message) {
                    setError(message);
                }
            }
        });
    }, [page, search, order, orderBy]);
    return (
        <>
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
            <Snackbar
                message={<div style={{ color: 'red'}}>{error}</div>}
                open={Boolean(error)}
                onClose={() => setError('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                action={<CloseIcon />}
            />
        </>
    );
}
