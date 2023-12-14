import OrderDetails from "../../Components/OrderDetails";
import SidebarPatient from "../../Components/SidebarPatient";
import React from "react";

function ViewOrders() {

  return (
    <div>
      <SidebarPatient pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="mt-28">
        <OrderDetails />
      </div>
    </div>
  );
}

export default ViewOrders;