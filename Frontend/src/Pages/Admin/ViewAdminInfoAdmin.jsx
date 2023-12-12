import Sidebar from '../../Components/SidebarAdmin';
import AdminTable from '../../Components/AdminTable';

function ViewAdminInfoAdmin() {
  return (
    <div className="flex justify-center items-center">
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-28 items-center flex justify-center">
          <AdminTable />
        </div>
      </div>
    </div>
  );
}

export default ViewAdminInfoAdmin;