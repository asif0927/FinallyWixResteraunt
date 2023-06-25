import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageIcon from '@mui/icons-material/Image';
import WatchIcon from '@mui/icons-material/Watch';
import TagIcon from '@mui/icons-material/Tag';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import PersonIcon from '@mui/icons-material/Person';
const Sidebar = styled(Drawer)(({ theme }) => ({
  width: '25%', 
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '25%', 
    boxSizing: 'border-box',
    backgroundColor: '#009688', 
    color: '#fff', 
    position:'fixed'
  },
  '@media (max-width: 700px)': {
    width: '160px', 
    '& .MuiDrawer-paper': {
      width: '160px', 
    },
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
}));

const AdminSidebar = () => {
  const location = useLocation();

  const adminPages = [
    { title: 'Sliders', path: '/admin/sliders', icon: <InboxIcon /> },
    { title: 'Dashboard', path: '/admin/dashboards', icon: <DashboardIcon /> },
    { title: 'Adress and Telephone', path: '/admin/adress', icon: <LocationOnIcon /> },
    {title:'GalleryCrud',path:'/admin/gallerycrud',icon:<ImageIcon/>},
    {title:'Worktime',path:'/admin/worktime',icon:<WatchIcon/>},
    {title:'ServiceCrud',path:'/admin/servicecrud',icon:<MiscellaneousServicesIcon/>},
    {title:'SocialMedia',path:'/admin/socailmedia',icon:<TagIcon/>},
    {title:'Subscribers',path:'/admin/subscribers',icon:<PersonIcon/>},
    {title:'Reservation',path:'/admin/reservations',icon:<AddAlarmIcon/>}
  ];

  return (
    <>
    <Sidebar variant="permanent">
      <List>
        {adminPages.map((page) => (
          <ListItem
            key={page.title}
            button
            component={NavLink}
            to={page.path}
            selected={location.pathname === page.path}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
    </Sidebar>
   
  </>
  );
};

export default AdminSidebar;

