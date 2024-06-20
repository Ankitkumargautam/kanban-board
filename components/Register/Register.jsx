import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Register.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ContextState } from '../../Context/ContextProvider';

const Register = ({ setShowLogin }) => {
  const router = useRouter();

  const { setUser } = ContextState();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values, 'ss');
    try {
      const { data } = await axios.post('/api/auth/register', values);
      toast(data?.message);
      console.log('data: ', data);
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      setUser(data.data);
      setSubmitting(false);
      router.push('/kanban');
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className={styles.register}>
      <h3 className={styles.registerHeading}>Register</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.registerField}>
              <label>Name</label>
              <Field type="text" name="name" placeholder="name" />
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
            <div className={styles.registerField}>
              <label>Email</label>
              <Field type="text" name="email" placeholder="email" />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
            <div className={styles.registerField}>
              <label>Password</label>
              <Field type="text" name="password" placeholder="password" />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMessage}
            />
            <button
              type="submit"
              className={styles.registerSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Click here to{' '}
        <span
          className={styles.registerLogin}
          onClick={() => {
            setShowLogin(false);
          }}
        >
          login
        </span>
      </p>
    </div>
  );
};

export default Register;
