import Sidebar from '../Components/Sidebar.js';
import PharmTable from '../Components/PharmTable.js';

function viewPharmInfoAdmin() {
    return(
        <div>
          <div id="outer-container">
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              <div id="page-wrap">
                <PharmTable />
              </div>
          </div>
  
        </div>
    );
  }
  
  export default viewPharmInfoAdmin;