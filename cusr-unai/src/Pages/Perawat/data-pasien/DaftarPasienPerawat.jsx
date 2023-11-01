import React, {useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table } from "react-bootstrap";
import "../../../../src/style/autocomplete.css";
export default function DaftarPasien() {

    // Autocomplete

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
      <Sidebar>
        {/* Title */}
        <div className="d-flex justify-content-between">
            <div>
                {/* Empty */}
            </div>

            <div>
            <h3>Daftar Pasien</h3>
            </div>

            <p></p>
        </div>

        {/* Search */}

        <div className="search-container">
                <input className="search-input" type="text" placeholder="Search" value={inputValue} onChange={handleInputChange} />

                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
        </div>

        <table className="custom-table custom-table-rounded">
            <thead>
                <tr>
                    <th className="one">Nama</th>
                    <th>Lihat Laporan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Timbul Mahendra</td>
                    <td>Lihat Laporan</td>
                </tr>
                <tr>
                    <td>Sharon Venicia</td>
                    <td>Lihat Laporan</td>
                </tr>
            </tbody>
        </table>

        

      </Sidebar>
      
  );
}
