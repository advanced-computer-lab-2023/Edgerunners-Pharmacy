import Sidebar from './Sidebar';

function viewPatientInfoAdmin() {
    return(
        <div>
          <div id="outer-container">
              <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              <div id="page-wrap">
                
              </div>
          </div>
  
        </div>
    );
  }
  
  export default viewPatientInfoAdmin;