import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { Form, useNavigate, useParams } from "react-router-dom";
// import "../Employee.module.css";
import styles from "../Employee.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
 
 
 
const EmployeeComponent = () => {
  const [empId, setEmpId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hometown, setHometown] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [hobby, setHobby] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [altProfession, setaltProfession] = useState("");
  const [quote, setQuote] = useState("");
  const [coreSkills, setcoreSkills] = useState("");
  const [ibuName, setIbuName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");
 
 
 
  const { id } = useParams();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
 
  const navigator = useNavigate();
 
  useEffect(() => {
    console.log("entering useEffect")
    console.log(id)
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setHometown(response.data.hometown);
          setEducation(response.data.education);
          setExperience(response.data.experience);
          setHobby(response.data.hobby);
          setcontactNumber(response.data.contactNumber);
          setaltProfession(response.data.altProfession);
          setQuote(response.data.quote);
          setcoreSkills(response.data.coreSkills);
          setIbuName(response.data.ibuName);
          setManagerName(response.data.managerName);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
 
  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    // let id = parseInt(empId, 10);
    if (validateForm()) {
      const employee = {
        id: parseInt(empId, 10),
        firstName,
        lastName,
        email,
        hometown,
        education,
        experience,
        hobby,
        contactNumber,
        altProfession,
        quote,
        coreSkills,
        ibuName,
        managerName,
      };
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
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
      axios.post(`http://localhost:8080/upload/${id}`, formImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      })
      
    }
    
  }
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
 
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }
 
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }
 
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
 
    setErrors(errorsCopy);
    return valid;
  }
  // function pageTitle() {
  //   if (id) {
  //     return <h2 className="text-center">Update Employee</h2>;
  //   } else {
  //     return <h2 className="text-center">Add Employee</h2>;
  //   }
  // }
  return (
    
    <div className={styles.body123}>
      <div className={`${styles.container} ${styles.easeIn}`}>
        <header>Registration</header>
 
        <form className={styles.form} action="submit">
          <div className={styles.personal}>
            <h5>Personal Information</h5>
            <div className={styles.inputfield}>
                <label>Employee Id</label>
                <input
                  type="number"
                  placeholder="id"
                  name="skills"
                  value={empId}
                  className="form-control"
                  onChange={(e) => setEmpId(e.target.value)}
                ></input>
              </div>
            <div className={styles.fields}>
              <div className={styles.inputfield}>
                <label>first Name</label>
                <input
                  type="text"
                  placeholder="Enter employee first name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>last name</label>
                <input
                  type="text"
                  placeholder="Enter employee last name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>email</label>
                <input
                  type="email"
                  placeholder="Enter employee email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.personal}>
            <div className={styles.fields}>
              <div className={styles.inputfield}>
                <label>Hometown</label>
                <input
                  type="text"
                  placeholder="enter the name of hometown"
                  name="hometown"
                  value={hometown}
                  className="form-control"
                  onChange={(e) => setHometown(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>Education</label>
                <input
                  type="text"
                  placeholder="Education"
                  name="Education"
                  value={education}
                  className="form-control"
                  onChange={(e) => setEducation(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>experiance</label>
                <input
                  type="text"
                  placeholder="experiance"
                  name="experiance"
                  value={experience}
                  className="form-control"
                  onChange={(e) => setExperience(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.personal}>
            <div className={styles.fields}>
              <div className={styles.inputfield}>
                <label>Hobby</label>
                <input
                  type="text"
                  placeholder="Hobby"
                  name="Hobby"
                  value={hobby}
                  className="form-control"
                  onChange={(e) => setHobby(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>Contact Number</label>
                <input
                  type="number"
                  placeholder="contact number"
                  name="contact"
                  value={contactNumber}
                  className="form-control"
                  onChange={(e) => setcontactNumber(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>alternate profession</label>
                <input
                  type="text"
                  placeholder="alternate profession"
                  name="profession"
                  value={altProfession}
                  className="form-control"
                  onChange={(e) => setaltProfession(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div className={styles.personal}>
            <div className={styles.fields}>
              <div className={styles.inputfield}>
                <label>Quote</label>
                <input
                  type="text"
                  placeholder="Quote"
                  name="Quote"
                  value={quote}
                  className="form-control"
                  onChange={(e) => setQuote(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>Coreskills</label>
                <input
                  type="text"
                  placeholder="skills"
                  name="skills"
                  value={coreSkills}
                  className="form-control"
                  onChange={(e) => setcoreSkills(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
                <label>IBU name</label>
                <input
                  type="text"
                  placeholder="IBU"
                  name="IBU"
                  value={ibuName}
                  className="form-control"
                  onChange={(e) => setIbuName(e.target.value)}
                ></input>
              </div>
              <div className={styles.inputfield}>
              <label>Manager name</label>
                <input
                  type="text"
                  placeholder="Manager"
                  name="manager"
                  value={managerName}
                  className="form-control"
                  onChange={(e) => setManagerName(e.target.value)}
                ></input> <label>Manager name</label>
                <input
                  type="text"
                  placeholder="Manager"
                  name="manager"
                  value={managerName}
                  className="form-control"
                  onChange={(e) => setManagerName(e.target.value)}
                ></input>
                <div className={styles.inputfield}>
                <label>upload image</label>
                <input
                  type="file"
                  // placeholder="experiance"
                  name="image"
                  // value={}
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
 
                ></input>
              </div>
              </div>
            </div>
          </div>
          <button className={styles.success} onClick={saveOrUpdateEmployee}>
                 Submit
             </button>
        </form>
      </div>
    </div>
  );
};
 
export default EmployeeComponent;
 