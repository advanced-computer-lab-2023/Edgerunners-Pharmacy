import RequestTable from "../../Components/RequestTable";
import Sidebar from "../../Components/SidebarAdmin";

function ViewRequestsAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-40 items-center flex justify-center">
          <RequestTable />
        </div>
      </div>
    </div>
  );
}

export default ViewRequestsAdmin;
