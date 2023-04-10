import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import FormModal from "./FormModal";

const Admin = () => {
  const [unAllocatedTasks, setUnAllocatedTasks] = useState([]);
  const [allocatedTasks, setAllocatedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    product_type: "",
    issue_type: "",
    assigned_to: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tasks`)
      .then((res) => res.json())
      .then((results) => {
        setUnAllocatedTasks(
          results.tasks.filter((task) => task.assigned_to === null)
        );
        setAllocatedTasks(
          results.tasks.filter((task) => task.assigned_to != null)
        );
      })
      .catch((err) => console.log(err));
  }, [formValues]);

  return (
    <Container>
      Admin
      {showModal && (
        <FormModal
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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Unallocated Tasks</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customers Username</th>
                  <th>Product Type</th>
                  <th>Issue Type</th>
                  <th>Date of Submission</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {unAllocatedTasks.map(
                  ({
                    _id,
                    submitted_by,
                    product_type,
                    issue_type,
                    date_of_submission,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{submitted_by.user_name}</td>
                        <td>{product_type}</td>
                        <td>{issue_type}</td>
                        <td>{date_of_submission}</td>
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
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Allocated Tasks</Accordion.Header>
          <Accordion.Body>
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
                {allocatedTasks.map(
                  ({
                    _id,
                    submitted_by,
                    product_type,
                    issue_type,
                    date_of_submission,
                    status,
                  }) => {
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{submitted_by.user_name}</td>
                        <td>{product_type}</td>
                        <td>{issue_type}</td>
                        <td>{date_of_submission}</td>
                        <td>{status}</td>
                        <td>More Details</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Admin;
