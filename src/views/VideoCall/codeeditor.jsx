import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatSocket, setChatSocket] = useState(null); // Use state to track the WebSocket connection
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setTabSwitchCount(prevCount => prevCount + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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

    axios.post('https://api.interv.co.in/chat/execute/', { code })
      .then(response => {
        console.log(response.data.output);
        // Handle the output as needed
      })
      .catch(error => {
        console.error('Error executing code:', error);
        // Handle errors
      });
  };

  return (
    <div class="">
      <div class="relative h-screen text-white bg-gray-900 dark:bg-gray-800 dark:text-gray-200">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="flex flex-col justify-between h-full w-full">
            <Editor
              class="flex-grow"
              height="calc(100vh - 2rem)"
              width="calc(100vw - 2rem)"
              defaultLanguage="python"
              defaultValue="#some comment"
              theme="vs-dark"
            />
            <button
              class="relative self-end px-4 py-2 mb-6 mr-4 font-bold text-white bg-blue-500 rounded bottom-20 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <p className="mt-2 text-center">Tab Switch Count: {tabSwitchCount}</p> */}
    </div>


  );
};

export default CodeEditor;
