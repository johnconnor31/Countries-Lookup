import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CountryDetails from './CountryDetail';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/SearchTwoTone';

function transformData(datarow) {
    const { name: { common = '' }, currencies = {}, independent, area = 0, flags = [] } = datarow;
    const currencyKeys = Object.keys(currencies);
    return {
        countryName: common,
        currency: currencyKeys[0],
        area,
        independent,
        flag: flags.length && flags[0]
    }
}

const headCells = [
    {
        id: 'countryName',
        extraPadding: true,
        label: 'Country Name',
    },
    {
        id: 'currency',
        extraPadding: false,
        label: 'Currency',
    },
    {
        id: 'area',
        extraPadding: false,
        label: 'Area',
    },
    {
        id: 'independent',
        extraPadding: false,
        label: 'Status',
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.extraPadding ? '40' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            style={{ fontWeight: 'bold' }}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    style={{ fontWeight: 'bold' }}
                    key='flag'
                    align='left'
                    padding='normal'
                >
                    Flag
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable(props) {
    const [selected, setSelected] = React.useState();
    const { countries = [], page, setPage, total, order, setOrder, orderBy, setOrderBy, setSearch, isLoading } = props;
    const [delay, setDelay] = useState();
    
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, countryName) => {
        const countryIndex = countries.findIndex(ctry => ctry.name.common === countryName);
        setSelected(countryIndex);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const changeSearch = (e) => {
        if (delay) {
            clearTimeout(delay);
        }
        setDelay(setTimeout(() => {
            setSearch(e.target.value);
            setPage(0);
        }, 500));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <TextField style={{ width: '80%' }} fullWidth variant="outlined" size="small" InputProps={{
                startAdornment: <SearchIcon style={{ marginRight: '10px' }} />
            }}
                placeholder="Search a Country by Name"
                onChange={changeSearch} />
            <Box sx={{ width: '80%' }} style={{ marginTop: 20 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={countries.length}
                            />
                            {<TableBody>
                                {countries.map(transformData)
                                    .map((row, index) => {

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.countryName)}
                                                role="checkbox"
                                                aria-checked={index === selected}
                                                tabIndex={-1}
                                                key={row.countryName}
                                                selected={index === selected}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="40"
                                                >
                                                    {row.countryName || 'None'}
                                                </TableCell>
                                                <TableCell align="left">{row.currency || 'None'}</TableCell>
                                                <TableCell align="left">{row.area || 0}</TableCell>
                                                <TableCell align="left">{row.independent ? 'Independent' : 'Dependent'}</TableCell>
                                                <TableCell align="left">{row.flag && <img src={row.flag} height={20} width={40} />}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>}
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[-1]}
                        component="div"
                        count={total}
                        page={page}
                        rowsPerPage={10}
                        onPageChange={handleChangePage}
                    />
                    <CountryDetails country={selected !== -1 ? countries[selected] : ''} setCountry={setSelected} />

                </Paper>
            </Box>
            {isLoading && <div style={{ position: 'absolute', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>}
        </div>
    );
}
