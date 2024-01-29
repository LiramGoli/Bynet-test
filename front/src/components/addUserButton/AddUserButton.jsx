import React from "react";
import { RiUserAddFill } from "react-icons/ri";
import "./addUserButton.css";

const AddUserButton = ({ onOpenModal }) => {
  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <div className="button-container" onClick={handleClick}>
      <h3>Add User</h3>
      <RiUserAddFill />
    </div>
  );
};

export default AddUserButton;
