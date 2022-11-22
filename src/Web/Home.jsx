import React, { useState } from 'react';
// import Sidebar from '../components/sidebar/Sidebar';
import Sidebar from './SideBar/SideBar';
import Hearder from './Header/Header';
import './style.css'

function Home() {
    const [open, setOpem] = useState(true)
    return (
        <>
            <Hearder />
            <Sidebar open={open} />
        </>
    )
}

export default Home
