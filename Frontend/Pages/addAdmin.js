import Sidebar from '../Components/Sidebar.js';

function AddAdmin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
              <p>add admin</p>
            </div>
        </div>
      </div>
  );
}

export default AddAdmin;