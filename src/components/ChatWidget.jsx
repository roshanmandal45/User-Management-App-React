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
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setCurrentUser(JSON.parse(userCookie));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isOpen) return;

    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(200)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetched);
      setLoading(false);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    setIsSending(true);

    try {
      await addDoc(collection(db, 'messages'), {
        text,
        createdAt: serverTimestamp(),
        uid: currentUser?.uid || 'guest',
        displayName: currentUser?.name || 'Guest'
      });
      setMessage('');
    } catch (err) {
      console.error(err);
    }

    setIsSending(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg"
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-xl shadow-2xl flex flex-col h-[450px]">

          {/* Header */}
          <div className="p-3 bg-blue-600 text-white flex justify-between">
            <span>Support Chat</span>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="bg-gray-100 p-2 rounded-lg text-sm">
                  <strong>{msg.displayName}</strong>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-full px-3 py-1"
              placeholder="Type..."
            />
            <button
              disabled={!message.trim() || isSending}
              className="bg-blue-600 text-white px-3 rounded-full"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
