import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar.jsx';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (value) => {
        setSearchQuery(value);
    }

    const handleEnterSearch = async () => {
        console.log('Search for: ', searchQuery);
        try {
            const response = await fetch('api/ImageSearch/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchQuery)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            if (result.length === 0) {
                setNoResults(true); // Set noResults state to true if result is empty
            } else {
                navigate('/images', { state: { images: result } });
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    return (
        <div>
            <SearchBar onChange={handleSearchChange} onEnter={handleEnterSearch} />
            {noResults && <p>No results</p>}
        </div>    
    );

}

export default Search;