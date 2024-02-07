import React, {useEffect, useState} from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import axios from '../../../axios'
import { Form } from 'react-bootstrap';
import { Dropdown }  from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/saga-blue/theme.css";
import ConfirmModal from '../../../components/menu/ConfirmModal';

export default function FormEvaluasi() {

    const [evaluasi, setEvaluasi] = useState([]);


    return (
        <Sidebar>

        </Sidebar>
    )
}