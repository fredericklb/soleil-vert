import React from 'react';
import './searchBar.scss';
import searchIcon from '../../../../../assets/icons/search.svg';
import closeIcon from '../../../../../assets/icons/close.svg';

const SearchBar = ({ searchQuery, setSearchQuery, filterItems }) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterItems(e.target.value);
    };

    const handleClearClick = () => {
        setSearchQuery('');
        filterItems('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <img src={searchIcon} alt="Search icon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-input"
                />
                {searchQuery && (
                    <img
                        src={closeIcon}
                        alt="Clear icon"
                        className="clear-icon"
                        onClick={handleClearClick}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchBar;
