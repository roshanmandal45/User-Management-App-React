import React, { useState, useEffect, useRef } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Messages() {
  const [message, setMessage] = useState("");
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

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(fetchedMessages);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user?.uid || user?.id || "unknown",
        displayName: user?.name || "User",
        photoURL: user?.photo || null,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl h-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
          <h3 className="font-semibold text-lg tracking-wide flex items-center gap-2">
            💬 Community Chat
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth">

          {loading ? (
            <div className="flex justify-center items-center h-full text-gray-400">
              Loading conversation...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <p>No messages yet.</p>
              <p>Start the conversation 🚀</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe =
                user && (msg.uid === user.uid || msg.uid === user.id);

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 animate-fadeIn ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar */}
                  {!isMe && (
                    <img
                      src={
                        msg.photoURL ||
                        `https://ui-avatars.com/api/?name=${msg.displayName}`
                      }
                      alt="avatar"
                      className="w-9 h-9 rounded-full object-cover shadow-md"
                    />
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm shadow-md transition-all duration-300 ${
                      isMe
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs font-semibold text-indigo-500 mb-1">
                        {msg.displayName}
                      </p>
                    )}

                    <p className="break-words leading-relaxed">
                      {msg.text}
                    </p>

                    {msg.createdAt && (
                      <p
                        className={`text-[10px] mt-2 text-right ${
                          isMe
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.createdAt?.seconds
                          ? new Date(
                              msg.createdAt.seconds * 1000
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just now"}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-blue-500 rounded-full px-6 py-3 text-base text-gray-900 dark:text-white focus:outline-none shadow-sm transition-all duration-300"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50"
            >
              🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
