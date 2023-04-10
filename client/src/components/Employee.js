import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./userReducer";
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
      .catch((err) => {
        console.log(err);
      });
  }, [user.id, formValues]);
  return (
    <Container>
      <h1>Welcome {user.name} Employee</h1>
      {showModal && (
        <EmployeeFormModal
          showModal={showModal}
          hideModal={() => {
            setShowModal(false);
            setFormValues({
              product_type: "",
              issue_type: "",
              date_of_submission: "",
            });
          }}
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
          {tasks.map((item) => {
            return (
              <tr>
                <td>{item._id}</td>
                <td>{item.submitted_by.user_name}</td>
                <td>{item.product_type}</td>
                <td>{item.issue_type}</td>
                <td>{item.date_of_submission}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setFormValues({
                        id: item._id,
                        product_type: item.product_type,
                        issue_type: item.issue_type,
                        date_of_submission: item.date_of_submission,
                      });
                      setShowModal(true);
                    }}
                  >
                    More Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Employee;
