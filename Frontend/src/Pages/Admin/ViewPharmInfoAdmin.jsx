import Sidebar from "../../Components/SidebarAdmin";
import PharmTable from "../../Components/PharmTable";

function ViewPharmInfoAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-28 items-center flex justify-center">
          <PharmTable />
        </div>
      </div>
    </div>
  );
}

export default ViewPharmInfoAdmin;
