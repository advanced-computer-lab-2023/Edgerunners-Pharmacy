import MedTableAll from "../Components/MedTableAll";
import Sidebar from '../Components/Sidebar';

function ViewMedAdmin() {
  return (
    <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
              <MedTableAll />
            </div>
        </div>
      </div>
  );
}

export default ViewMedAdmin;