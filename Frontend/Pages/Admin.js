import Sidebar from './Sidebar';
import ViewMedAll from "./ViewMedAll"



function Admin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
              <ViewMedAll />

            </div>
        </div>

      </div>
  );
}

export default Admin;