import Medicine from "./Medicine"
// add medicines from DataBase
function ViewMedAll() {
  return ( 
    <div className = "all"> 
      <Medicine name="medicine 1" description="this is medicine 1" price="15.00" />
      <Medicine name="medicine 2" description="this is medicine 2" price="63.00" />
    </div> 
  ); 
}
 
export default ViewMedAll;