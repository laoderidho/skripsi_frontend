import React from "react";
import { Link } from "react-router-dom";




export const Keterangan = {
    getData(id) {
        return [
            {
                nama_keterangan: 'Diagnosa',
                form: (
                        <Link to={`/perawat/askep/form-diagnosa/${id}`} className="btn d-flex justify-content-center align-items-center option-button-svg mt-1'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='svg-askep'>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link> 
                    )
                
            },
            {
                nama_keterangan: 'Intervensi'
            },
            {
                nama_keterangan: 'Implementasi'
            },
            {
                nama_keterangan: 'Evaluasi'
            }
        ]
    }
}