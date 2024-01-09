import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useTheme } from "./ThemeContext";
import axios from "axios";
const EmployeeComponent = () => {
  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setemail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeSkills, setEmployeeSkills] = useState("");
  const [employeeIbu, setEmployeeIbu] = useState("");
  const [employeexperience, setEmployeexperinece] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");

  const navigator = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    emailId: "",
    designation: "",
    employeeSkills: "",
    employeeIbu: "",
    employeexperience: "",
  });


  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleemployeeId(e) {
    setEmployeeId(e.target.value);
  }

  function handleemail(e) {
    setemail(e.target.value);
  }

  function handledesignation(e) {
    setDesignation(e.target.value);
  }

  function handleemployeeskilss(e) {
    setEmployeeSkills(e.target.value);
  }

  function handleemployeeIbu(e) {
    setEmployeeIbu(e.target.value);
  }

  function handleemployeexperience(e) {
    setEmployeexperinece(e.target.value);
  }

  // To show the existing data on update
  useEffect(() => {
    console.log(id)
    if (id) {
      getEmployee(id)
        .then((response) => {
          setEmployeeId(response.data.employeeId);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setemail(response.data.emailId);
          setDesignation(response.data.designation);
          setEmployeeSkills(response.data.employeeSkills);
          setEmployeeIbu(response.data.employeeIbu);
          setEmployeexperinece(response.data.employeexperience);
          setEmployeeId(response.data.employeeId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        id: parseInt(employeeId, 10),
        firstName,
        lastName,
        emailId,
        designation,
        employeeSkills,
        employeeIbu,
        employeexperience,
      };

      // employeeImage: selectedFile,
      // };
      console.log(employee);
      setImageId(id);
      let formImage = new FormData();
      formImage.append("file", image);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("Creating a new employee...");
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }

      axios
        .post(`http://localhost:9091/upload/${id}`, formImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function validateForm() {
    let isValid = true;
    const errorsCopy = { ...errors };

    if (employeeId.trim()) {
      errorsCopy.employeeId = "";
    } else {
      errorsCopy.employeeId = "Employee Id is required";
      isValid = false;
    }

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      isValid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "last name is required";
      isValid = false;
    }

    if (emailId.trim()) {
      errorsCopy.emailId = "";
    } else {
      errorsCopy.emailId = "Employee email id is required";
      isValid = false;
    }

    if (designation.trim()) {
      errorsCopy.designation = "";
    } else {
      errorsCopy.designation = "Employee deisgnation is required";
      isValid = false;
    }

    if (employeeSkills.trim()) {
      errorsCopy.employeeSkills = "";
    } else {
      errorsCopy.employeeSkills = "Employee skills is required";
      isValid = false;
    }

    if (employeeIbu.trim()) {
      errorsCopy.employeeIbu = "";
    } else {
      errorsCopy.employeeIbu = "Employee IBU is required";
      isValid = false;
    }

    if (employeexperience.trim()) {
      errorsCopy.employeexperience = "";
    } else {
      errorsCopy.employeexperience = "Employee experience is required";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add New Employee</h2>;
    }
  }

  return (
    <div className={themeClassName}>
      {/* <Header/> */}

      <div className="container">
        <br></br>
        <div className="row">
          <div className="card1 col-md-6 offset-md-3 offset-md-3 mt-5">
            {pageTitle()}
            {/* <h2 className="text-center">Add New Employee</h2> */}
            <div className="card-body">
              <form
                action="http://localhost:8080/api/v1/employees/add-employee"
                method="post"
                encType="
              multipart/form-data"
              >
                {/* <div className="form-group mb-2">
                  <label className="form-label">Employee Id</label>
                  <input
                    type="number"
                    placeholder="Employee Id"
                    required
                    name="employeeId"
                    value={employeeId}
                    readOnly
                    className={`form-control ${
                      errors.employeeId ? "is-invalid" : ""
                    }`}
                    onChange={handleemployeeId}
                  ></input>
                  {errors.employeeId && (
                    <div className="invalid-feedback">{errors.employeeId} </div>
                  )}
                </div> */}

                <div className="form-group mb-2">
                  <label className="form-label">Employee Id</label>
                  <input
                    type="number"
                    placeholder="Employee Id"
                    required
                    name="employeeId"
                    value={employeeId}
                    
                    className={`form-control ${
                      errors.employeeId ? "is-invalid" : ""
                    }`}
                    onChange={handleemployeeId}
                  ></input>
                  {errors.employeeId && (
                    <div className="invalid-feedback">{errors.employeeId} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter Employee first name"
                    name="firstName"
                    value={firstName}
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={handleFirstName}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Employee last name"
                    name="lastName"
                    value={lastName}
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={handleLastName}
                  ></input>
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Email Id</label>
                  <input
                    type="email"
                    placeholder="Enter Employee email Id"
                    name="email"
                    value={emailId}
                    className={`form-control ${
                      errors.emailId ? "is-invalid" : ""
                    }`}
                    onChange={handleemail}
                  ></input>
                  {errors.emailId && (
                    <div className="invalid-feedback">{errors.emailId} </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Designation</label>
                  <input
                    type="text"
                    placeholder="Enter Employee designation"
                    name="designation"
                    value={designation}
                    className={`form-control ${
                      errors.designation ? "is-invalid" : ""
                    }`}
                    onChange={handledesignation}
                  ></input>
                  {errors.designation && (
                    <div className="invalid-feedback">
                      {errors.designation}{" "}
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Core Skills</label>
                  <input
                    type="text"
                    placeholder="Enter Employee skills"
                    name="employeeSkills"
                    value={employeeSkills}
                    className={`form-control ${
                      errors.employeeSkills ? "is-invalid" : ""
                    }`}
                    onChange={handleemployeeskilss}
                  ></input>
                  {errors.employeeSkills && (
                    <div className="invalid-feedback">
                      {errors.employeeSkills}{" "}
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">IBU</label>
                  <input
                    type="text"
                    placeholder="Enter Employee IBU"
                    name="employeeIbu"
                    value={employeeIbu}
                    className={`form-control ${
                      errors.employeeIbu ? "is-invalid" : ""
                    }`}
                    onChange={handleemployeeIbu}
                  ></input>
                  {errors.employeeIbu && (
                    <div className="invalid-feedback">
                      {errors.employeeIbu}{" "}
                    </div>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Experience in years</label>
                  <input
                    type="text"
                    placeholder="Enter Employee experience"
                    name="employeexperience"
                    value={employeexperience}
                    className={`form-control ${
                      errors.employeexperience ? "is-invalid" : ""
                    }`}
                    onChange={handleemployeexperience}
                  ></input>
                  {errors.employeexperience && (
                    <div className="invalid-feedback">
                      {errors.employeexperience}{" "}
                    </div>
                  )}
                </div>

                {/* add image */}
                <div className="form-group mb-2">
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-control"
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
