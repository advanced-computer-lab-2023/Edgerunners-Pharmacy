import Sidebar from '../../Components/SidebarAdmin';
import PatientTable from '../../Components/PatientTable';

function ViewPatientInfoAdmin() {
  return (
    <div className="flex">
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div className="mt-28 items-center justify-center">
          <PatientTable />
        </div>
      </div>

    </div>
  );
}

export default ViewPatientInfoAdmin;