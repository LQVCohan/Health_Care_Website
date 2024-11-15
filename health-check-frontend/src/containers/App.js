import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { path } from "../utils";
import Home from "../routes/Home";
import HomePage from "./HomePage/HomePage";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import MoreDoctor from "./Patient/Doctor/MoreDoctor";
import Doctor from "../routes/Doctor";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import SearchBar from "./HomePage/SearchBar";
import MoreSpecialty from "./Patient/Doctor/MoreSpecialty";
import MoreClinic from "./Patient/Doctor/MoreClinic";
import ProfilePatient from "./Patient/Profile/ProfilePatient";
import AppointmentPatient from "./Patient/Profile/AppointmentPatient";
import Rule from "./HomePage/Section/Rule";
import ForgotPassword from "./Patient/Profile/ForgotPassword";
import Error404 from "../components/Error/Error404";
import "font-awesome/css/font-awesome.min.css";
import ErrorBoundary from "../components/Error/ErrorBoundary";
class App extends Component {
  handlePersistorState = () => {
    // Handle persistor state logic here, if needed
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div className="main-container">
            <div className="content-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  exact
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route path={"/doctor/"} element={<Doctor />} />
                <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  element={<DetailSpecialty />}
                />
                <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  element={<VerifyEmail />}
                />
                <Route path={path.SEARCH} element={<SearchBar />} />
                <Route path={"/more-doctor/"} element={<MoreDoctor />} />
                <Route path={"/more-specialty/"} element={<MoreSpecialty />} />
                <Route path={"/more-clinic/"} element={<MoreClinic />} />
                <Route
                  path={"/patient-profile/"}
                  element={<ProfilePatient />}
                />
                <Route
                  path={"/patient-booking/:id"}
                  element={<AppointmentPatient />}
                />
                <Route path={"/rule/"} element={<Rule />} />
                <Route exact path="/404" component={Error404} />
                {/* Nếu không tìm thấy route nào, điều hướng tới trang lỗi 404 */}
                <Route path="*" component={Error404} />
              </Routes>
            </div>

            {/* ToastContainer logic commented out for now */}
            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;
