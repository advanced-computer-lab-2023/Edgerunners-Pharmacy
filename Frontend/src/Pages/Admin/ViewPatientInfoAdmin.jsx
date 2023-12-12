import Sidebar from '../../Components/SidebarAdmin';
import PatientTable from '../../Components/PatientTable';
import Logo from '../../UI/Logo';

function ViewPatientInfoAdmin() {
  return (
    <div className="flex">
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <h2 className="flex justify-center">Patient Table</h2>
        <PatientTable />
      </div>

    </div>
  );
}

export default ViewPatientInfoAdmin;