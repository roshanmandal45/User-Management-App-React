import React, { useState, useEffect, useRef } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setCurrentUser(JSON.parse(userCookie));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

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
        uid: currentUser?.uid || currentUser?.id || "anonymous-" + Date.now(),
        displayName: currentUser?.name || "Guest",
        photoURL: currentUser?.photoURL || null
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-blue-600 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Support Chat
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent bg-gray-50 dark:bg-gray-900/50">
            {loading ? (
              <div className="flex justify-center items-center h-full text-gray-400 text-sm">Loading chat...</div>
            ) : messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-2">
                  <p>No messages yet.</p>
                  <p>Need help? Ask us anything! 👋</p>
               </div>
            ) : (
              messages.map((msg) => {
                // Check if the message is from the current user
                // We use looser equality here or rely on name/id if uid is inconsistent
                const isMe = (currentUser && (msg.uid === currentUser.uid || msg.uid === currentUser.id));
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                      isMe 
                        ? "bg-blue-600 text-white rounded-br-none" 
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                    }`}>
                      {!isMe && <p className="text-[10px] text-blue-500 font-bold mb-0.5">{msg.displayName}</p>}
                      <p>{msg.text}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {currentUser ? (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none transition-colors placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg hover:shadow-blue-600/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            ) : (
               <div className="text-center p-2">
                  <p className="text-xs text-gray-500 mb-2">Please login to chat support</p>
                  <a href="/login" className="text-xs px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">Login Here</a>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
