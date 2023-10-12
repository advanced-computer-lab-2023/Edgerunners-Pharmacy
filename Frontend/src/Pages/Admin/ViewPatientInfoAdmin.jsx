import Sidebar from '../../Components/Sidebar';
import PatientTable from '../../Components/PatientTable';
import Logo from '../../UI/Logo';

function ViewPatientInfoAdmin() {
  return (
    <div className="flex">
      <div id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id="page-wrap">
          <div className='flex justify-center'>
            <Logo height='4rem' className="mt-6 mb-0" />
          </div>
          <PatientTable />
        </div>
      </div>

    </div>
  );
}

export default ViewPatientInfoAdmin;