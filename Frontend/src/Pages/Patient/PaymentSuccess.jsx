import React from 'react'
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function PaymentSuccess() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="justify-center flex mb-4">
                <a href="/Patient">
                    <Logo height='4rem' className="mt-6 mb-0" />
                </a>
            </div>
            <div className='text-center mt-40'>
                <h1>Payment Successful</h1>
                <h3 className='text-xl'>You can track your order from <a className='text-sky-600' href='/ViewOrders'>here.</a></h3>
            </div>
        </div>
    )
}


export default PaymentSuccess