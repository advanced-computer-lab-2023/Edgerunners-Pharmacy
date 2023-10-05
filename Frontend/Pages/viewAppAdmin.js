import Sidebar from '../Components/Sidebar.js';

function viewAppAdmin() {
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
  
  export default viewAppAdmin;