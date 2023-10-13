import MedTableAllCopy from '../../Components/MedTableAll copy';
import Sidebar from '../../Components/Sidebar';

function ViewMedAdmin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
                <MedTableAllCopy />
            </div>
        </div>

      </div>
  );
}

export default ViewMedAdmin;