import React, {useState,useEffect} from 'react';
import Sidebar from "../../../../components/menu/SidebarAdmin";

export default function LoadingSKI() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [])
    return (
        <Sidebar>
            

        </Sidebar>

    )
}