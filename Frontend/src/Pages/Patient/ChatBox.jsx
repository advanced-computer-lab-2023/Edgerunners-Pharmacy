import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const ChatBox = (props) => {
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const fetchChatMessages = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getChat", {
                params: {
                    PatientUsername: props.sender,
                    DoctorUsername: props.receiver,
                },
            });

            if (response.data.data) {
                setChatMessages(response.data.data.Messages);
            } else {
                console.error(response.data.message);
            }
            console.log(response.data.data.Messages);
        } catch (error) {
            console.error("Error fetching chat messages:", error);
        }
    };

    fetchChatMessages();

    const sendMessage = async (sender, receiver) => {
        try {
            console.log(sender);
            console.log(receiver);
            await axios.put("http://localhost:3001/sendChatPatient", {
                PatientUsername: props.sender,
                DoctorUsername: props.receiver,
                message: message,
            });
            setMessage(""); // Clear the message input after sending
            fetchChatMessages(); // Refresh chat messages
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div>
            <div className="chat-header"></div>

            <div className="">
                <div className="mt-6">
                    <h2 className="flex text-5xl ml-4 mb-2">Chat with {props.receiver}</h2>
                    <div className="ml-4 "
                        style={{
                            padding: "10px",
                            height: "380px",
                            overflowY: "auto",
                        }}>
                        <label className="mt-2"> {chatMessages.length &&
                            chatMessages.map((chat, index) => (
                                <div className="text-white bg-gray-400 rounded-md mt-2 h-10 " key={index}>{chat}</div>
                            ))}
                        </label>
                    </div>
                </div>
                <div className="justify-center mt-4">
                    <input className="text-gray-400 outline w-80 h-10 rounded-md -mt-48 shadow ml-4"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        className="bg-sky-600 text-white w-40 h-10 rounded-md ml-4"
                        onClick={() => {
                            sendMessage(props.sender, props.receiver);
                        }}
                    ><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;