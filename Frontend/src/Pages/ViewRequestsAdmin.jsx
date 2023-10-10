import RequestTable from "../Components/RequestTable"
import Sidebar from "../Components/Sidebar";
import Logo from "../UI/Logo";

function ViewRequestsAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <div className='flex justify-center'>
            <Logo height='4rem' className="mt-6 mb-0" />
          </div>
          <RequestTable />
        </div>
      </div>
    </div>
  );
}

export default ViewRequestsAdmin;