import React from "react";
import Sidebar from "../../../components/menu/Sidebar";
import { Form, Button, Table } from "react-bootstrap";

export default function DaftarPasien() {
  return (
      <Sidebar>
        {/* Title */}
        <div className="d-flex justify-content-between">
            <div>
          si
            </div>

            <div>
            <h3>Daftar Pasien</h3>
            </div>

            <p></p>
        </div>

        {/* Search */}

        <Form className="container">
            <Form.Control
            id="tableSearch"
            type="text"
            placeholder="Search"
            ></Form.Control>

            <Table
            className="table table-bordered table-striped custom-table"
            id="tableLayout"
            >
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
            </Table>
        </Form>
      </Sidebar>
      
  );
}
