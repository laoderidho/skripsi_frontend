import React, {useState} from 'react'
import Sidebar from './Sidebar';
import "../../style/autocomplete.css";



export default function DaftarPasien() {

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState (null);
    const [tableData, setTableData] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const fetchedSuggestions = setSuggestions(value);
        setSuggestions(fetchedSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSelectedSuggestion(suggestion);
        setSuggestions([]);

        setTableData([...tableData, suggestion]);
    };

    

    
    return (


    <div>
        <Sidebar/>
        <div className="content">

            {/* Title */}
            <div className="d-flex justify-content-between">
              <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="backbutton">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
               
                <div>
                    <h3>Daftar Pasien</h3>
                </div>

                <p></p>
          
            </div>

            {/* Autocomplete Search */}

            <div className="autocomplete">
                <input 
                    type='text'
                    id="search-input"
                    placeholder='Search'
                    value={inputValue}
                    onChange={handleInputChange}
                />

                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
               
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Lihat Laporan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Timbul Mahendra</td>
                            <td>
                                <a>Lihat Laporan</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Sharon Venicia</td>
                            <td>
                                <a>Lihat Laporan</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
  )
}
