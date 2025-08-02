import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* add top padding so content isn't hidden behind navbar */}
        <Component {...pageProps} />
      </main>
    </>
  );
}