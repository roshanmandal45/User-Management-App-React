import React, { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Messages() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
        collection(db, "messages"),
        orderBy("createdAt", "asc"),
        limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
            fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(fetchedMessages);
        setLoading(false);
        scrollToBottom();
    }, (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user.uid || user.id || "unknown", // Prefer uid from auth
        displayName: user.name || "User",
        photoURL: user.photo || null
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 h-[calc(100vh-80px)] flex flex-col">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col h-full overflow-hidden border border-gray-200 dark:border-gray-700">
          
          {/* Header */}
          <div className="p-4 bg-blue-600 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Community Chat
            </h3>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent bg-gray-50 dark:bg-gray-900/50">
            {loading ? (
              <div className="flex justify-center items-center h-full text-gray-400">Loading conversation...</div>
            ) : messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <p>No messages yet.</p>
                  <p>Start the conversation! 👋</p>
               </div>
            ) : (
              messages.map((msg) => {
                const isMe = (user && (msg.uid === user.uid || msg.uid === user.id));
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[70%]`}>
                        <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isMe 
                            ? "bg-blue-600 text-white rounded-br-none" 
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                        }`}>
                        {!isMe && <p className="text-[10px] text-blue-500 font-bold mb-0.5">{msg.displayName}</p>}
                        <p className="break-words">{msg.text}</p>
                        </div>
                        {msg.createdAt && (
                           <span className="text-[10px] text-gray-400 mt-1 px-1">
                               {/* Formatting timestamp is complex without external lib, simplistic check */}
                               {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                           </span>
                        )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 rounded-full px-6 py-3 text-base text-gray-900 dark:text-white focus:outline-none transition-colors placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-600/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
          </div>
        </div>
    </div>
  );
}
