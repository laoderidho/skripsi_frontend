import React from "react";
import { Link } from "react-router-dom";




export const Keterangan = {
    getData(listAskep) {
        const data = [];
        listAskep.forEach(askep => {
            askep.jam_pemberian_diagnosa && data.push({
                nama_keterangan: 'Diagnosa',
                tanggal: `${askep.tanggal}/${askep.jam_pemberian_diagnosa}`
            });
            data.push({
                nama_keterangan:  'Intervensi',
                tanggal: askep.jam_pemberian_intervensi ? `${askep.tanggal}/${askep.jam_pemberian_intervensi}` : (
                    <Link
                        to={`/perawat/askep/form-intervensi/${askep.id}`}
                        className="btn btn-primary btn-large">Tambah</Link>
                )
            });
            data.push({
                nama_keterangan: 'Implementasi',
                tanggal: askep.jam_pemberian_implementasi ? `${askep.tanggal}/${askep.jam_pemberian_implementasi}` : `-`
            })
            data.push({
                nama_keterangan: 'Luaran',
                tanggal: askep.jam_penilaian_luaran ? `${askep.tanggal}/${askep.jam_pemberian_implementasi}` : (
                    <Link
                        tp={`/perawat/askep/form-evaluasi/${askep.id}`}
                        className="btn btn-primary btn-large">Tambah</Link>
                )
            })
            data.push({
                nama_keterangan: 'Evaluasi',
                tanggal: askep.jam_pemberian_evaluasi ? `${askep.tanggal}/${askep.jam_pemberian_evaluasi}` : '-'
            })
        });
        return data;
    }
}