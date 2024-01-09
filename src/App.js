import "./App.scss";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";
import ViewEmployee from "./components/ViewEmployee";
import { ThemeProvider } from "./components/ThemeContext";
function App() {
  return (
    <ThemeProvider>
      <>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<EmployeeList />}></Route>
            <Route path="/employees" element={<EmployeeList />}></Route>
            <Route path="/add-employee" element={<EmployeeComponent />}></Route>
            <Route
              path="/edit-employee/:id"
              element={<EmployeeComponent />}
            ></Route>
            <Route path="/view-employee/:id" element={<ViewEmployee />}></Route>
          </Routes>

          {/* <Footer /> */}
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;
