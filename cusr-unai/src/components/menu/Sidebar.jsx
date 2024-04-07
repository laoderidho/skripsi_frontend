import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ConfigMenu from '../../data/ConfigMenu';
import { Accordion, Col, Row } from 'react-bootstrap';
import axios from '../../../src/axios';

export default function Sidebar(props) {
    const { title, children } = props;

    const [dataMenu, setDataMenu] = useState([]);
    const storedSidebarStatus = sessionStorage.getItem('sidebarStatus');
    const [sidebar, setSidebar] = useState(storedSidebarStatus ? JSON.parse(storedSidebarStatus) : false);
    const location = useLocation();
    const currentPath = location.pathname;
    const adminRoute = currentPath.includes("/admin");
    const isMobile = window.innerWidth <= 600;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // const [shift, setShift] = useState('');

    const shift = sessionStorage.getItem('shift')
    

    const getShift = async () => {
        try {
            const res = await axios.post(`/perawat/shift`, {
                headers: { Authorization : `Bearer ${token}`}
            });
            if(res.data !== shift || shift === null){
                sessionStorage.setItem('shift', res.data)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getShift()
    },[])

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        ChangeRoute(adminRoute);
    }, [adminRoute]);

    const ChangeRoute = (path) => {
        if (path) {
            setDataMenu(ConfigMenu.map((item) => item).filter((item) => item.role === "admin"));
        } else {
            setDataMenu(ConfigMenu.map((item) => item).filter((item) => item.role === "perawat"));
            setSidebar(false);
            sessionStorage.setItem('sidebarStatus', JSON.stringify(false));
        }
    };

    const toggleSidebar = () => {
        const newSidebarState = !sidebar;
        setSidebar(newSidebarState);
        sessionStorage.setItem('sidebarStatus', JSON.stringify(newSidebarState));
    };

    const iconStyle = {
        marginRight: "1rem"
    };

    const componentChild = (item) => {
        return (
            <Accordion defaultActiveKey="0">
                <Accordion.Item>
                    <Accordion.Header><i className={item.icon} style={iconStyle}></i> {item.name}</Accordion.Header>
                    <Accordion.Body>
                        {item.child.map((item, index) => (
                            <Link key={index} to={item.path}
                            className={item.path === location.pathname ? "active" : ""}
                                >
                                <i className={item.icon} id="inner-accordion" style={iconStyle}></i>
                                {item.name}
                            </Link>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    };

    const isProfilePath = ['/perawat/profile', '/perawat/pemeriksaan-awal', '/perawat/daftarpasien', '/perawat/laporan'].includes(location.pathname);

    

    return (
        <div>
            {isMobile ? (
                <React.Fragment>

                    <div className='header-navbar-mobile'>
                    {isProfilePath ? (
                            <React.Fragment>
                                <button
                                className="btn back-disabled"
                                onClick={goBack}
                                type='button'
                                style={{marginRight: '1rem' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='28' height='28' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                <h6 className='mobile-title-home'>{title}</h6>

                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <button
                                className="btn back"
                                onClick={goBack}
                                type='button'
                                style={{ marginRight: '1rem' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='28' height='28' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                <h6 className='mobile-title'>{title}</h6>
                            </React.Fragment>
                        )}
                        
                    </div>
                    
                    <div className='navbar-shift px-1'>
                        <div className='navbar-alert'>
                            <p className='navbar-span'>Saat ini anda sedang memasuki Shift {shift}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='content content-mobile'>{children}</div>

                    <nav className='navbar-bottom mobile-navbar'>

                        <div className={`navbar-child ${currentPath === "/perawat/profile" ? "link-active" : ""}`}>
                            <Link  className={`navbar-link ${currentPath === "/perawat/profile" ? "link-active-text" : ""}`} to={`/perawat/profile`}>
                                <Row>
                                    <Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                                        </svg>
                                        <p className='navbar-mobile-text'>Home</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                        <div className={`navbar-child ${currentPath === "/perawat/pemeriksaan-awal" ? "link-active" : ""}`}>
                            <Link className={`navbar-link ${currentPath === "/perawat/pemeriksaan-awal" ? "link-active-text" : ""}`} to={`/perawat/pemeriksaan-awal`}>
                                <Row>
                                    <Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clip-rule="evenodd" />
                                        </svg>
                                        <p className='navbar-mobile-text'>Diagnostik</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                        <div className={`navbar-child ${currentPath === "/perawat/daftarpasien" ? "link-active" : ""}`}>
                            <Link className={`navbar-link ${currentPath === "/perawat/daftarpasien" ? "link-active-text" : ""}`} to={`/perawat/daftarpasien`}>
                                <Row>
                                    <Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='28' height='30' viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clip-rule="evenodd" />
                                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                                        </svg>
                                        <p className='navbar-mobile-text'>Askep</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                        <div className={`navbar-child ${currentPath === "/perawat/laporan" ? "link-active" : ""}`}>
                            <Link className={`navbar-link ${currentPath === "/perawat/laporan" ? "link-active-text" : ""}`} to={`/perawat/laporan`}>
                                <Row>
                                    <Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clip-rule="evenodd" />
                                            <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
                                        </svg>
                                        <p className='navbar-mobile-text'>Laporan</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                        <div className={`navbar-child ${currentPath === "/login" ? "link-active" : ""}`}>
                            <Link className={`navbar-link ${currentPath === "/login" ? "link-active-text" : ""}`} to={`/login`}>
                                <Row>
                                    <Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width='30' height='30' viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
                                        </svg>
                                        <p className='navbar-mobile-text'>Logout</p>
                                    </Col>
                                </Row>
                            </Link>
                        </div>
                        {/* <button
                            className="btn back"
                            onClick={goBack}
                            type='button'
                            style={{ marginRight: '1rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='28' height='28' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4287f5" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button> */}
                        {/* <button
                            className="btn sidebarbutton-mobile"
                            // id="sidebar"
                            onClick={toggleSidebar}
                            type="button"
                            style={{ marginLeft: "1rem"}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4287f5" className="w-6 h-6 mobile-sidebar">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button> */}
                    </nav>
                    {/* <nav className='navbar-shift'>
                        <div className='navbar-alert'>
                            <p className='navbar-span'>Saat ini anda sedang memasuki Shift {shift}</p>
                        </div>
                    </nav> */}

                    <div className={` sidebar ${sidebar ? (!adminRoute ? "sidebar_full" : "sidebar_small") : "sidebar-false"}`}>
                        {dataMenu.map((item, index) =>
                            item.child ? (
                                 componentChild(item)
                          ) : (
                          <Link key={index} to={item.path}>
                             {" "}
                           <i className={item.icon} style={iconStyle}></i> {item.name}
                           </Link>
                           )
                        )}
                    </div>

                </React.Fragment>
            ) : (
                <React.Fragment> 
                    <nav className="navbar bg-white shadow-sm">
                        <button
                            className="btn sidebarbutton"
                            id="sidebar"
                            onClick={toggleSidebar}
                            type="button"
                            style={{ marginLeft: "1rem" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-6 h-6 mobile-sidebar">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </nav>

                                {/* sidebar Menu */}
                    <div className={` sidebar ${sidebar ? (!adminRoute ? "sidebar_full" : "sidebar_small") : "sidebar-false"}`}>
                        {dataMenu.map((item, index) =>
                            item.child ? (
                                componentChild(item)
                            ) : (
                                <Link key={index} to={item.path}>
                                    {" "}
                                    <i className={item.icon} style={iconStyle}></i> {item.name}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Content */}
                    <div className={`content ${sidebar ? "content-true" : ""}`}>{children}</div>
                </React.Fragment>

                
            )}


        
    </div>
    );
}
