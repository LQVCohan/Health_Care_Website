import React, { Component } from "react";
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { every } from "lodash";
import LoadingOverlay from "react-loading-overlay";
class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      isLoging: false,
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({ errMessage: "", isLoging: true });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login succeeds");
        console.log(data.user);
        this.setState({ errMessage: "OK", isLoging: false });
      }
    } catch (error) {
      if (error.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
      console.log(error.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    console.log("check event: ", event);
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  handleViewForgotPassword = () => {
    this.props.history.push(`/forgot-password/`);
  };
  render() {
    let { isLoging } = this.state;
    return (
      <LoadingOverlay active={isLoging} spinner text="Loading...">
        <div className="login-background">
          <div className="login-container">
            <div className="login-content row">
              <div className="col-12 text-login"> Login </div>
              <div className="col-12 form-group login-input">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Username"
                  value={this.state.username}
                  onChange={(event) => this.handleOnChangeUsername(event)}
                />
              </div>
              <div className="col-12 form-group login-input">
                <label>Password:</label>
                <div className="custom-input-password">
                  <input
                    className="form-control"
                    type={this.state.isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(event) => {
                      this.handleOnChangePassword(event);
                    }}
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                  <span
                    onClick={(event) => {
                      this.handleShowHidePassword(event);
                    }}
                  >
                    <i
                      class={
                        this.state.isShowPassword
                          ? "far fa-eye"
                          : "far fa-eye-slash"
                      }
                    ></i>
                  </span>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-login"
                  onClick={(event) => {
                    this.handleLogin(event);
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-12">
                <span
                  className="forgot-password"
                  onClick={() => this.handleViewForgotPassword()}
                >
                  Forgot your password?
                </span>
              </div>
              {/* <div className="col-12 text-center">
                <span className="text-other-login">Or Login with: </span>
              </div>
              <div className="col-12 social-login">
                <i class="fa-brands fa-google-plus google"></i>
                <i class="far fa-facebook facebook"></i>
              </div> */}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Login;
