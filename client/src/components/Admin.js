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
  console.log("unallocatedTask", unAllocatedTasks);
  console.log("allocatedTasks", allocatedTasks);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/tasks`)
      .then((res) => res.json())
      .then((results) => {
        console.log("res task wala", results);
        setUnAllocatedTasks(
          results.tasks.filter((item) => item.assigned_to === null)
        );
        setAllocatedTasks(
          results.tasks.filter((item) => item.assigned_to != null)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formValues]);

  console.log("formValues", formValues);

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
      <Accordion
        defaultActiveKey="0"
        onClick={() => console.log("task clickeed")}
      >
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
                {unAllocatedTasks.map((item) => {
                  console.log("item", item);
                  return (
                    <tr key={item._id}>
                      <td>{item.id}</td>
                      <td>{item.submitted_by.user_name}</td>
                      <td>{item.product_type}</td>
                      <td>{item.issue_type}</td>
                      <td>{item.date_of_submission}</td>
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
                {allocatedTasks.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.submitted_by.user_name}</td>
                      <td>{item.product_type}</td>
                      <td>{item.issue_type}</td>
                      <td>{item.date_of_submission}</td>
                      <td>{item.status}</td>
                      <td>More Details</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Admin;
