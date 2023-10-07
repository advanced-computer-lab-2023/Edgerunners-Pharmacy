import RequestTable from "../Components/RequestTable"
import Sidebar from "../Components/Sidebar";

function ViewRequestsAdmin() {
  return (
    <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
                <h1 align='center'>Requests</h1>
                <RequestTable />
            </div>
        </div>
      </div>
  );
}

export default ViewRequestsAdmin;