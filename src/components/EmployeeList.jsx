import React from "react";
import "../App.scss";
import { useTheme } from "./ThemeContext";
import { useState, useEffect } from "react";
import { ListEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
const EmployeeList = () => {
  const { getThemeClassName } = useTheme();
  const themeClassName = getThemeClassName();

  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    ListEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewEmployee(id) {
    navigator(`/view-employee/${id}`);
  }

  return (
    <div className={themeClassName}>
      <br></br>
      <div className="container">
        <div className="row">
          <button className="nav-link mb-2" onClick={addNewEmployee}>
            {" "}
            Add Employee
          </button>
        </div>
        <br></br>

        <div className="row">
          {employees.map((employee) => (
            <div key={employee.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${employee.firstName} ${employee.lastName}`}</h5>
                  <p className="card-text">{`Employee ID: ${employee.id}`}</p>
                  <p className="card-text">{`Email: ${employee.emailId}`}</p>
                  <p className="card-text">{`Designation: ${employee.designation}`}</p>

                  <div>
                    <>
                      <button
                        className="btnUpdate card-btn  mr-2"
                        onClick={() => updateEmployee(employee.id)}
                      >
                        Edit
                      </button>
                    </>

                    <>
                      <button
                        className="btnRemove card-btn mr-2"
                        onClick={() => removeEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </>

                    <>
                      <button
                        className="btnView card-btn mx-auto "
                        onClick={() => viewEmployee(employee.id)}
                      >
                        View more
                      </button>
                    </>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
