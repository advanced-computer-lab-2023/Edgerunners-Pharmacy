import Sidebar from '../Components/Sidebar.js';
import PatientTable from '../Components/PatientTable.js';

function viewPatientInfoAdmin() {
    return(
        <div>
          <div id="outer-container">
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              <div id="page-wrap">
                <PatientTable />
              </div>
          </div>
  
        </div>
    );
  }
  
  export default viewPatientInfoAdmin;