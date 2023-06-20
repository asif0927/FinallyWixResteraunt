import React, { useEffect, useState } from 'react';
import { getAllWorkTimes, editWorkTimesByID } from '../../../api/worktimerequest';
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

const Index = () => {
    const [times, setTimes] = useState([]);
    const [editingTimes, setEditingTimes] = useState(null);
    const [starttime, setStarttime] = useState('');
    const [finishtime, setFinishTime] = useState('');
    const [ weekendstarttime, setWeekendstarttime] = useState('');
    const [ weekendfinishtime, setWekendfinishtime] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
      fetchTimes();
    }, []);
  
    const fetchTimes = async () => {
      try {
        const timesData = await getAllWorkTimes();
        setTimes(timesData);
      } catch (error) {
        console.error('Failed to retrieve times:', error);
      }
    };
  
    const handleEditClick = (times) => {
      setEditingTimes(times);
      setStarttime(times.starttime);
      setFinishTime(times.finishtime);
      setWeekendstarttime(times.weekendfinishtime);
      setWekendfinishtime(times.weekendfinishtime);
      setModalOpen(true);
    };
  
    const handleCancelClick = () => {
      setEditingTimes(null);
      setStarttime('');
      setFinishTime('');
      setWeekendstarttime('');
      setWekendfinishtime('');
      setModalOpen(false);
    };
  
    const handleUpdateClick = async (e) => {
      e.preventDefault();
  
      try {
        console.log('Updated Data:', {
          starttime,
          finishtime,
          weekendstarttime,
          weekendfinishtime,
        });
  
        const updatedData = {
            starttime,
            finishtime,
            weekendstarttime,
            weekendfinishtime,
        };
  
        await editWorkTimesByID(editingTimes._id, updatedData);
        toast.success('Time updated successfully');
  
        const updatedTimes = times.map((times) => {
          if (times._id === editingTimes._id) {
            return {
              ...times,
              ...updatedData,
            };
          }
          return times;
        });
        setTimes(updatedTimes);
  
        handleCancelClick();
      } catch (error) {
        console.error('Failed to update time:', error);
        toast.error('Failed to update time');
      }
    };
  return (
    <>
    <div style={{ marginLeft: "220px" }}>
      <div style={{ width: "60%", margin: "30px auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Starttime</TableCell>
                <TableCell>FinishTime</TableCell>
                <TableCell>WeekendStartTime</TableCell>
                <TableCell>WeekendFinishTime</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((time) => (
                <TableRow key={time._id}>
                  <TableCell>{time.starttime}</TableCell>
                  <TableCell>{time.finishtime}</TableCell>
                  <TableCell>{time.weekendstarttime}</TableCell>
                  <TableCell>{time.weekendfinishtime}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleEditClick(time)}>
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
                Edit Time
              </Typography>
              <form onSubmit={handleUpdateClick} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                <TextField
                  label="StartTime"
                  value={starttime}
                  onChange={(e) => setStarttime(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="FinishTime"
                  value={finishtime}
                  onChange={(e) => setFinishTime(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="WeekendStartTime"
                  value={weekendstarttime}
                  onChange={(e) => setWeekendstarttime(e.target.value)}
                  required
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  label="WeekendFinishTime"
                  value={weekendfinishtime}
                  onChange={(e) => setWekendfinishtime(e.target.value)}
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
    </>
  )
}

export default Index
