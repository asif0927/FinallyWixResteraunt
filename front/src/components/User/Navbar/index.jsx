import React, { useState, useEffect } from 'react';
import {AppBar,Toolbar,Typography,IconButton,Drawer,List,ListItem,ListItemText,Divider,} from '@mui/material';
import { getAllLogos } from '../../../api/logorequest';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import style from './index.module.css';

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const photosData = await getAllLogos();
      setPhotos(photosData);
    } catch (error) {
      console.error('Failed to retrieve gallerys:', error);
    }
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 890) {
      setIsDrawerOpen(false);
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
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
          {photos.map((photo) => (
            <img className={style.img} key={photo.id} src={photo.image}/>
          ))}
        </Typography>
        <div
          style={{
            width: '80%',
            margin: '0 auto',
            display: windowWidth <= 901 ? 'none' : 'inline',
          }}
        >
          <Toolbar>
            <div>
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
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}  PaperProps={{ style: { width: '100%' } }}>
          <div  style={{ backgroundColor: 'rgb(174, 154, 100)', height: '100%'}}>
            <IconButton  onClick={closeDrawer} style={{color:'white'}}>
              <CloseIcon />
            </IconButton>
          </div>
          <List  onClick={handleLinkClick} style={{ backgroundColor: 'rgb(174, 154, 100)', height: '100%' }}>
            <ListItem className={style.link2} component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem className={style.link2} component={Link} to="/ourplace">
              <ListItemText primary="Our Places" />
            </ListItem>
            <ListItem className={style.link2} component={Link} to="/menu">
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem className={style.link2} component={Link} to="/gallery">
              <ListItemText primary="Gallery" />
            </ListItem>
            <ListItem className={style.link2} component={Link} to="/reservations">
              <ListItemText primary="Reservations" />
            </ListItem>
            <ListItem className={style.link2} component={Link} to="/contact">
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