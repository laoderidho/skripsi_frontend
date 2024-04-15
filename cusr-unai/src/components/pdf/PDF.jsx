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
        pdf.save('askep.pdf');
    };


    return (
        <div>
            <div className='container d-flex justify-content-center align-items-center'>
                <span>Download PDF Askep </span>
                <div className='px-2'>
                    <button type='button' onClick={handleDownloadPdf} className='btn blue-button-left-align'>Download</button>
                </div>
            </div>

            <div className='container'>
                <div className='book'>
                    <div className='page'>
                        <div className='subpage' ref={printRef}>
                            <div className='pdf-inner'>
                                <Askep />
                            </div>
                        </div>
                    </div>
                    <div className='page-break'></div>
                    {/* <div className='page'>
                        <div className='subpage' ref={printRef2}>
                            <div className='pdf-inner'>
                                <Askep />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>    
        </div>
    );
};

export default PDF;
