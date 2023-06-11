import React, { useState, useEffect } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemText,Divider,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import style from './index.module.css';

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 890) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'rgb(174, 154, 100)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img className={style.img} src="data:image/png;base64,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" alt="logo" />
        </Typography>
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            display: windowWidth <= 901 ? 'none' : 'inline', 
          }}
        >
          <Toolbar >
            <div className={style.desktopLinks}>
              <Link to="/" className={style.link} onClick={handleLinkClick}>
                Home
              </Link>
              <Link to="/ourplace" className={style.link} onClick={handleLinkClick}>
                Our Places
              </Link>
              <Link to="/menu" className={style.link} onClick={handleLinkClick}>
                Menu
              </Link>
              <Link to="/gallery" className={style.link} onClick={handleLinkClick}>
                Gallery
              </Link>
              <Link to="/reservations" className={style.link} onClick={handleLinkClick}>
                Reservations
              </Link>
              <Link to="/contact" className={style.link} onClick={handleLinkClick}>
                Contact
              </Link>
            </div>
          </Toolbar>
        </div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          style={{
            display: windowWidth >= 901 ? 'none' : 'inline', 
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)} style={{width:"100%"}}>
          <List className={style.mobileLinks} onClick={handleLinkClick} style={{ backgroundColor: 'rgb(174, 154, 100)',height:"100%"}}>
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem  component={Link} to="/ourplace">
              <ListItemText primary="Our Places" />
            </ListItem>
            <ListItem  component={Link} to="/menu">
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem  component={Link} to="/gallery">
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem  component={Link} to="/reservations">
              <ListItemText primary="Reservations" />
            </ListItem>
            <ListItem  component={Link} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
