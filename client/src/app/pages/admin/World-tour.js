import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { addFlight, getAllTrips, getWorldTour, removeFlight } from "../../crud/flights.crud";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Table, Alert } from "react-bootstrap";
import { Tooltip } from "@material-ui/core";
import PaginationComponent from "../../Components/PaginationComponent";
const WorldTour = () => {
  const [filters, setFilters] = useState({
    country: "",
    myTours: false
  });

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  const [dropdown, setDropdown] = useState(false);
  const [dropdownMyTours, setDropdownMyTours] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [currentDeal, setCurrentDeal] = useState([]);
  const [countries, setCountries] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [tourId, setTourId] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ show: false, message: "" });
  const [success, setSuccess] = useState({ show: false, message: "" });

  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };
  const handleClose = () => setShow(false);

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
  };
  const handleShow = id => {
    setTourId(id);
    setShow(true);
  };
  const closeAlert = () => {
    setTimeout(() => {
      setError({ show: false, message: "" });
      setSuccess({ show: false, message: "" });
    }, 3000);
  };
  useEffect(() => {
    setLoading(true);
    getAllTrips()
      .then(result => {
        setDeals(result.data.trips);
        // setCountries(result.data.deals.map(deal => deal.details.country));
        // console.log("result", result.data.deals[0]?.details?.packages);
        // setCurrentDeal(result.data.deals[0]?.details?.packages);
        // setFilters({ country: result.data.deals[0]?.details?.country });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  const confirmDelete = () => {
    removeFlight(tourId)
      .then(res => {
        if (!res.data.success) {
          setError({ show: true, message: res.data.message });
          handleClose();
          closeAlert();
        } else {
          setSuccess({ show: true, message: res.data.message });
          handleClose();
          setDeals(deals.filter(admin => admin._id !== tourId));
          closeAlert();
        }
      })
      .catch(error => {
        setError({ show: true, message: "Could not delete Job Post" });
        handleClose();
        closeAlert();
      });
  };
  // useEffect(() => {
  //   const packages = deals.filter(deal =>
  //     deal.details?.country.includes(filters.country)
  //   )[0]?.details?.packages;
  //   setCurrentDeal(
  //     filters.myTours
  //       ? packages.filter(
  //           p => p.bookedBy.filter(bb => bb === user._id).length > 0
  //         )
  //       : packages
  //   );
  // }, [deals, filters]);

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Нислэг"
          toolbar={
            <PortletHeaderToolbar>
              {user?.role === "1" && (
                <Dropdown
                  isOpen={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  <DropdownToggle
                    className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                    caret
                  >
                    {filters.myTours ? "Миний нислэг" : "Бүх нислэг"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, myTours: false })}
                    >
                      Бүх нислэг
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, myTours: true })}
                    >
                      Миний нислэг
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              {/* <Dropdown
                isOpen={dropdownMyTours}
                toggle={() => setDropdownMyTours(!dropdownMyTours)}
              >
                <DropdownToggle
                  className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                  caret
                >
                  {filters.country !== "" ? filters.country : "Select Country"}
                </DropdownToggle>
                <DropdownMenu>
                  {countries.map(country => (
                    <DropdownItem
                      onClick={() => setFilters({ country })}
                      key={country}
                    >
                      {country}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown> */}
              {user?.role === "2" && (
                <Link to="/world-tour/create" className="btn btn-label btn-sm">
                  <i className="fa fa-plus" /> Нислэг нэмэх
                </Link>
              )}
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : deals.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 100, fontSize: 20 }}
            >
              Нислэг олдсонгүй
            </div>
          ) : (
            <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
              <PortletHeader title={`${filters.country} Нислэг`} />
              <PortletBody>
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
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No Admins Found
                  </td>
                </tr>
              ) : (
                deals
                  .slice(
                    (pageNo - 1) * perPage,
                    (pageNo - 1) * perPage + perPage <= deals.length
                      ? (pageNo - 1) * perPage + perPage
                      : deals.length
                  )
                  .map((admin, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{admin?.details?.origin}</td>
                      <td>{admin?.details?.destination}</td>
                      <td>{admin?.details?.depart}</td>
                      <td>{admin?.details?.price}</td>
                      {isAuthorized && user.role === "2" && (
                      <td>
                        <Tooltip title="Устгах" placement="top">
                          <span>
                            <button
                              className="btn btn-icon text-danger btn-sm h-auto w-auto"
                              onClick={() => handleShow(admin._id)}
                            >
                              <i className="fa fa-minus-circle" />
                            </button>
                          </span>
                        </Tooltip>
                      </td>
                      )}
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={deals.length}
          />
        </PortletBody>
            </Portlet>
          )}
        </PortletBody>
      </Portlet>
      {isAuthorized && user.role === "2" && (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Нислэг устгах</Modal.Title>
        </Modal.Header>
        <Modal.Body>Та устгахдаа итгэлтэй байна уу?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary btn-sm" onClick={handleClose}>
            Хаах
          </button>
          <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
            Устгах
          </button>
        </Modal.Footer>
      </Modal>
      )}
    </div>
  );
};

export default WorldTour;
