import React, { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { signIN } from '../../../api/requests';
import style from "./index.module.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await signIN(values);
      console.log(values);

      if (response.success) {
        localStorage.setItem('token', response.token);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Admin signed in successfully!',
          showConfirmButton: false,
          timer: 1200,
        });
        navigate('/admin/dashboards');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div
      style={{
        height: '70vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div className={style.mb}>
            <Field
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              as={TextField}
              variant="outlined" 
            />
            <ErrorMessage name="email" component="div"  />
          </div>
          <div className={style.mb}>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              as={TextField}
              variant="outlined"
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <Button
            style={{ display: 'block', margin: '30px auto' }}
            type="submit"
            variant="contained"
            color="warning"
          >
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;  