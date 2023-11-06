import OrderDetails from "../../Components/OrderDetails";
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function ViewOrders() {
    return (
      <div>
        <div id="outer-container">
          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <div id="page-wrap">
            <div className="flex justify-center">
              <a href="/Patient">
                <Logo height="4rem" className="mt-6 mb-0" />
              </a>
            </div>
            <OrderDetails />
          </div>
        </div>
      </div>
    );
  }
  
  export default ViewOrders;