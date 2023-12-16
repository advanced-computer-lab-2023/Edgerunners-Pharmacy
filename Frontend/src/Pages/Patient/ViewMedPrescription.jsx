import MedTablePrescriptions from "../../Components/MedTablePrescriptions";
import Sidebar from "../../Components/SidebarPatient";

function ViewMedPrescription() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <MedTablePrescriptions />
    </div>
  );
}

export default ViewMedPrescription;