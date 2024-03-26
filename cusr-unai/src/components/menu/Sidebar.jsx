import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ConfigMenu from '../../data/ConfigMenu';
import { Accordion } from 'react-bootstrap';

export default function Sidebar(props) {
    const [dataMenu, setDataMenu] = useState([]);
    const storedSidebarStatus = sessionStorage.getItem('sidebarStatus');
    const [sidebar, setSidebar] = useState(storedSidebarStatus ? JSON.parse(storedSidebarStatus) : false);
    const location = useLocation();
    const currentPath = location.pathname;
    const adminRoute = currentPath.includes("/admin");

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
                            <Link key={index} to={item.path}>
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
            <nav className="navbar bg-white shadow-sm">
                <button
                    className="btn sidebarbutton"
                    id="sidebar"
                    onClick={toggleSidebar}
                    type="button"
                    style={{ marginLeft: "1rem" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-6 h-6">
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
            <div className={`content ${sidebar ? "content-true" : ""}`}>{props.children}</div>
        </div>
    );
}
