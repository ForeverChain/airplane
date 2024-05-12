import React, { useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import moment from "moment";
import clsx from "clsx";
import Login from "../../pages/auth/Login";
import {
  bookFlight,
  changeFlightStatus,
  checkoutForPayment
} from "../../crud/flights.crud";
import { shallowEqual, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
const FlightDetails = ({
  flight,
  showDetails,
  setShowDetails,
  setDetails,
  setResponse,
  readOnly,
  bookingStatus,
  updateTipsCancel,
  userType,
  values=""
}) => {
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user
    }),
    shallowEqual
  );
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1.5rem"
  });
  const enableLoading = () => {
    setLoadingBooking(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoadingBooking(false);
    setLoadingButtonStyle({ paddingRight: "1.5rem" });
  };
  const handleClickBookNow = () => {
    if (isAuthorized) {
      enableLoading();
      debugger;
      bookFlight({ flightId: flight._id, userId: user._id, totalPrice: flight?.details?.price *  (adults + child)})
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            setResponse({
              success: {
                show: true,
                message: res.data.message
              },
              error: {
                show: false,
                message: ""
              }
            });
          }, 1000);
        })
        .catch(error => {
          setResponse({
            success: {
              show: false,
              message: ""
            },
            error: {
              show: true,
              message: "Could not book Flight at the moment"
            }
          });
        });
    } else {
      setShowDetails(false);
      setShowLogin(true);
    }
  };
  const handleClickChangeStatus = status => {
    if (isAuthorized) {
      enableLoading();
      changeFlightStatus({ flightId: bookingStatus._id, status })
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            updateTipsCancel(bookingStatus._id, status);
            setResponse({
              success: {
                show: true,
                message: `Booking ${status} Successfully`
              },
              error: {
                show: false,
                message: ""
              }
            });
          }, 1000);
        })
        .catch(error => {
          setResponse({
            success: {
              show: false,
              message: ""
            },
            error: {
              show: true,
              message: "Could not book Flight at the moment"
            }
          });
        });
    } else {
      setShowDetails(false);
      setShowLogin(true);
    }
  };
  const handleLogin = () => {
    setShowLogin(false);
    setShowDetails(true);
  };
  const makePayment = token => {
    console.log("token", token);
    checkoutForPayment({
      token,
      amount: parseInt(flight.details?.price?.total, 10) * 100,
      flightId: bookingStatus._id
    })
      .then(result => {
        setShowDetails(false);
        setDetails(null);
        if (!result.data.error) {
          updateTipsCancel(bookingStatus._id, "Confirmed");
          setResponse({
            success: {
              show: true,
              message: `Booking Confirmed Successfully`
            },
            error: {
              show: false,
              message: ""
            }
          });
        } else {
          setResponse({
            success: {
              show: false,
              message: ""
            },
            error: {
              show: true,
              message: result.data.message
            }
          });
        }
      })
      .catch(error => {
        setShowDetails(false);
        setDetails(null);
        setResponse({
          success: {
            show: false,
            message: ""
          },
          error: {
            show: true,
            message: "Could not make payment at the moment"
          }
        });
      });
  };

  const adults = parseInt(values.adults) || 0; // Хэрэв "values.adults" нь тоо биш бол 0-р тохируулах
  const child = parseInt(values.child) || 0; // Хэрэв "values.child" нь тоо биш бол 0-р тохируулах

  console.log("flight?.details?.details.", flight)

  return (
    <React.Fragment>
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Нислэгийн дэлгэрэнгүй</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && user.role !== "2" && !user.passportNo && (
            <Alert show={true} onHide={() => {}} variant="warning">
              Таны пасспортны дугаар дутуу байна
              <Alert.Link>
                <Link to="/account"> энд дар</Link>
              </Alert.Link>
            </Alert>
          )}
          <h4 className="mb-3 col-12">Маршрут</h4>
          <Table responsive>
            <thead>
              <tr>
                <th>Дугаар</th>
                <th>Хаанаас</th>
                <th>Хаашаа</th>
                <th>Нисэх цаг</th>
                <th>Урт</th>
              </tr>
            </thead>
            <tbody>
                  <tr key={`${1}-itineraries`}>
                    <td>
                      1
                    </td>
                    <td>
                      <div>{flight?.details?.origin}</div>
                    
                    </td>
                    <td>
                      <div>{flight?.details?.destination}</div>
                    
                    </td>
                    <td>
                      {moment(flight?.details?.depart).format("DD-MM-YY hh:mm a")}
                    </td>
                  
                    <td>
                      {flight?.details?.length}
                    </td>
                  </tr>
            </tbody>
          </Table>

      
          <hr />
          {user && user.role === "2" && (
            <>
              <h4 className="mb-3 col-12">Захиалсан</h4>
              <div className="row mx-2">
                <div className="form-group col-6">
                  <div className="form-label">Нэр</div>
                  <h5>{flight?.bookedBy?.firstName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Овог</div>
                  <h5>{flight?.bookedBy?.lastName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Имэйл</div>
                  <h5>{flight?.bookedBy?.email || "Оруулаагүй байна"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Утас</div>
                  <h5>{flight?.bookedBy?.mobileNo || "Оруулаагүй байна"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Passport дугаар</div>
                  <h5>{flight?.bookedBy?.passportNo || "Оруулаагүй байна"}</h5>
                </div>
              </div>
            </>
          )}

          <div className="p-3 text-right">
            <div>Нийт дүн</div>
            {flight?.details?.price *  (adults + child)}-{flight?.details?.price?.total}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Хаах
          </Button>
          {(userType === "user" || !isAuthorized || isAuthorized) &&
          userType !== "admin" ? (
            !readOnly ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                  }
                )}`}
                style={loadingButtonStyle}
                disabled={user && !user.passportNo}
                onClick={handleClickBookNow}
              >
                Захиалах
              </button>
            ) : bookingStatus?.bookingStatus === "Pending" ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                  }
                )}`}
                disabled={bookingStatus?.bookingStatus !== "Pending"}
                style={loadingButtonStyle}
                onClick={() => handleClickChangeStatus("Canceled")}
              >
                Cancel Booking
              </button>
            ) : (
              <StripeCheckout
                token={makePayment}
                stripeKey={
                  "pk_test_51HLtFDCzlUjqqV4cLqsB8OvMpfcaVDzIhl9HJAzf2trhhw3wEdQrIjR26zvooiOdLS1pqsxdW6xpbped5ObJUSIf0069JxvS7k"
                }
                name="PaymentForFlight"
                amount={parseInt(flight?.details?.price?.total, 10) * 100}
                currency="PKR"
              >
                <button
                  className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                    {
                      "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                    }
                  )}`}
                  disabled={bookingStatus?.bookingStatus !== "Approved"}
                  style={loadingButtonStyle}
                  // onClick={() => handleClickChangeStatus("Canceled")}
                >
                  Confirm To Checkout
                </button>
              </StripeCheckout>
            )
          ) : (
            <button
              className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                {
                  "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                }
              )}`}
              disabled={bookingStatus?.bookingStatus !== "Pending"}
              style={loadingButtonStyle}
              onClick={() => handleClickChangeStatus("Approved")}
            >
              Approve Booking
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={showLogin} onHide={() => setShowLogin(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login isModal={true} handleLogin={handleLogin} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default FlightDetails;
