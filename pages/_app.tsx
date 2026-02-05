import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isScreenRecordPage = router.pathname === "/screen-record";

  return (
    <>
      {!isScreenRecordPage && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default function App(props: AppProps) {
  return <AppContent {...props} />;
}
