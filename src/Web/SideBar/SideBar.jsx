import React, { useState } from 'react'

import '../SideBar/Sidebar.css'
import { Link } from 'react-router-dom';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import HomeIcon from '@mui/icons-material/Home';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import FactCheckIcon from '@mui/icons-material/FactCheck';
const Sidebar = ({ open }) => {

    return (
        <div className={open ? 'Active' : 'SideBar'}>
            <div className='Top'>
                <div className='Avatar' >
                    <img src="https://www.w3schools.com/bootstrap/img_avatar1.png" alt="" />
                </div>
                <div className='name'>
                    <p>Đức Phạm Huyền</p>
                    <p>duc.phamhuyen@ncc.asia</p>
                </div>
            </div>

            <div className='Menu'>
                <div className='List'>
                    <li>
                        <Link to="#" style={{ textDecoration: "none" }}>
                            <HomeIcon className='icon' />
                            <span>Accueil </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" style={{ textDecoration: "none" }}>
                            <AccessAlarmIcon className='icon' />

                            <span>My TimeSheet </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="app/Task" style={{ textDecoration: "none" }}>
                            <ImportContactsIcon className='icon' />

                            <span>Tasks</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="app/Project" style={{ textDecoration: "none" }}>
                            <FactCheckIcon className='icon' />

                            <span>Projects</span>
                        </Link>
                    </li>
                </div>
            </div>

            <div className='Footer'>
                <div className='copyright'>
                    © 2022
                    <a href='#'>Đại học vinh</a>
                </div>
                <div className='version'>
                    <b>Version </b>
                    4.3.0.0 [20220509]
                </div>
            </div>
        </div>
    )
}

export default Sidebar