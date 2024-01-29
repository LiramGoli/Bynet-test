import React, { useEffect, useState } from "react";
import axios from "axios";

const EditModal = ({ isOpen, onClose, employee }) => {
    
    const [name, setName] = useState(employee.name);
    const [manager, setManager] = useState("");
    const [idNumber, setIdNumber] = useState(employee.idNumber);
    const [role, setRole] = useState(employee.role);
    const [managers, setManagers] = useState([]);
    const roles = ["Employee", "Manager", "Senior_Management", "OS_Employee"];

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
      //manager can't place himself as his own manager
      const filteredManagers = res.data.filter(manager => manager.id !== employee.id);
      setManagers(filteredManagers);
    } catch (error) {
      console.log(error);
    }
  };
  
  const isNumeric = (str) => {
    return /^\d+$/.test(str);
  };


  const handleEdit = async() => {
    if (!isNumeric(idNumber)) {
      alert("ID Number must contain only numbers.");
      return;
    }
    const paddedIdNumber = idNumber.padStart(9, "0");

    await updateEmployee({ name, manager, idNumber: paddedIdNumber, role });
    setName("");
    setManager("");
    setIdNumber("");
    setRole("Employee");
    onClose();
  };

  const updateEmployee = async (employeeData)=>{
    try {
        console.log(employeeData)
        await axios
          .put("http://localhost:5041/api/Employee/update", employeeData)
          .then(window.location.reload(false));
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit Employee's Data</h2>
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
            readOnly
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
        <button onClick={handleEdit}>Edit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
