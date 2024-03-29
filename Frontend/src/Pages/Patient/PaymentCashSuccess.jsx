import React from 'react'
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function PaymentCashSuccess() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className='text-center mt-48'>
                <h1>Order is on its way</h1>
                <h3 className='text-xl'>You can track your order from <a className='text-sky-600' href='/ViewOrders'>here.</a></h3>
            </div>
        </div>
    )
}


export default PaymentCashSuccess