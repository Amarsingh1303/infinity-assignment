import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { selectUser } from "./userReducer";
import Alert from "./Alert";

const productTypeOptions = [
  { label: "Mobile Phone", value: "mobile_phone" },
  { label: "TV", value: "tv" },
  { label: "Refrigerator", value: "regrigerator" },
  { label: "Washing Machine", value: "washing_machine" },
];

const mobilePhoneOptions = [
  { label: "Broken Screen", value: "broken_screen" },
  { label: "Faulty Camera", value: "faulty_camera" },
  { label: "Overheating Issue", value: "overheating_issue" },
];
const tvOptions = [
  { label: "Damaged Screen", value: "damaged_screen" },
  { label: "Discoloration Of Screen", value: "discoloration_of_screen" },
  { label: "Adapter Issues", value: "adapter_issues" },
];
const refrigeratorOptions = [
  { label: "Panel Controls Broken", value: "panel_controls_broken" },
  { label: "Compressor Not Working", value: "compressor_not_working" },
  { label: "Unable To Turn On", value: "unable_to_turn_on" },
];

const washingMachineOptions = [
  { label: "Water overflowing", value: "water_overflowing" },
  { label: "Motor not working", value: "motor_not_working" },
];

const Customer = () => {
  // const [productType, setProductType] = useState(""
  const user = useSelector(selectUser);
  const [formDetails, setFormDetails] = useState({
    product_type: "",
    issue_type: "",
    description: "",
  });
  const [issueTypeOptions, setIssueTypeOptions] = useState([]);
  const [err, setErr] = useState();

  console.log("user", user);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("formDetails", formDetails);
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
      .then((res) => {
        if (res?.msg.msgError === true) {
          setErr(res.msg.msgBody);
        } else {
          setErr(res.msg.msgBody);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setFormDetails({ product_type: "", issue_type: "", description: "" });
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
              onChange={(e) => {
                console.log(e.target.value);
                setFormDetails({
                  ...formDetails,
                  product_type: e.target.value,
                });
                if (e.target.value === "mobile_phone") {
                  setIssueTypeOptions(mobilePhoneOptions);
                } else if (e.target.value === "tv") {
                  setIssueTypeOptions(tvOptions);
                } else if (e.target.value === "regrigerator") {
                  setIssueTypeOptions(refrigeratorOptions);
                } else {
                  setIssueTypeOptions(washingMachineOptions);
                }
              }}
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
                console.log(e.target.value);
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
              {/* <option value="mobile_phone">Mobile Phone</option>
              <option value="tv">TV</option>
              <option value="regrigerator">Refrigerator</option>
              <option value="washing_machine">Washing Machine</option> */}
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
