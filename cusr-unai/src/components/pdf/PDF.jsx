import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Askep from './Askep';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

const PDF = () => {
    const printRef = React.useRef();

    const handleDownloadPdf = async () => {
        const elements = printRef.current.querySelectorAll('.askep-container');
        const promises = Array.from(elements).map(async (element) => {
            const canvas = await html2canvas(element);
            return canvas.toDataURL('image/png');
        });

        Promise.all(promises).then((imageDataArray) => {
            const pdf = new jsPDF();
            imageDataArray.forEach((data, index) => {
                const imgProperties = pdf.getImageProperties(data);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
                if (index !== 0) {
                    pdf.addPage();
                }
                pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
            });
            pdf.save('print.pdf');
        });
    };

    const { id, name } = useParams();
    const token = localStorage.getItem('token');

    const [pasien, setPasien] = useState([]);
    const [laporan, setLaporan] = useState([]);

    const getAskep = async () => {
        try {
            const res = await axios.post(`/perawat/laporan/askep/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPasien(res.data.pasien);
            setLaporan(res.data.pemeriksaan);
        } catch (error) {
            // handle error
        }
    };

    useEffect(() => {
        getAskep();
    }, []);

    return (
        <div>
            <div>
                <span>Download PDF Askep </span>
                <span>
                    <button type='button' onClick={handleDownloadPdf} className='btn blue-button-left-align'>Download</button>
                </span>
            </div>
            <div className='container mt-5'>
                <div className=''>
                    <div className=''>
                        <div className=''>
                            <div ref={printRef}>
                                {/* Looping through each laporan and rendering Askep component */}
                                {laporan.map((item, index) => (
                                    <div key={index} className='askep-container'>
                                        <Askep data={item} pasien={pasien} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDF;