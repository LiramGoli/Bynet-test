import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="text-container">
          <h1>Employee Manament System</h1>
        </div>
          <h2>Home Page from Liram Golibroda :)</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
