import React, {useRef} from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Askep from './Askep';

const PDF = () => {
    const printRef1 = useRef();
    const printRef2 = useRef();

    const handleDownloadPdf = async () => {
        const element1 = printRef1.current;
        const element2 = printRef2.current;

        
        // Generate canvas for first part of content
        const canvas1 = await html2canvas(element1);
        const data1 = canvas1.toDataURL('image/png');

        // Generate canvas for second part of content
        const canvas2 = await html2canvas(element2);
        const data2 = canvas2.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'potrait',
            unit: 'pt',
            format: 'a4'
        })
        // Add first part of content to first page
        pdf.addImage(data1, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());


        const element2Height = element2.offsetHeight;
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        if (element2Height > pageHeight) {
            // Generate canvas for second part of content
            const canvas2 = await html2canvas(element2);
            const data2 = canvas2.toDataURL('image/png');

            // Add new page
            pdf.addPage();

            // Add second part of content to second page
            pdf.addImage(data2, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pageHeight);
        }
    };

    return (
        <div>
            <div className='container'>
                <span>Download PDF Askep </span>
                <di>
                    <button type='button' onClick={handleDownloadPdf} className='btn blue-button-left-align'>Download</button>
                </di>
            </div>

            <div className='container'>
                <div className='book'>
                    <div className='page'>
                        <div className='subpage' ref={printRef1}>
                            <div className='pdf-inner'>
                                <Askep />
                            </div>
                        </div>
                    </div>
                    <div className='page-break'></div>
                    <div className='page'>
                        <div className='subpage' ref={printRef2}>
                            <div className='pdf-inner'>
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
