import RequestTable from "../../Components/RequestTable";
import Sidebar from "../../Components/SidebarAdmin";
import Logo from "../../UI/Logo";

function ViewRequestsAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <h2 className="flex justify-center">Requests Table</h2>
        <RequestTable />
      </div>
    </div>
  );
}

export default ViewRequestsAdmin;
