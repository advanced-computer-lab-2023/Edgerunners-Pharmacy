import { useNavigate } from 'react-router-dom';
import './LoginAll.css'

export default function LoginAll() {
    let navigate1 = useNavigate();
    const routeChange1 = () => {
        let path1 = `/AddPharmacist`;
        navigate1(path1);
    }

    let navigate2 = useNavigate();
    const routeChange2 = () => {
        let path2 = `/AddPatient`;
        navigate2(path2);
    }

    // let navigate3 = useNavigate();
    // const routeChange3 = () => {
    //     let path3 = `/Admin`;
    //     navigate3(path3);
    // }

    // let navigate4 = useNavigate();
    // const routeChange4 = () => {
    //     let path4 = `/Pharm`;
    //     navigate4(path4);
    // }

    // let navigate5 = useNavigate();
    // const routeChange5 = () => {
    //     let path5 = `/Patient`;
    //     navigate5(path5);
    // }

    let navigate6 = useNavigate();
    const routeChange6 = () => {
        let path6 = `/LoginPage`;
        navigate6(path6);
    }

    return (
        <div className="button-container">
            <button className="button" onClick={routeChange1}>Register as a pharmacist</button>
            <button className="button" onClick={routeChange2}>Register as a patient</button>
            {/* 
            <button className="button" onClick={routeChange3}>Login as admin</button>
            <button className="button" onClick={routeChange4}>Login as pharmacist</button>
            <button className="button" onClick={routeChange5}>Login as patient</button> 
            */}
            <button className="button" onClick={routeChange6}>Login</button>
            <a href="/ResetPass">Forgot your password?</a>
        </div>
    );
}