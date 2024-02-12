import React,{} from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Container, Row, Col } from "react-bootstrap";
import { Chart } from 'primereact/chart';

export default function DashboardPage() {


  return (
    <Sidebar>
      <Container>
        <Row>
          <Col>
            {/* <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" /> */}
          </Col>
        </Row>
      </Container>
    </Sidebar>
  
  );
}