import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid } from '@mui/material';

function Header() {
  return (
    <Box sx={{ margin: 0,boxShadow:"0 1px 5px rgb(0 0 0 / 30%)" }}>
      {/* <Box sx={{ background: '#0073a5', paddingInlineEnd: 2 }}>
        <Grid >
          <Box sx={{ display: 'flex', height: 50, alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
            <NotificationsIcon className='icon' />
            <span style={{ color: "#FFFFFF" }}>Pham Huyen Duc</span>
            <AccountCircleIcon className='icon2' />
            <ArrowDropDownIcon className='icon' />
          </Box>
        </Grid>
      </Box> */}

      <Box sx={{ flexGrow: 1, background: '#3171b9', padding: 2 }}>
        <Grid container spacing={2} margin="0" padding={0} >
          <Grid item xs={8} padding={0} >
            <Box sx={{ display: "flex" }}>
              <Grid item xs={2} padding="0">
                <img className='logo' src='	http://elearning.vinhuni.edu.vn/pluginfile.php/1/theme_klass/logo/1654566780/logo.png' />
              </Grid>
              <Grid item xs={10} className="Text">
                <h2 >Hệ thống Quản lí đề tài </h2>
                <h3 >Trường Đại học Vinh </h3>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <div className='SearchTasks'>
              <SearchIcon className='icon' />
              <input
                placeholder='Search by task name'
                type="text"
                // onChange={(e) => setSearch(e.target.value.trim())}
              />
            </div>
          </Grid>
        </Grid>


      </Box>
    </Box>
  )
}

export default Header
