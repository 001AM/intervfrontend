import React, { useState, useEffect } from 'react';
import { CiMicrophoneOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { FaPhoneSlash } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Editor from '@monaco-editor/react';
import axios from 'axios';
const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatSocket, setChatSocket] = useState(null); // Use state to track the WebSocket connection

    useEffect(() => {
        const url = 'ws://216.10.251.147:8000/ws/room/?room_id=5';
        const socket = new WebSocket(url);

        // Set the WebSocket connection to state
        setChatSocket(socket);

        socket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log('Data:', data);
            setMessages([...messages, data]);

        };

        return () => {
            socket.close();
        };
    }, [messages]); // Include messages in the dependency array to reflect the updated state

    const sendMessage = () => {
        if (chatSocket && message.trim() !== '') {
            // Sending message through WebSocket
            chatSocket.send(JSON.stringify({ type: 'chat', message: message, "sender_id": 5, "room_id": 5 }));
            setMessage('');
        }
    };    
    const handleSubmit = () => {
        const code = {
            content: `
              # Your Python code here
              print("Hello, World!")
            `,
        };
          
        axios.post('http://216.10.251.147:8000/chat/execute/', { code })
        .then(response => {
            console.log(response.data.output);
            // Handle the output as needed
        })
        .catch(error => {
            console.error('Error executing code:', error);
            // Handle errors
        });
    }
    return (
        <>
            <div className='grid h-auto grid-cols-4 gap-4 m-5' >
            <div className={`${chatSocket ? "col-span-3" : "col-span-4"} grid grid-cols-2 gap-5 rounded ${chatSocket ? "mx-10" : "mx-60"} my-10 h-92 `}>
                <Editor height="60vh" width='80vh' defaultLanguage="python" defaultValue="#some comment" />
                <button onClick={handleSubmit}>Submit</button>
            </div>
                <div className={`border-2 border-black my-10  ${chatSocket ? "" : "hidden"} flex flex-col justify-end px-3 rounded-3xl`}>
                    {messages.map((msg, index) => (
                        <div key={index} className='m-2'>
                            <h1 className='font-bold'>{msg.sender_name}</h1>
                            <h1>{msg.message}</h1>
                        </div>
                    ))}
                    <div className='flex flex-row gap-3'>
                        <input
                            type="text"
                            placeholder='Send a message'
                            className='rounded-3xl'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            // onClick={(e) => {
                            //     if (e.key === 'Enter') {
                            //         sendMessage();
                            //     }
                            // }}
                        />
                        <button onClick={sendMessage} className='mb-2 rounded-3xl '>Send</button>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-0 left-0 right-0 flex flex-row items-center justify-between p-2'>
                <div>
                    7:50
                </div>
                <div className='flex justify-center gap-5'>
                    <div className=''>
                        <button className='mx-3 size-3xl'><CiMicrophoneOn /></button>
                        <button className='mx-3 size-3xl'><CiVideoOn /></button>
                        <button className='mx-3 bg-red-700 size-3xl'><FaPhoneSlash className='mx-6' /></button>
                    </div>
                </div>
                <div className='flex-row-reverse base w-100 '>
                    <button onClick={sendMessage} className='mx-4 '><MdMessage /></button>
                </div>
            </div>
        </>
    );
};

export default Chat;
