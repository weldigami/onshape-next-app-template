import { SessionProvider } from "next-auth/react"; // Provides authentication session context
import { ToastContainer } from "react-toastify"; // Displays toast notifications for user feedback
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css"; 

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // Provides session context to all pages and components
    <SessionProvider session={session}>
      {/* Toast notifications container for displaying messages */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
      {/* Render the current page component with its props */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
