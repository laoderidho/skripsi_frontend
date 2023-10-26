import React, {useState} from 'react';
import "../../style/autocomplete.css";

export default function Autocomplete() {
    
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const fetchedSuggestions = getSuggestions(value);
        setSuggestions(fetchedSuggestions);
    };

    const getSuggestions = (value) => {
        return [
            'Suggestion 1',
            'Suggestion 2',
            'Suggestion 3',
        ];
    };

    return (
        <div className="autcomplete">
            <input type="text" id="search-input" placeholder="Search" value={inputValue} onChange={handleInputChange} />

            <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                ))}
            </ul>
        </div>
    );
}