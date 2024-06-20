import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextProvider from '../Context/ContextProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
