import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmployee } from "../services/EmployeeService";

import { useTheme } from "../components/ThemeContext";
import { Row, Col } from "reactstrap";
import user from "../images/businessman.png";
import name from "../images/name.png";
import department from "../images/department.png";
import email from "../images/email.png";
import experience from "../images/experience.png";
import skills from "../images/skills.png";
import designation from "../images/designation.png";
import Download from "../download_data/Download";
import "./Template1.scss";
const Template3 = () => {
  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    getEmployee(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
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
              <img src={user} alt="user-icon" />
              <span className="ms-2 fs-5">Employee Details</span>
            </Col>
          </Row>

          <div className="card-body p-3 ">
            <div className="col1">
              <Row className="my-3">
                <Col>
                  <img src={name} alt="name-icon" />
                  <span className="me-1"> </span>
                  <span>
                    {employee.firstName} {employee.lastName}
                  </span>
                </Col>
                <Row>
                  <Col>
                    <img src={department} alt="department-icon" />{" "}
                    <span className="mx-2">Department: </span>
                    <span>{employee.employeeIbu}</span>
                  </Col>
                </Row>
                <Col className="my-3">
                  <img src={designation} alt="name-icon" />
                  <span className="mx-2">Designation: </span>
                  {employee.designation}
                </Col>
              </Row>
            </div>

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
        </div>
        <Row></Row>
      </div>
    </div>
  );
};

export default Template3;
