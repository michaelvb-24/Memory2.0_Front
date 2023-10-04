import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <AuthProvider>
        <Suspense>
          <Header />
          <Outlet />
          <Footer />
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
