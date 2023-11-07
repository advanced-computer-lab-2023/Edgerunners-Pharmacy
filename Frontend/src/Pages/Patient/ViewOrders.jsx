import OrderDetails from "../../Components/OrderDetails";
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function ViewOrders() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="justify-center flex mb-4">
        <a href="/Patient">
          <Logo />
        </a>
      </div>
      <OrderDetails />
    </div>
  );
}

export default ViewOrders;