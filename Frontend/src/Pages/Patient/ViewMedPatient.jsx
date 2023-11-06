import MedTableAllCopy from "../../Components/MedTableAll copy";
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function ViewMedPatient() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className="justify-center flex mt-6 mb-4">
        <a href="/Patient">
          <Logo />
        </a>
      </div>
      <MedTableAllCopy />
    </div>
  );
}

export default ViewMedPatient;
