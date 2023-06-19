import React, { useEffect, useState } from 'react';
import { getAllAddresses, editAdressByID } from '../../../api/adressrequest';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Backdrop, Typography } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onEnter,
    onExited,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const AdressandTelephone = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [iframeSrc,setIframeSrc]=useState('');
  const [telephone, setTelephone] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const addressesData = await getAllAddresses();
      setAddresses(addressesData);
    } catch (error) {
      console.error('Failed to retrieve addresses:', error);
    }
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zipCode);
    setTelephone(address.telephone);
    setIframeSrc(address.iframeSrc);
    setModalOpen(true);
  };

  const handleCancelClick = () => {
    setEditingAddress(null);
    setIframeSrc('');
    setStreet('');
    setCity('');
    setState('');
    setZipCode('');
    setTelephone('');
    setModalOpen(false);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      console.log('Updated Data:', {
        street,
        city,
        state,
        zipCode,
        telephone,
        iframeSrc,
      });

      const updatedData = {
        street,
        city,
        state,
        zipCode,
        telephone,
        iframeSrc,
      };

      await editAdressByID(editingAddress._id, updatedData);
      toast.success('Address updated successfully');

      const updatedAddresses = addresses.map((address) => {
        if (address._id === editingAddress._id) {
          return {
            ...address,
            ...updatedData,
          };
        }
        return address;
      });
      setAddresses(updatedAddresses);

      handleCancelClick();
    } catch (error) {
      console.error('Failed to update address:', error);
      toast.error('Failed to update address');
    }
  };

  return (
    <div style={{ marginLeft: "220px" }}>
      <div style={{ width: "60%", margin: "30px auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Street</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip Code</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Iframe</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addresses.map((address) => (
                <TableRow key={address._id}>
                  <TableCell>{address.street}</TableCell>
                  <TableCell>{address.city}</TableCell>
                  <TableCell>{address.state}</TableCell>
                  <TableCell>{address.zipCode}</TableCell>
                  <TableCell>{address.telephone}</TableCell>
                  <TableCell>{address.iframeSrc}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEditClick(address)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={modalOpen}
          onClose={handleCancelClick}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Edit Address
              </Typography>
              <form onSubmit={handleUpdateClick} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                <TextField
                  label="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="Telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="IframeSrc"
                  value={iframeSrc}
                  onChange={(e) => setIframeSrc(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="contained" onClick={handleCancelClick} style={{ marginRight: '10px' }}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" color="primary">
                    Update
                  </Button>
                </div>
              </form>
            </Paper>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default AdressandTelephone;   