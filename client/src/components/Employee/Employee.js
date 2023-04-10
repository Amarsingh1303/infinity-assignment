import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Shared/userReducer";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import EmployeeFormModal from "./EmployeeFormModal";

const Employee = () => {
  const user = useSelector(selectUser);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    product_type: "",
    issue_type: "",
    assigned_to: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tasks/${user.id}`)
      .then((res) => res.json())
      .then((result) => setTasks(result.tasks))
      .catch((err) => console.log(err));
  }, [user.id, formValues]);

  const hideModalHandler = () => {
    setShowModal(false);
    setFormValues({
      product_type: "",
      issue_type: "",
      date_of_submission: "",
    });
  };

  return (
    <Container>
      <h1>Welcome {user.name} Employee</h1>
      {showModal && (
        <EmployeeFormModal
          showModal={showModal}
          hideModal={hideModalHandler}
          formValues={formValues}
        />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customers Username</th>
            <th>Product Type</th>
            <th>Issue Type</th>
            <th>Date of Submission</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(
            ({
              _id,
              submitted_by,
              product_type,
              issue_type,
              date_of_submission,
              status,
            }) => {
              return (
                <tr>
                  <td>{_id}</td>
                  <td>{submitted_by.user_name}</td>
                  <td>{product_type}</td>
                  <td>{issue_type}</td>
                  <td>{date_of_submission}</td>
                  <td>{status}</td>
                  <td>
                    <button
                      onClick={() => {
                        setFormValues({
                          id: _id,
                          product_type,
                          issue_type,
                          date_of_submission,
                        });
                        setShowModal(true);
                      }}
                    >
                      More Details
                    </button>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Employee;
