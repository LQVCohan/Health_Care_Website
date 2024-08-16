// src/HomeFooter.js
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import { isExternalModule } from "typescript";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      re_password: "",
    };
  }
  handleSaveUser = () => {
    try {
      let { email, password, re_password } = this.state;
      console.log("chekc emai;", email);
      if (email !== "" && password !== "" && re_password !== "") {
        if (password === re_password) {
          this.props.createNewUser({
            email: email,
            password: password,
          });
        } else {
          toast.error("Please re-enter your password carefully");
        }
      } else {
        toast.error("Please fulfill your information");
      }
    } catch (error) {
      return;
    }
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    return (
      <footer className="home-footer">
        <div className="footer-main">
          <div className="footer-column">
            <h3>Bookingcare - Uy tín - Chất lượng</h3>
            <p>Address: Số 1, Võ Văn Ngân</p>
            <p>Phone: 0364821047</p>
            <p>Email: vietle632@gmail.com</p>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/quocviet6028/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="mailto:vietle632@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a
                href="https://github.com/LQVCohan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Tiểu luận chuyên ngành</h3>
            <p>Lê Quốc Việt - 20110600</p>
            <p>Đỗ Quang Lâm - 20110512</p>
          </div>
          <div className="footer-column">
            <h3>Create Account</h3>
            <form className="signup-form">
              <input
                className="form-control"
                type="text"
                value={this.state.email}
                onChange={(event) => {
                  this.onChangeInput(event, "email");
                }}
                required
                placeholder="Enter your email"
              />
              <input
                className="form-control"
                type="password"
                value={this.state.password}
                onChange={(event) => {
                  this.onChangeInput(event, "password");
                }}
                required
                placeholder="Enter your password"
              />
              <input
                className="form-control"
                type="password"
                value={this.state.re_password}
                onChange={(event) => {
                  this.onChangeInput(event, "re_password");
                }}
                required
                placeholder="Re-enter your password"
              />
              <button type="submit" onClick={() => this.handleSaveUser}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2024 Bookingcare website. More information, please visit my
            facebook.
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/quocviet6028/"
            >
              &#8594; Click here &#8592;
            </a>
          </p>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { createNewUser: (data) => dispatch(actions.createNewUser(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
