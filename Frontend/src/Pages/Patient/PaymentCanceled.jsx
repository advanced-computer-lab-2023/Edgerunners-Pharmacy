import React from 'react'
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";

function PaymentCanceled() {
    return (
        <div>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div className="justify-center flex mb-4">
                <a href="/Patient">
                    <Logo />
                </a>
            </div>
            <div className='text-center mt-40'>
                <h1>Payment Canceled</h1>
                <h3 className='text-xl'>You can close this page now.</h3>
            </div>
        </div>
    )
}

export default PaymentCanceled