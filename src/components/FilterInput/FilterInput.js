import React from 'react';
import './FilterInput.css';

export default function FilterInput({ filterOptions, optionName, handleFormFilterInput }) {
    return (
        <div className="filterInput">
            <input
                className="MuiTypography-root MuiTypography-h7 MuiTypography-displayInline columnFilter"
                defaultValue={filterOptions[optionName]}
                onChange={handleFormFilterInput}
                name={optionName}
                placeholder="Filtrer"
            />
        </div>
    )
}
