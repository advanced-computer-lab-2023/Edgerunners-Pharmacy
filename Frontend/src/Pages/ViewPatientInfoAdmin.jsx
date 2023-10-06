import Sidebar from '../Components/Sidebar';
import PatientTable from '../Components/PatientTable';

function ViewPatientInfoAdmin() {
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
  
  export default ViewPatientInfoAdmin;