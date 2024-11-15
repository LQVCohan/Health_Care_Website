// Import necessary libraries
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar, Menu, Icon, Button } from "semantic-ui-react"; // Using Semantic UI for quick styling

class HomeSidebar extends Component {
  state = { visible: true };

  // Toggle sidebar visibility
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  render() {
    const { visible } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Sidebar Component */}
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={visible}
          width={visible ? "thin" : "very thin"} // Change width when toggled
          className="sidebar-menu"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center the items vertically
            alignItems: "center", // Align items horizontally in the center
            padding: 0,
          }}
        >
          {/* Sidebar logo */}
          <Menu.Item
            as="div"
            className="sidebar-logo"
            style={{
              textAlign: "center",
              marginBottom: visible ? "20px" : "10px",
            }}
          ></Menu.Item>

          {/* Sidebar items */}
          <Menu.Item as={NavLink} to="/home" style={{ textAlign: "center" }}>
            <Icon name="home" />
            {visible && "Home"}
          </Menu.Item>
          <Menu.Item as={NavLink} to="/profile" style={{ textAlign: "center" }}>
            <Icon name="user" />
            {visible && "Profile"}
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/appointments"
            style={{ textAlign: "center" }}
          >
            <Icon name="calendar check" />
            {visible && "Appointments"}
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to="/health-packages"
            style={{ textAlign: "center" }}
          >
            <Icon name="heartbeat" />
            {visible && "Health Packages"}
          </Menu.Item>
          <Menu.Item as={NavLink} to="/support" style={{ textAlign: "center" }}>
            <Icon name="question circle" />
            {visible && "Support"}
          </Menu.Item>
        </Sidebar>

        {/* Toggle button for sidebar */}
        <div>
          <Button
            icon
            circular
            onClick={this.toggleVisibility}
            style={{
              position: "fixed",
              top: "50%",
              transform: "translateY(-50%)",
              left: visible ? "200px" : "60px", // Adjust position based on sidebar state
              zIndex: 1000,
              backgroundColor: "#34495e",
              color: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Icon name={visible ? "angle left" : "angle right"} />
          </Button>
        </div>

        {/* Main content area */}
        <div
          style={{
            marginLeft: visible ? "200px" : "80px",
            padding: "20px",
            transition: "margin-left 0.3s ease",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default HomeSidebar;
