import React, { useState } from "react";
import FlightItem from "./FlightItem";
import FlightDetails from "./FlightDetails";

const FlightList = ({
  flights,
  setResponse,
  readOnly,
  bookingStatuses,
  updateTipsCancel,
  userType,
  values = ""
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const handleClickShowDetails = (data, status) => {
    setDetails(data?.details);
    setBookingStatus(status);
    setShowDetails(true);
  };
  const adults = parseInt(values.adults) || 0; // Хэрэв "values.adults" нь тоо биш бол 0-р тохируулах
  const child = parseInt(values.child) || 0; // Хэрэв "values.child" нь тоо биш бол 0-р тохируулах

  console.log("flights", flights)
  return (
    <React.Fragment>
      {flights?.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 100, fontSize: 20 }}
        >
          Юу ч олдсонгүй!
        </div>
      ) : (
        flights?.map((flight, index) => (
          <div
            style={{ border: "1px solid lightgrey", borderRadius: 4 }}
            className="pl-1 pr-1 mb-2"
            key={index}
          >
            <div
              className={`d-flex align-items-center p-3 ${
                bookingStatuses
                  ? "justify-content-between"
                  : "justify-content-end"
              }`}
            >
              {bookingStatuses && (
                <div>
                  Захиалгын төлөв: {bookingStatuses[index]?.bookingStatus}
                </div>
              )}
              {bookingStatuses && (
                <div>Тасалбарын дугаар: {bookingStatuses[index]?._id}</div>
              )}
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  Нэг хүний дүн: {flight?.details?.details?.price}-
                  Нийт дүн: {flight?.details?.details?.price * (adults + child)}
                </div>
                <div>
                  <button
                    className="btn btn-label btn-sm"
                    onClick={() =>
                      handleClickShowDetails(
                        flight,
                        bookingStatuses ? bookingStatuses[index] : {}
                      )
                    }
                  >
                    Дэлгэрэнгүй
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <FlightDetails
        flight={details}
        setDetails={setDetails}
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        setResponse={setResponse}
        readOnly={readOnly}
        updateTipsCancel={updateTipsCancel}
        bookingStatus={bookingStatus}
        userType={userType}
        values={
          values
        }
      />
    </React.Fragment>
  );
};

export default FlightList;
