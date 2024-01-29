import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import AddUserButton from "../../components/addUserButton/AddUserButton";
import CreateModal from "../../components/CreateModal/CreateModal";

const Managers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([{}]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:5041/api/Employee/managers",
        config
      );
      setIsLoading(false);
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = ["name", "idNumber", "role", "manager"];
  return (
    <div className="body-container">
      <Navbar />
      <div className="content-container">
        <div className="text-container">
          <h1>Employee Manament System</h1>
        </div>
        <div className="second-header">
          <h2>Managers list</h2>
          <AddUserButton onOpenModal={handleOpenCreateModal} />
        </div>
        {!isLoading && <Table columns={columns} data={employees}/>}
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Managers;
