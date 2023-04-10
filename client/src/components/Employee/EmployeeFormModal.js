import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const statusOptions = [
  { value: "in_progrees", label: "In Progress" },
  { value: "on_hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
];

const EmployeeFormModal = ({ showModal, hideModal, formValues }) => {
  const [status, setStatus] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const pathRequest = {
      status,
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/task/${formValues.id}`, {
      method: "PATCH",
      body: JSON.stringify(pathRequest),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((results) => console.log("results", results))
      .catch((err) => console.log(err));
    hideModal();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="product_type">Product Type</label>
            <input
              type="text"
              value={formValues.product_type}
              disabled
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="issue_type">Issue Type</label>
            <input
              type="text"
              value={formValues.issue_type}
              disabled
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Change Status</label>
            <select
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              id="status"
            >
              <option>select status</option>
              {statusOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeFormModal;
