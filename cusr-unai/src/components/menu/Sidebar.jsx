import React from 'react'


export default function Sidebar(){
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid shadow-sm">
                    <button class="btn sidebarbutton" onClick="toggleSidebar()" type="button" data-toggle="collapse" data-target>
                        <svg width="25" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.1698" width="25" height="4.13208" rx="2.06604" fill="#1F1E5B"/>
                            <rect y="8.30188" width="25" height="4.13208" rx="2.06604" fill="#1F1E5B"/>
                            <rect y="16.434" width="25" height="4.13208" rx="2.06604" fill="#1F1E5B"/>
                        </svg>
                    </button>
                </div>
            </nav>  

            <div className="sidebar">
                <a href="#">Profile</a>
                <a href="#">Daftar Pasien</a>
                <a href="#">Laporan</a>
                <a href="#">Pemeriksaan Awal</a>
                <a href="#">Ganti Kata Sandi</a>
                <a href="#">Logout</a>
            </div>
        </div>  
    );
}