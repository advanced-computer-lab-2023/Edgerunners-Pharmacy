import React from 'react'
import Logo from "../../UI/Logo";
import Sidebar from "../../Components/SidebarPatient";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function PaymentCanceled() {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                let username = sessionStorage.getItem("Username");

                const res = await axios.put("http://localhost:3001/popOrder", { username });

                console.log('Data fetched successfully:', res.data);

            } catch (error) {
                // Log the error details
                console.error('Error fetching cart data:', error);

                // If you want to handle the 404 error specifically
                if (error.response && error.response.status === 404) {
                    console.error('User not found');
                    // Redirect to an error page or handle appropriately
                }
            }
        }

        fetchData();
    }, []);

    const goToPaymentCanceled = () => {
        navigate('/PaymentCanceled');
    };


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
                <h3 className='text-xl'>You can go back <a href="/ViewMedPatient">here</a>.</h3>
            </div>
        </div>
    )
}

export default PaymentCanceled