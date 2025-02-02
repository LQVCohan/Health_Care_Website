import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

import "./TableManageUser.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { text } from "@fortawesome/fontawesome-svg-core";
import "./ManageDoctor.scss";
import Select from "react-select";
import { lang } from "moment";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { getDetailInfoDoctor } from "../../../services/userService";
import { has } from "lodash";
import Specialty from "../../HomePage/Section/Specialty";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      listPrices: [],
      listPayments: [],
      listProvinces: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
      resClinic: "",
    };
  }
  async componentDidMount() {
    try {
      this.props.fetchAllDoctors();
      this.props.getRequiredDoctorInfo();
    } catch (error) {
      return;
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        console.log("check input data ", inputData);
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      return result;
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    try {
      if (prevProps.allDoctors !== this.props.allDoctors) {
        let dataSelect = this.buildDataInputSelect(
          this.props.allDoctors,
          "USERS"
        );
        this.setState({
          listDoctors: dataSelect,
        });
      }
      if (
        prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo
      ) {
        let { resClinic, resSpecialty, resPayment, resPrice, resProvince } =
          this.props.allRequiredDoctorInfo;
        let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
        let dataSelectPayment = this.buildDataInputSelect(
          resPayment,
          "PAYMENT"
        );
        let dataSelectProvince = this.buildDataInputSelect(
          resProvince,
          "PROVINCE"
        );
        let dataSelectSpecialty = this.buildDataInputSelect(
          resSpecialty,
          "SPECIALTY"
        );
        let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
        this.setState({
          listPrices: dataSelectPrice,
          listPayments: dataSelectPayment,
          listProvinces: dataSelectProvince,
          listSpecialty: dataSelectSpecialty,
          listClinic: dataSelectClinic,
        });
      }
      if (prevProps.language !== this.props.language) {
        let dataSelect = this.buildDataInputSelect(
          this.props.allDoctors,
          "USERS"
        );
        let { resPayment, resPrice, resProvince } =
          this.props.allRequiredDoctorInfo;
        let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
        let dataSelectPayment = this.buildDataInputSelect(
          resPayment,
          "PAYMENT"
        );
        let dataSelectProvince = this.buildDataInputSelect(
          resProvince,
          "PROVINCE"
        );

        this.setState({
          listDoctors: dataSelect,
          listPrices: dataSelectPrice,
          listPayments: dataSelectPayment,
          listProvinces: dataSelectProvince,
        });
      }
    } catch (error) {
      return;
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    try {
      let { hasOldData } = this.state;

      this.props.saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        id: this.state.selectedDoctor.value,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        selectedPrice: this.state.selectedPrice.value,
        selectedPayment: this.state.selectedPayment.value,
        selectedProvince: this.state.selectedProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
        clinicId:
          this.state.selectedClinic && this.state.selectedClinic.value
            ? this.state.selectedClinic.value
            : "",
        specialtyId: this.state.selectedSpecialty.value,
      });
    } catch (error) {
      return;
    }
  };

  handleChangeSelect = async (selectedDoctor) => {
    try {
      this.setState({ selectedDoctor: selectedDoctor });
      console.log("state", this.state);
      let { listPrices, listPayments, listProvinces, listSpecialty } =
        this.state;
      let res = await getDetailInfoDoctor(selectedDoctor.value);
      if (res && res.errCode === 0 && res.data && res.data.Markdown) {
        let markdown = res.data.Markdown;

        let addressClinic = "",
          nameClinic = "",
          note = "",
          paymentId = "",
          priceId = "",
          provinceId = "",
          selectedPrice = "",
          selectedPayment = "",
          selectedProvince = "",
          selectedSpecialty = "",
          specialtyId = "";

        if (res.data.Doctor_Info) {
          addressClinic = res.data.Doctor_Info.addressClinic;
          nameClinic = res.data.Doctor_Info.nameClinic;
          note = res.data.Doctor_Info.note;
          priceId = res.data.Doctor_Info.priceId;
          paymentId = res.data.Doctor_Info.paymentId;
          provinceId = res.data.Doctor_Info.provinceId;
          specialtyId = res.data.Doctor_Info.specialtyId;
          console.log("before find array", listPayments);
          selectedPrice = listPrices.find((item) => {
            return item && item.value === priceId;
          });
          selectedPayment = listPayments.find((item) => {
            return item && item.value === paymentId;
          });
          selectedProvince = listProvinces.find((item) => {
            return item && item.value === provinceId;
          });
          selectedSpecialty = listSpecialty.find((item) => {
            return item && item.value === specialtyId;
          });
        }
        this.setState({
          contentHTML: markdown.contentHTML,
          contentMarkdown: markdown.contentMarkdown,
          description: markdown.description,
          hasOldData: true,
          addressClinic: addressClinic,
          nameClinic: nameClinic,
          note: note,
          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
          selectedSpecialty: selectedSpecialty,
        });
      } else {
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          description: "",
          hasOldData: false,
          addressClinic: "",
          nameClinic: "",
          note: "",
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
          selectedSpecialty: "",
        });
      }
    } catch (error) {
      return;
    }
  };

  handleChangeSelectDoctorInfor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log("thu coi ne: ", selectedOption, "va: ", name);
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { hasOldData, listSpecialty } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
              name={"selectedDoctor"}
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrices}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayments}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvinces}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.specialty-label" />
            </label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty-label" />
              }
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.clinic-label" />
            </label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.clinic-label" />
              }
              name="selectedClinic"
            />{" "}
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.update" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.create" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default ManageDoctor;
