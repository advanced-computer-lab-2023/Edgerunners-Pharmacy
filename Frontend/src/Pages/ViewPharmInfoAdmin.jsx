import Sidebar from '../Components/Sidebar';
import PharmTable from '../Components/PharmTable';

function ViewPharmInfoAdmin() {
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
  
  export default ViewPharmInfoAdmin;