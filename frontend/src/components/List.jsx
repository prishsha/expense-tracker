import React, { useState, useMemo } from 'react';
import { useFinancialRecords } from '../contexts/financial-record';
import { useTable, useSortBy, useGlobalFilter } from "react-table";

const List = () => {
    const { records, deleteRecord } = useFinancialRecords();
    const [filterInput, setFilterInput] = useState("");

    const columns = useMemo(
        () => [
            {
                Header: 'Sr.No.',
                accessor: (row, index) => index + 1,
            },
            {
                Header: 'Date',
                accessor: 'date',
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                Cell: ({ value }) => `${value}`,
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(row.original._id)}>Delete</button>
                    </>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: records,
        },
        useGlobalFilter,
        useSortBy
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setGlobalFilter(value);
        setFilterInput(value);
    };

    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm("Are you sure you want to delete this record?")) {
            console.log(id);
            deleteRecord(id);
        }
    };

    return (
        <div className='table-container'>
            <div className="table-controls">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search records..."}
                />
            </div>
            <table {...getTableProps()} className='table'>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "10px", color: "black" }}>
                                No expenses to display
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default List;
