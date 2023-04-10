import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { selectUser } from "../Shared/userReducer";
import Alert from "../Shared/Alert";
import {
  productTypeOptions,
  mobilePhoneOptions,
  tvOptions,
  refrigeratorOptions,
  washingMachineOptions,
} from "./customer.constants";

const Customer = () => {
  const user = useSelector(selectUser);
  const [formDetails, setFormDetails] = useState({
    product_type: "",
    issue_type: "",
    description: "",
  });
  const [issueTypeOptions, setIssueTypeOptions] = useState([]);
  const [err, setErr] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const newRequestForm = {
      ...formDetails,
      submitted_by: user.id,
    };
    fetch(`${process.env.REACT_APP_BASE_URL}/newRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequestForm),
    })
      .then((res) => res.json())
      .then((res) => setErr(res.msg.msgBody))
      .catch((err) => console.log(err));
    setFormDetails({ product_type: "", issue_type: "", description: "" });
  };

  const productTypeHandler = (e) => {
    setFormDetails({
      ...formDetails,
      product_type: e.target.value,
    });
    if (e.target.value === "mobile_phone")
      setIssueTypeOptions(mobilePhoneOptions);
    else if (e.target.value === "tv") setIssueTypeOptions(tvOptions);
    else if (e.target.value === "regrigerator")
      setIssueTypeOptions(refrigeratorOptions);
    else setIssueTypeOptions(washingMachineOptions);
  };

  return (
    <Container>
      {err ? <Alert message={err} clear={() => setErr()} /> : null}
      <h1>Customer Request Form</h1>
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="product_type">Product Type</label>
            <select
              className="form-control"
              onChange={productTypeHandler}
              value={formDetails.product_type}
              id="product_type"
            >
              <option>Select Product Type</option>
              {productTypeOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="issue_type">Issue Type</label>
            <select
              className="form-control"
              onChange={(e) => {
                setFormDetails({
                  ...formDetails,
                  issue_type: e.target.value,
                });
              }}
              value={formDetails.issue_type}
              id="issue_type"
            >
              <option>Select Issue Type</option>
              {issueTypeOptions.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="issue_description">Issue Description</label>
            <textarea
              rows={4}
              id="issue_description"
              className="form-control"
              onChange={(e) => {
                setFormDetails({
                  ...formDetails,
                  description: e.target.value,
                });
              }}
              value={formDetails.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="policy_upload">Policy Upload</label>
            <input
              type="file"
              id="policy_upload"
              className="form-control"
            ></input>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Customer;
