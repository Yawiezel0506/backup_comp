import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { divChilde, divFather } from "../style/layout";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={divFather}>
        <div style={divChilde}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
