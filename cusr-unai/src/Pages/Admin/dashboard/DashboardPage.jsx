import React,{} from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Askep from '../../../components/pdf/Askep';


export default function DashboardPage() {
  return (
    <Sidebar>
      <Container>
        <Row>
          <Col>
            <Link to="/pdf" className="btn btn-primary">Data Pasien</Link>
          </Col>
          <Col>
            <PDFDownloadLink document={<Askep />} fileName="Askep.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
}