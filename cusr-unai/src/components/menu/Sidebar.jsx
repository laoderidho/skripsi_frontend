import React,{useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom';
import ConfigMenu from '../../data/ConfigMenu';
import { Accordion } from 'react-bootstrap';


export default function Sidebar(props){

    const [sidebar, setSidebar] = useState(false);
    const [dataMenu, setDataMenu] = useState([]);
    const location = useLocation();
    const currentPath = location.pathname;


    const adminRoute = currentPath.includes("/admin");

    useEffect(()=>{
        ChangeRoute(adminRoute);
      }, [adminRoute])

   const ChangeRoute = (path) => {
       if (path) {
         setDataMenu(ConfigMenu.map((item) => item).filter((item) => item.role === "admin"));
       } else {
         setDataMenu(ConfigMenu.map((item) => item).filter((item) => item.role === "perawat"));
       }
   };
   
   const iconStyle = {
    marginRight: "1rem",
   }

    const getClick = () => {
        setSidebar(!sidebar);
    }

    const componentChild = (item)=>{
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header> <i className={item.icon} style={iconStyle}></i> {item.name}</Accordion.Header>
              <Accordion.Body>
                {item.child.map((item, index) => (
                  <Link  to={item.path}>
                    <i className={item.icon} id="inner-accordion" style={iconStyle}></i>
                    {item.name}
                  </Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
    }


    return (
      <div>
        <nav className="navbar bg-white shadow-sm">
          <button
            className="btn sidebarbutton"
            id="sidebar"
            onClick={getClick}
            type="button"
            data-toggle="collapse"
            data-target
            style={{marginLeft: "1rem"}}
          >
            <svg
              width="25"
              viewBox="0 0 25 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="0.1698"
                width="25"
                height="4.13208"
                rx="2.06604"
                fill="#6e84b1"
              />
              <rect
                y="8.30188"
                width="25"
                height="4.13208"
                rx="2.06604"
                fill="#6e84b1"
              />
              <rect
                y="16.434"
                width="25"
                height="4.13208"
                rx="2.06604"
                fill="#6e84b1"
              />
            </svg>
          </button>
        </nav>

        {/* sidebar Menu */}
        <div className={`sidebar ${sidebar ? "" : "sidebar-false"}`}>
          {dataMenu.map((item, index) =>
            item.child ? (
              componentChild(item)
            ) : (
              <Link key={index} to={item.path} >
                {" "}
                <i className={item.icon} style={iconStyle}></i> {item.name}
              </Link>
            )
          )}
        </div>

        {/* Content */}
        <div className="content">{props.children}</div>
      </div>
    );
}