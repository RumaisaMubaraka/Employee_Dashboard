import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmployee } from "../services/EmployeeService";
import ID from "../images/id.png";
import { useTheme } from "../components/ThemeContext";
import { Row, Col } from "reactstrap";
import user from "../images/businessman.png";
import name from "../images/name.png";
import department from "../images/department.png";
import email from "../images/email.png";
import experience from "../images/experience.png";
import skills from "../images/skills.png";
import designation from "../images/designation.png";
import "./Template1.scss";
import axios from "axios";
const Template1 = () => {
  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [src, setSrc] = useState("");

  useEffect(() => {
    if(id) {
      getEmployee(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    axios
    .get(`http://localhost:9091/download/${id}`, {
      responseType: "blob",
    })
    .then((response) => {
      let imageUrl = URL.createObjectURL(response.data);
      setSrc(imageUrl);
      console.log(response.data);
    })
    .catch((error) => {
      setSrc("");
      console.error(error);
    });
  
  }, [id]);

  return (
    <div className={themeClassName}>
      <div className="view-employee">
        <br />
        <div className="view-card offset-md-3ol-md-6  m-5 p-4" id="view-card">
          <br></br>

          <Row className="mx-auto">
            <Col>
              {/* <img src={user} alt="user-icon" /> */}
              <div className="profile-image"><img src={src} alt={id} /></div>
            </Col>
            <Col><span className="ms-2 fs-5">Employee Details</span></Col>
            <Col></Col>

          </Row>

          <div className="card-body p-3 ">
            <Row>
              <Col>
                <div className="col1">
                  <Row className="my-3">
                    <Row className="my-3">
                      <Col>
                        <img src={name} alt="name-icon" />
                        <span className="me-1"> </span>
                        <span>
                          {employee.firstName} {employee.lastName}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                <Col>
                  <img src={ID} alt="EmployeeId icon" />{" "}
                  <span className="mx-2">Employee Id: </span>
                  <span>{employee.id}</span>
                </Col>
              </Row>

                    <Row>
                      <Col>
                        <img src={department} alt="department-icon" />{" "}
                        <span className="mx-2">Department: </span>
                        <span>{employee.employeeIbu}</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="my-3">
                        <img src={designation} alt="name-icon" />
                        <span className="mx-2">Designation: </span>
                        {employee.designation}
                      </Col>
                    </Row>
                  </Row>
                </div>
              </Col>

              {/* 2nd column */}
              <Col>
                <div className="col2">
                  <Row className="my-3">
                    <Col>
                      <img src={email} alt="email-icon" />
                      <span className="ms-3">{employee.emailId}</span>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <img src={skills} alt="skills-icon" />
                      <span className="mx-2">Skills: </span>
                      <span>{employee.employeeSkills}</span>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <img src={experience} alt="skills-icon" />
                      <span className="mx-2">Experience in years: </span>
                      <span>{employee.employeexperience}</span>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
