import Sidebar from "../../Components/SidebarAdmin";
import PharmTable from "../../Components/PharmTable";
import Logo from "../../UI/Logo";

function ViewPharmInfoAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
        <div id="page-wrap">
          <div className="flex justify-center">
            <a href="/Admin">
              <Logo height="4rem" className="mt-6 mb-0" />
            </a>
          </div>
          <PharmTable />
        </div>
      </div>
    </div>
  );
}

export default ViewPharmInfoAdmin;
