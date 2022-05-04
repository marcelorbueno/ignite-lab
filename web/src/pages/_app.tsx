import { UserProvider } from "@auth0/nextjs-auth0";
import { ToastProvider } from 'react-toast-notifications';
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
      <ToastProvider
      autoDismiss
      autoDismissTimeout={5000}
      >
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ToastProvider>
  );
}

export default MyApp;
