import React from 'react';
import axios from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.css';

import { ContextState } from '../../Context/ContextProvider';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Login = ({ setShowLogin }) => {
  const { setUser } = ContextState();

  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('/api/auth/login', values);
      // alert(data?.message);
      toast(data?.message);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      setUser(data.data);
      setSubmitting(false);
      router.push('/kanban');
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className={styles.login}>
      <h3 className={styles.loginHeading}>Login</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.loginField}>
              <label>Email</label>
              <Field type="text" name="email" placeholder="email" />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
            <div className={styles.loginField}>
              <label>Password</label>
              <Field type="text" name="password" placeholder="password" />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className={styles.loginSubmit}
            >
              {isSubmitting ? 'Login...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      <p>
        Click here to{' '}
        <span
          className={styles.loginRegister}
          onClick={() => {
            setShowLogin(true);
          }}
        >
          register
        </span>
      </p>
    </div>
  );
};

export default Login;
