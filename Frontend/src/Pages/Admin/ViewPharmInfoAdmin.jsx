import Sidebar from "../../Components/SidebarAdmin";
import PharmTable from "../../Components/PharmTable";
import Logo from "../../UI/Logo";

function ViewPharmInfoAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <h2 className="flex justify-center">Pharm Table</h2>
        <PharmTable />
      </div>
    </div>
  );
}

export default ViewPharmInfoAdmin;
