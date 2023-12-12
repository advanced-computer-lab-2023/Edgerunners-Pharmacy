import SalesReportDetailsAdmin from "../../Components/SalesReportDetailsAdmin";
import Sidebar from "../../Components/SidebarAdmin";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ViewSalesAdmin() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="mt-28">
                <SalesReportDetailsAdmin />
            </div>
        </div>
    );
}

export default ViewSalesAdmin;