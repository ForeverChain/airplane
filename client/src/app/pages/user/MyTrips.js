import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { useSelector } from "react-redux";
import { getUserTrips, getAllTrips } from "../../crud/flights.crud";
import TicketList from "../../Components/flights/TicketList";
import { Spinner } from "react-bootstrap";
import AlertSuccess from "../../Components/alerts/AlertSuccess";
import AlertError from "../../Components/alerts/AlertError";
import PaginationComponent from "../../Components/PaginationComponent";
import Filters from "../../Components/Filters";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { shallowEqual } from "react-redux";
import { Modal, Table, Alert } from "react-bootstrap";
const localizer = momentLocalizer(moment);
const MyTrips = ({ userType = "admin" }) => {
  const { user } = useSelector(({ auth: { user } }) => ({
    user
  }));
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [view, setView] = useState("details");
  const [filters, setFilters] = useState({
    bookingStatus: ""
  });
  const [dropdown, setDropdown] = useState(false);
  const [response, setResponse] = useState({
    success: {
      show: false,
      message: ""
    },
    error: {
      show: false,
      message: ""
    }
  });
  const [eventsList, setEventsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  console.log("filteredData", filteredData)

  useEffect(() => {
    setTripsLoading(true);
    const getTipsFunction = userType === "user" ? getUserTrips : getAllTrips;
    getTipsFunction(user._id)
      .then(result => {
        setTimeout(() => {
          debugger
          setTrips(result.data);
          setFilteredData(result.data);
          setTripsLoading(false);
          const tipss = result.data;
          setEventsList(tipss);
        }, 1000);
      })
      .catch(error => console.log("error", error.message));
  }, [user._id, userType]);
  const handleChangeFilters = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const closeAlert = () => {
    setResponse({
      success: {
        show: false,
        message: ""
      },
      error: {
        show: false,
        message: ""
      }
    });
  };
  const updateTipsCancel = (tripId, status) => {
    const newTrips = trips.map(trip => {
      if (trip._id === tripId) {
        return {
          ...trip,
          bookingStatus: status
        };
      } else {
        return trip;
      }
    });
    setTrips(newTrips);
    setFilteredData(newTrips);
  };
  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
  };
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );  

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Аялал"
          toolbar={
            <PortletHeaderToolbar>
              {userType === "user" && (
                <Dropdown
                  isOpen={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  <DropdownToggle
                    className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                    caret
                  >
                    {view} харагдац
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setView("details")}>
                      Харах хэлбэр
                    </DropdownItem>

                  </DropdownMenu>
                </Dropdown>
              )}

              <Filters
                filters={filters}
                handleChangeFilters={handleChangeFilters}
              />
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <AlertSuccess
            show={response.success.show}
            message={response.success.message}
            handleClose={closeAlert}
          />
          <AlertError
            show={response.error.show}
            message={response.error.message}
            handleClose={closeAlert}
          />
          {tripsLoading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : view === "details" ? (
            <React.Fragment>
                 <Table responsive className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Хаанаас</th>
                <th>Хаашаа</th>
                <th>Нисэх өдөр</th>
                <th>Үнэ</th>
                {isAuthorized && user.role === "2" && (
                <th>Үйлдэл</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No Admins Found
                  </td>
                </tr>
              ) : (
                filteredData?.ticket?.map((admin, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{admin?.flight?.details?.origin}</td>
                      <td>{admin?.flight?.details?.destination}</td>
                      <td>{admin?.flight?.details?.depart}</td>
                      <td>{admin?.totalPrice}</td>
                  
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
            </React.Fragment>
          ) : (
            <Calendar
              localizer={localizer}
              events={eventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          )}
          {view === "details" && (
            <PaginationComponent
              pageNo={pageNo}
              perPage={perPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
              total={filteredData?.length}
            />
          )}
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default MyTrips;
