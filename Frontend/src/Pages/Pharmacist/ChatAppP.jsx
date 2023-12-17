// ChatComponent.js
import React, { useState, useEffect } from "react";
import { FetchPatients } from "./fetchChat";
import ChatBox from "./ChatBox";
import SidebarPharm from "../../Components/SidebarPharm";

const ChatApp = () => {
    const [sender, setSender] = useState(sessionStorage.getItem("Username")); // Set the sender's username
    const [receiver, setReceiver] = useState(); // Set the receiver's username

    const [chatMessages, setChatMessages] = useState([]);

    const [isChatOpen, setChatOpen] = useState(false);

    const openChat = () => setChatOpen(true);
    const closeChat = () => setChatOpen(false);

    const d = FetchPatients();
    console.log(d);

    if (d) {
        return (
            <div>
                <SidebarPharm />
                <div className="mt-28 flex flex-wrap ml-4">
                    <select className="outline outline-sky-600 w-60 h-9 mt-0.5 rounded-md"
                        name=""
                        id=""
                        onChange={(e) => {
                            setReceiver(e.target.value);
                        }}
                    >
                        {d.map((doctor, index) => (
                            <option key={index} value={doctor.Username}>
                                {doctor.Username}
                            </option>
                        ))}
                    </select>
                    <button
                        className="justify-end bg-sky-600 text-white w-60 h-10 rounded-md mb-2 ml-4"
                        onClick={() => {
                            openChat();
                        }}
                    >
                        Chat With {receiver}
                    </button>
                </div>
                {isChatOpen ? (
                    <ChatBox
                        chatMessages={chatMessages}
                        receiver={receiver}
                        sender={sender}
                    />
                ) : null}
                <button
                    className="justify-end bg-red-600 text-white w-60 h-10 rounded-md mb-2 mt-4 mr-14 ml-4"
                    onClick={() => {
                        closeChat();
                    }}>
                    Close
                </button>
            </div>
        );
    }
};

export default ChatApp;