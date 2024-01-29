import React, { useEffect, useState } from "react";
import axios from "axios";
import "./createModal.css";

const CreateModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [role, setRole] = useState("Employee");
  const [managers, setManagers] = useState([]);

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
      setManagers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };

  const roles = ["Employee", "Manager", "Senior_Management", "OS_Employee"];

  const handleCreate = async () => {
    if (!isNumeric(idNumber)) {
      alert("ID Number must contain only numbers.");
      return;
    }
    const paddedIdNumber = idNumber.padStart(9, "0");

    await handleCreateEmployee({ name, manager, idNumber: paddedIdNumber, role });
    setName("");
    setManager("");
    setIdNumber("");
    setRole("Employee");
  };

  const handleCreateEmployee = async (employeeData) => {
    try {
      await axios
        .post("http://localhost:5041/api/Employee/create", employeeData)
        .then(window.location.reload(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Create New Employee</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Manager:
          <select
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          ID Number:
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateModal;
