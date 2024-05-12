import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../../partials/content/Portlet";
import { getAllTrips } from "../../crud/flights.crud";
const localizer = momentLocalizer(moment);
export default function Dashboard() {
  const [eventsList, setEventsList] = useState([]);


  return (
    <div className="pb-5">
   
    </div>
  );
}
