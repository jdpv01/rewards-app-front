import React, { Component, lazy } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconCamera } from "bootstrap-icons/icons/camera.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconCalenderDate } from "bootstrap-icons/icons/calendar-date.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Webcam from "react-webcam";

class FavoriteView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  setRef = webcam => {
    this.webcam=webcam;
  }

  state = {
    image:null
  }

  photo = () => {
    const photo = this.webcam.getScreenshot();
    this.setState({
      image:photo
    })
  };

  render() {
    return (
      <React.Fragment>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6">Favoritos</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Producto</th>
                        {/*<th scope="col" width={120}>*/}
                        {/*  Quantity*/}
                        {/*</th>*/}
                        <th scope="col" className="text-end" width={130}></th>
                        <th scope="col" width={150}>
                          Acumulas:
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img
                                src="../../images/products/colgate.png"
                                width="80"
                                alt="..."
                              />
                            </div>
                            <div className="col">
                              <Link
                                to="/product/detail"
                                className="text-decoration-none"
                              >
                                Crema dental Colgate
                              </Link>
                              <p className="small text-muted">
                                Crema dental Colgate ECONOPACK 3x75mL
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {/*<div className="input-group input-group-sm mw-140">*/}
                          {/*  <button*/}
                          {/*    className="btn btn-primary text-white"*/}
                          {/*    type="button"*/}
                          {/*  >*/}
                          {/*    <FontAwesomeIcon icon={faMinus} />*/}
                          {/*  </button>*/}
                          {/*  <input*/}
                          {/*    type="text"*/}
                          {/*    className="form-control"*/}
                          {/*    defaultValue="1"*/}
                          {/*  />*/}
                          {/*  <button*/}
                          {/*    className="btn btn-primary text-white"*/}
                          {/*    type="button"*/}
                          {/*  >*/}
                          {/*    <FontAwesomeIcon icon={faPlus} />*/}
                          {/*  </button>*/}
                          {/*</div>*/}
                        </td>
                        <td>
                          <var className="price"><strong>+200</strong></var>
                          {/*<small className="d-block text-muted">*/}
                          {/*  $79.00 each*/}
                          {/*</small>*/}
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary me-2">
                            <IconHeartFill className="i-va" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <IconTrash className="i-va" />
                          </button>
                        </td>
                                        </tr>
                                        <tr>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img
                                src="../../images/products/colgate.png"
                                width="80"
                                alt="..."
                              />
                            </div>
                            <div className="col">
                              <Link
                                to="/product/detail"
                                className="text-decoration-none"
                              >
                                Crema dental Colgate
                              </Link>
                              <p className="small text-muted">
                                Crema dental Colgate ECONOPACK 3x75mL
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {/*<div className="input-group input-group-sm mw-140">*/}
                          {/*  <button*/}
                          {/*    className="btn btn-primary text-white"*/}
                          {/*    type="button"*/}
                          {/*  >*/}
                          {/*    <FontAwesomeIcon icon={faMinus} />*/}
                          {/*  </button>*/}
                          {/*  <input*/}
                          {/*    type="text"*/}
                          {/*    className="form-control"*/}
                          {/*    defaultValue="1"*/}
                          {/*  />*/}
                          {/*  <button*/}
                          {/*    className="btn btn-primary text-white"*/}
                          {/*    type="button"*/}
                          {/*  >*/}
                          {/*    <FontAwesomeIcon icon={faPlus} />*/}
                          {/*  </button>*/}
                          {/*</div>*/}
                        </td>
                        <td>
                          <var className="price"><strong>+200</strong></var>
                          {/*<small className="d-block text-muted">*/}
                          {/*  $79.00 each*/}
                          {/*</small>*/}
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary me-2">
                            <IconHeartFill className="i-va" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <IconTrash className="i-va" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  <Link to="/" className="btn btn-secondary">
                    <IconChevronLeft className="i-va" /> Regresar
                  </Link>
                </div>
              </div>
              <div className="alert alert-success mt-3">
                <p className="m-0">
                  <IconCalenderDate className="i-va me-2" /> Promociones válidas hasta agotar existencias
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <Webcam audio={false} height={350} ref={this.setRef} screenshotFormat="image/jpeg" width={350}/>
              <Link to="/camera" className="btn btn-primary float-end" onClick={this.photo}>
                Escanear factura <IconCamera className="i-va" />
              </Link>
              <img src={this.state.image} alt=""/>
              {/*<div className="card mb-3">*/}
              {/*  <div className="card-body">*/}
              {/*    <CouponApplyForm onSubmit={this.onSubmitApplyCouponCode} />*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className="card">*/}
              {/*  <div className="card-body">*/}
                  {/*<dl className="row border-bottom">*/}
                  {/*  <dt className="col-6">Total price:</dt>*/}
                  {/*  <dd className="col-6 text-end">+200</dd>*/}

                  {/*  <dt className="col-6 text-success">Discount:</dt>*/}
                  {/*  <dd className="col-6 text-success text-end">-$200</dd>*/}
                  {/*  <dt className="col-6 text-success">*/}
                  {/*    Coupon:{" "}*/}
                  {/*    <span className="small text-muted">EXAMPLECODE</span>{" "}*/}
                  {/*  </dt>*/}
                  {/*  <dd className="col-6 text-success text-end">+200</dd>*/}
                  {/*</dl>*/}
                  {/*<dl className="row">*/}
                  {/*  <dt className="col-6">Total:</dt>*/}
                  {/*  <dd className="col-6 text-end  h5">*/}
                  {/*    <strong>$1,350</strong>*/}
                  {/*  </dd>*/}
                  {/*</dl>*/}

                  {/*<p className="text-center">*/}
                  {/*  <img*/}
                  {/*    src="../../images/payment/payments.webp"*/}
                  {/*    alt="..."*/}
                  {/*    height={26}*/}
                  {/*  />*/}
                  {/*</p>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="bg-light border-top p-4">*/}
        {/*  <div className="container">*/}
        {/*    <h6>Payment and refund policy</h6>*/}
        {/*    <p>*/}
        {/*      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do*/}
        {/*      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut*/}
        {/*      enim ad minim veniam, quis nostrud exercitation ullamco laboris*/}
        {/*      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
        {/*      reprehenderit in voluptate velit esse cillum dolore eu fugiat*/}
        {/*      nulla pariatur. Excepteur sint occaecat cupidatat non proident,*/}
        {/*      sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
        {/*    </p>*/}
        {/*    <p>*/}
        {/*      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do*/}
        {/*      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut*/}
        {/*      enim ad minim veniam, quis nostrud exercitation ullamco laboris*/}
        {/*      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in*/}
        {/*      reprehenderit in voluptate velit esse cillum dolore eu fugiat*/}
        {/*      nulla pariatur. Excepteur sint occaecat cupidatat non proident,*/}
        {/*      sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
        {/*    </p>*/}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FavoriteView;
