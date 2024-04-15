import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/Sidebar';
import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../axios'
import { Chart } from 'primereact/chart';
import { Skeleton } from 'primereact/skeleton';

export default function DashboardPage() {
  const [Perawat, setPerawat] = useState();
  const [Pasien, setPasien] = useState();

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [rawatSakit, setRawatSakit] = useState();
  const [rawatSembuh, setRawatSembuh] = useState();


  const getChartStatistic =  async () => {
    const res = await axios.post('/admin/statistic',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setPerawat(res.data.perawat)
    setPasien(res.data.pasien)
    setRawatSakit(res.data.perawatan_sakit)
    setRawatSembuh(res.data.perawatan_sembuh)


  }

  useEffect(() => {
    getChartStatistic();
  }, []);

  useEffect(() => {
    getChart();
  }, [rawatSakit, rawatSembuh]);


  const getChart = () =>{
    const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Perawatan Sembuh: ' + rawatSembuh, 'Perawatan Sakit: ' + rawatSakit],
            datasets: [
                {
                    data: [rawatSembuh, rawatSakit],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'), 
                        documentStyle.getPropertyValue('--red-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'), 
                        documentStyle.getPropertyValue('--red-400'), 
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
  }

  return (
    <Sidebar>
        <div className="container">
        <h2>Dashboard</h2>
        <Breadcrumb>
          <Breadcrumb.Item active href="/admin/Dashboard">
            Admin
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Container>
        <Row>
          <Col>
            <Card className='card-perawat'>
              <Card.Body className="d-flex flex-column align-items-center">
                <i className="fa-solid fa-user-nurse fa-3x pb-1"></i>
                <h2 className=''>Perawat</h2>
                <h2>{Perawat && Perawat}</h2>
                <Link to="/admin/user" className="btn white-button w-100 m-0">Lihat <i class="fa-solid fa-arrow-right"></i></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className='card-pasien'>
              <Card.Body className="d-flex flex-column align-items-center">
                <i className="fa-solid fa-user fa-3x pb-1"></i>
                <h2 className=''>Pasien</h2>
                <h2>{Pasien && Pasien}</h2>
                <Link to="/admin/daftarpasien" className="btn blue-button w-100 m-0">Lihat <i class="fa-solid fa-arrow-right"></i></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
         <div className="card flex justify-content-center mt-5">
           {getChartStatistic && <Chart type="doughnut" data={chartData} options={chartOptions} className="w-50 md:w-30rem p-5" />}
           
        </div>
      </Container>
    </Sidebar>
  );
}
