import Sidebar from './Sidebar';

function Admin() {
  return(
      <div>
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap">
                <h1>Home Page</h1>
                <h2>to be continued</h2>
            </div>
        </div>

      </div>
  );
}

export default Admin;