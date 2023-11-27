import React from 'react';

const Main = ({ data, tableHeadCells, sortDirection, sortTable, handleTitleClick }) => {

    return (
        <main className='main'>
            <div className='tableCtr'>
                <div className='table'>
                    <div className='row'>
                        {tableHeadCells.map((header, index) => (
                            <div
                                className='cell'
                                key={index}
                                data-sort-type={header.sortType}
                                data-sort-direction={sortDirection[index] || 'none'}
                                onClick={() => sortTable(index)}
                            >
                                {header.title}
                            </div>
                        ))}
                    </div>
                    {data.map((row, index) => (
                        <div className='row' key={index}>
                            {tableHeadCells.map((header) => (
                                <div
                                    className='cell'
                                    key={header.label}
                                    onClick={() => {
                                        if (header.label === 'target_title') {
                                            handleTitleClick(row.target_id, row.target_title)
                                        }
                                    }}
                                >
                                    {row[header.label]}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main >
    );
};

export default Main;