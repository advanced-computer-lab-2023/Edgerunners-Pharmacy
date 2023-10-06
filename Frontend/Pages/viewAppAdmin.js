import Sidebar from '../Components/Sidebar.js';

function ViewAppAdmin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
              <p>view app admin</p>
            </div>
        </div>
      </div>
  );
}

export default ViewAppAdmin;