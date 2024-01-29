import React, { useState } from "react";
import "./table.css";
import EditModal from "../EditModal/EditModal";
import axios from "axios";

const Table = ({ columns, data }) => {
  //edit user
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openEditModal = (row) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedRow(null);
    setEditModalOpen(false);
  };

  //delete user
  const handleDelete = async (employee) => {
    try {
      await axios
        .put("http://localhost:5041/api/Employee/delete", employee)
        .then(window.location.reload(false));
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              <td>
                <button onClick={() => openEditModal(row)}>Edit</button>
                <button onClick={async() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModalOpen && (
        <EditModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          employee={selectedRow}
        />
      )}
    </div>
  );
};

export default Table;
