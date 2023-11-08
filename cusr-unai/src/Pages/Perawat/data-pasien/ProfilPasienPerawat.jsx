import React, {useState} from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table } from "react-bootstrap";
import "../../../../src/style/autocomplete.css";
export default function ProfilPasienPerawat() {

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
            <h3>Profil Pasien</h3>
            </div>

            <p></p>
        </div>

        {/* Button */}

        <div className="cutom-button" >
            Lihat Pencatatan
        </div>
        

      </Sidebar>
      
  );
}