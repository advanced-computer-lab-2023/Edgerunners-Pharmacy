import MedTableAllCopy from '../../Components/MedTableAll copy';
import Sidebar from '../../Components/SidebarAdmin';
import Logo from "../../UI/Logo";

function ViewMedAdmin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
            <div className="justify-center flex mt-6 mb-4">
              <a href="/Admin"><Logo /></a>
            </div>
                <MedTableAllCopy />
            </div>
        </div>

      </div>
  );
}

export default ViewMedAdmin;