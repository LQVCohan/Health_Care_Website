import React, { Component } from "react";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section">
              {" "}
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default HandBook;
