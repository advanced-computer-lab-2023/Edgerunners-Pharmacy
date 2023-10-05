import Sidebar from '../Components/Sidebar.js';
import PatientTable from '../Components/PatientTable.js';

function ViewPatientInfoAdmin() {
    return(
        <div>
          <div id="outer-container">
            <p>alo</p>
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              <div id="page-wrap">
                <h1>Patient Table</h1>
                <PatientTable />
              </div>
          </div>
  
        </div>
    );
  }
  
  export default ViewPatientInfoAdmin;