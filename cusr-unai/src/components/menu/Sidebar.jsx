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

    return (
        <div>
            {isMobile ? (
                <React.Fragment>
                    <nav className='navbar mobile-navbar'>
                        <button
                            className="btn back"
                            onClick={goBack}
                            type='button'
                            style={{ marginRight: '1rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width='28' height='28' viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4287f5" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <h6 className='mobile-title'>{title}</h6>
                        <button
                            className="btn sidebarbutton-mobile"
                            // id="sidebar"
                            onClick={toggleSidebar}
                            type="button"
                            style={{ marginLeft: "1rem"}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4287f5" className="w-6 h-6 mobile-sidebar">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </nav>
                    <nav className='navbar-shift'>
                        <div className='navbar-alert'>
                            <p className='navbar-span'>Saat ini anda sedang memasuki Shift {shift}</p>
                        </div>
                    </nav>

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
                </React.Fragment>
            )}


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
    </div>
    );
}
