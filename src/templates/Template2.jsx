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
import "./Template2.scss";
import axios from "axios";

const Template2 = () => {
  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
const [src, setSrc] = useState("");

  useEffect(() => {
    if(id){
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
        <div className="view-card   m-5 p-0" id="view-card">
          <div className="card-body ">
            <div className="main">
              <div className="left p-2">
                <Row className="mx-auto">
                  <Col>
                    {/* <img src={user} alt="user-icon" /> */}
                    <div className="profile-image"><img src={src} alt={id} /></div>
                  </Col>
                  <Row>
                  <Row>
                <Col>
                  <span className="mx-2">Id: </span>
                  <span>{employee.id}</span>
                </Col>
              </Row>
                    <Col>
                      {/* <img src={name} alt="name-icon" /> */}
                    </Col>
                    <span> Name: <span>
                      {employee.firstName} {employee.lastName}</span>
                    </span>
                  </Row>
                </Row>
              </div>

              <section className="content">
                <div className="boxes">
                  <div className="box-1 mt-3">
                    <img
                      className="mx-auto"
                      src={department}
                      alt="department-icon"
                    />{" "}
                    <span className="mx-auto">Department </span>
                    <span className="mx-auto mb-3">{employee.employeeIbu}</span>
                    <div className="bottom1 "></div>
                  </div>

                  <div className="box-2">
                    <img
                      className="mx-auto"
                      src={designation}
                      alt="designation-icon"
                    />
                    <span className="mx-auto">Designation </span>
                    <span className="mx-auto mb-3">{employee.designation}</span>
                    <div className="bottom2 "></div>
                  </div>

                  <div className="box-3">
                    <img className="mx-auto" src={skills} alt="skills-icon" />
                    <span className="mx-auto">Skills </span>
                    <span className="mx-auto mb-3">
                      {employee.employeeSkills}
                    </span>
                    <div className="bottom3 "></div>
                  </div>

                  <div className="box-4">
                    <img
                      className="mx-auto"
                      src={experience}
                      alt="skills-icon"
                    />
                    <span className="mx-auto">Experience </span>
                    <span className="mx-auto mb-3">
                      {employee.employeexperience} years
                    </span>

                    <div className="bottom4 "></div>
                  </div>

                  <div className="box-5">
                    <img className="mx-auto" src={email} alt="email-icon" />
                    <span className="mx-3 mb-3">{employee.emailId}</span>
                    <div className="bottom5"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
