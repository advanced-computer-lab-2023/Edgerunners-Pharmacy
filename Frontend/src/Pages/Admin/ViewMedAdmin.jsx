import MedTableAll from "../../Components/MedTableAll";
import Sidebar from '../../Components/Sidebar';
import MedTableAllCopy from "../../Components/MedTableAll copy";

function ViewMedAdmin() {
  return (
    <div>
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-6 mb-4"> 
          <MedTableAllCopy />
        </div>
      </div>
    </div>
  );
}

export default ViewMedAdmin;