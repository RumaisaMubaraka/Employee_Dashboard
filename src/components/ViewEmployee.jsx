import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmployee } from "../services/EmployeeService";
import { useTheme } from "./ThemeContext";
import { Row, Col } from "reactstrap";
import user from "../images/businessman.png";
import name from "../images/name.png";
import department from "../images/department.png";
import email from "../images/email.png";
import experience from "../images/experience.png";
import skills from "../images/skills.png";
import ID from "../images/id.png";
import designation from "../images/designation.png";
import Download from "../download_data/Download";
import axios from "axios";
//template change
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";

const ViewEmployee = () => {
  //for template change
  const [activeTemplate, setActiveTemplate] = useState("view-card");

  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (id) {
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

  const handleDownloadClick = () => {
    Download({ employeeName: employee.firstName });
  };

  //for template change
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "view-card":
        return (
          <div className="view-card  m-5 p-4" id="view-card">
            <br></br>

            <Row>
           <Row><span className="ms-2 fs-5">Employee Details</span></Row> 
           <Row><br></br></Row>

              <Col>
                {/* <img src={user} alt="user-icon" /> */}
                <div className="profile-image"><img src={src} alt={id} /></div>

              </Col>
            </Row>

            <Row>
              <Col>
              </Col>
            </Row>

            <div className="card-body p-3 ">
              <Row className="my-3">
                <Col>
                  <img src={name} alt="name-icon" />
                  <span className="me-1"> </span>
                  <span>
                    {employee.firstName} {employee.lastName}
                  </span>
                  <Row>
                <Col>
                  <img src={ID} alt="EmployeeId icon" />{" "}
                  <span className="mx-2">Employee Id: </span>
                  <span>{employee.id}</span>
                </Col>
              </Row>
                </Col>
                <Col className="my-3">
                  <img src={designation} alt="name-icon" />
                  <span className="mx-2">Designation: </span>
                  {employee.designation}
                </Col>
              </Row>

              {/* Employee image and Id */}
             

              <Row>
                <Col>
                  <img src={department} alt="department-icon" />{" "}
                  <span className="mx-2">Department: </span>
                  <span>{employee.employeeIbu}</span>
                </Col>
              </Row>

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
        );
      case "template1":
        return <Template1 />;
      case "template2":
        return <Template2 />;

      default:
        return null;
    }
  };

  return (
    <div className={themeClassName}>
      <div className="view-employee">
        <br />
        <div className="btn-col px-5">
          <div>
            <span>
              <button
                className="bg-success rounded text-white"
                onClick={() => setActiveTemplate("view-card")}
              >
                Default view
              </button>
            </span>
          </div>

          <div>
            <span>
              <button
                className="bg-primary rounded text-white mx-2"
                onClick={() => setActiveTemplate("template1")}
              >
                Template 1
              </button>
            </span>
          </div>

          <div>
            <span>
              <button
                className="bg-info rounded text-white"
                onClick={() => setActiveTemplate("template2")}
              >
                Template 2
              </button>
            </span>
          </div>
        </div>
        {renderTemplate()}

        <Row style={{ '--bs-gutter-x': '0rem' }}>
          <Col className="col-2 mx-auto mb-5">
            <button
              className="bg-success rounded text-white"
              onClick={handleDownloadClick}
            >
              Download
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewEmployee;
