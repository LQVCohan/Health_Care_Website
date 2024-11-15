import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>Đã xảy ra lỗi.</h1>
          <p>Vui lòng thử lại sau.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
