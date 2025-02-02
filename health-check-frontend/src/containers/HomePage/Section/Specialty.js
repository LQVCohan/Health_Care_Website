import React, { Component } from "react";
import { getAllSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./Specialty.scss";
import { useHistory, useLocation } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();

    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  handleViewMoreSpecialty = (item) => {
    this.props.history.push(`/more-specialty/`);
  };
  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className="section-share section-specialty ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id={"homepage.specialty-label"} />
            </span>
            <button
              className="btn-section"
              onClick={() => this.handleViewMoreSpecialty()}
            >
              {" "}
              <FormattedMessage id={"homepage.more-info"} />
            </button>
          </div>
          <div className="section-body ">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div className="specialty-name">{item.name}</div>
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

export default Specialty;
