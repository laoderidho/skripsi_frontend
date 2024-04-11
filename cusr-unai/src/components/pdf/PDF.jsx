import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Askep from './Askep';

const PDF = () => {
    const printRef = React.useRef();

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth(); // Corrected method name to getWidth()
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    };

    return (
        <div>
            <div>
                <span>Download PDF Askep </span>
                <span>
                    <button type='button' onClick={handleDownloadPdf} className='btn blue-button-left-align'>Download</button>
                </span>
            </div>

            <div className='container'>
                <div className='book'>
                    <div className='page'>
                        <div className='subpage'>
                            <div ref={printRef}>
                                <Askep />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default PDF;
