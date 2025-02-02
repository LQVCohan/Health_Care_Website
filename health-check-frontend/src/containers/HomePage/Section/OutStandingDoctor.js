import React, { Component } from "react";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { useParams, useNavigate, useLocation } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {}
  handleViewDetailDoctor = (doctor) => {
    console.log("Cohan check view info: ", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleViewMoreDoctor = (doctor) => {
    console.log("Cohan check view info: ", doctor);
    this.props.history.push(`/more-doctor/`);
  };
  render() {
    let { language } = this.props;
    console.log("topDoctorsRedux: ", this.props.topDoctorsRedux);
    let arrDoctors = this.state.arrDoctors;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button
              className="btn-section"
              onClick={() => this.handleViewMoreDoctor()}
            >
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="outer-bg">
                        <div
                          className="bg-image section-outstanding-doctor"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        />
                        <div className="position text-center">
                          <div>{language === "VI" ? nameVi : nameEn}</div>
                          <div className="specialty">
                            {item.Doctor_Info.specialtyData.name
                              ? item.Doctor_Info.specialtyData.name
                              : "Freelance"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default OutStandingDoctor;
