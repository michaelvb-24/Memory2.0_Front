import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
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
