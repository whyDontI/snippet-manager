import React, { useState, ChangeEvent } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={handleChange}
      className={styles.searchBar}
    />
  );
}

export default SearchBar;
