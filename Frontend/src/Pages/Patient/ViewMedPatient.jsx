import MedTableAllCopy from "../../Components/MedTableAll copy";
import Logo from "../../UI/Logo";

function ViewMedPatient() {
  return (
    <div>
      <div className="justify-center flex mt-6 mb-4">
        <a href="/Patient">
          <Logo />
        </a>
      </div>
      <MedTableAllCopy />
    </div>
  );
}

export default ViewMedPatient;
