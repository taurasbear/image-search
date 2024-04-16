import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onChange, onEnter }) => {

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onEnter();
        }
    }

    return (
        <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress }
        />
    );
}

export default SearchBar;