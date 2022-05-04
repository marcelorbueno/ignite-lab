import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from 'react-hot-toast';
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />
    </UserProvider>
  );
}

export default MyApp;
