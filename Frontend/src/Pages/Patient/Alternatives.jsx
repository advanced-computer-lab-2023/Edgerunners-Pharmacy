import MedTableAlternatives from "../../Components/MedTableAlternatives";
import Sidebar from "../../Components/SidebarPatient";

function Alternatives() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <MedTableAlternatives />
    </div>
  );
}

export default Alternatives;