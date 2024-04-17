import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/menu/SidebarAdmin';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from '../../../axios'
import { Chart } from 'primereact/chart';
import { Skeleton } from 'primereact/skeleton';
import { BreadCrumb } from 'primereact/breadcrumb';

export default function DashboardPage() {
  const [Perawat, setPerawat] = useState();
  const [Pasien, setPasien] = useState();

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [rawatSakit, setRawatSakit] = useState();
  const [rawatSembuh, setRawatSembuh] = useState();



  const isMobile = window.innerWidth <=600;


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

  const items = [{label: 'Admin'}, {label: ''}]

  return (
    <React.Fragment>
      {isMobile ? (
        <>
          <Sidebar>
              <div className="container d-flex align-items-center form-margin container-breadcrumb">
                  <span>
                    <Link to={`/admin/dashboard`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                    </Link>
                  </span>
                  <BreadCrumb model={items} />

                  <span>
                    <p className='title-breadcrumb'>Dashboard</p>
                  </span>
              </div>

              <div className="container">
                <h3>Dashboard</h3>
              </div>
            <Container className='pt-3'>
              <Row>
                <Col xs={12}>
                  <Card className='card-perawat'>
                    <Card.Body className="d-flex justify- align-items-center">
                        <i className="fa-solid fa-user-nurse fa-2x"></i>
                        {/* <p className='p-dashboard'>Perawat: {Perawat && Perawat}</p> */}
                        <div className='w-100 d-flex justify-content-end'>
                          <Link to="/admin/user" className="btn dashboard-button m-0">Lihat <i style={{color:'#085b93'}} class="fa-solid fa-arrow-right"></i></Link>
                        </div>
                    </Card.Body>
                  </Card>
                  <Card className='card-pasien mt-2'>
                    <Card.Body className="d-flex justify-content-center align-items-center">
                      <i className="fa-solid fa-user fa-2x"></i>
                      {/* <h2 className=''>Pasien</h2> */}
                      {/* <h2>{Pasien && Pasien}</h2> */}
                      <div className='w-100 d-flex justify-content-end'>
                        <Link to="/admin/daftarpasien" className="btn dashboard-button m-0">Lihat <i style={{color:'#085b93'}} class="fa-solid fa-arrow-right"></i></Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  
                </Col>
              </Row>
              <div className="flex justify-content-center mt-5">
                {getChartStatistic && <Chart type="doughnut" data={chartData} options={chartOptions} className="w-100 md:w-30rem p-3" />}
                
              </div>
            </Container>
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar>
            <div className="container d-flex align-items-center container-breadcrumb">
                    <span>
                      <Link to={`/admin/dashboard`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width='17' height='17' fill='#fff' viewBox="0 0 24 24" stroke-width="1.5" stroke="#085b93" class="w-6 h-6 mb-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                      </Link>
                    </span>
                    <BreadCrumb model={items} />

                    <span>
                      <p className='title-breadcrumb'>Dashboard</p>
                    </span>
          </div>

          <div className="container">
                <h3>Dashboard</h3>
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
        </>
      )}
    </React.Fragment>
  );
}
