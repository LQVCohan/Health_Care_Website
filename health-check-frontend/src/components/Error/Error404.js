import React from "react";
import "./Error404.scss"; // Đường dẫn đến file CSS của bạn

const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="stethoscope-icon">
          <i className="fas fa-stethoscope"></i>
        </div>
        <h1>404</h1>
        <p>
          <strong>Oops! Trang bạn tìm không tồn tại.</strong>
        </p>
        <p>
          Có vẻ như chúng tôi không thể chẩn đoán được vị trí của trang này.
        </p>
        <a href="/home" className="btn">
          Quay lại Trang chủ
        </a>
      </div>
    </div>
  );
};

export default Error404;
