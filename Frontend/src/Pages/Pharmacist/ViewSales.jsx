import SalesReportDetails from "../../Components/SalesReportDetailsPharm";
import Sidebar from "../../Components/SidebarPharm";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ViewSales() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="mt-28">
                <SalesReportDetails />
            </div>
        </div>
    );
}

export default ViewSales;