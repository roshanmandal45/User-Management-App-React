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
import Cookies from "js-cookie";
// Inject a complete UI override via a scoped stylesheet so the existing JSX renders with a new look/feel.
(function injectChatWidgetOverride() {
  if (typeof document === "undefined") return;
  if (document.getElementById("chatwidget-override-styles")) return;

  const css = `
  /* Target the ChatWidget root (matches the exact class list used in the component) */
  .fixed.bottom-6.right-6.z-50.font-sans {
    inset: 0 !important;
    bottom: auto !important;
    right: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(5, 7, 15, 0.65) !important;
    padding: 24px !important;
    z-index: 9999 !important;
    backdrop-filter: blur(6px);
  }

  /* Hide the original floating button (we'll present a full-screen modal style) */
  .fixed.bottom-6.right-6.z-50.font-sans > button {
    display: none !important;
  }

  /* Restyle the chat window to be a modern, centered modal */
  .fixed.bottom-6.right-6.z-50.font-sans > div {
    width: min(920px, 96%) !important;
    max-width: 920px !important;
    height: min(640px, 92%) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    background: linear-gradient(180deg, #071021 0%, #081426 60%) !important;
    color: #e6eef8 !important;
    box-shadow: 0 20px 50px rgba(2,6,23,0.7) !important;
    border: 1px solid rgba(255,255,255,0.04) !important;
  }

  /* Header: crisp, compact, left aligned title + subtle subtitle */
  .fixed.bottom-6.right-6.z-50.font-sans > div > .p-4 {
    background: linear-gradient(90deg, rgba(6,182,212,0.12), rgba(99,102,241,0.10)) !important;
    color: #eaf6ff !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px;
    padding: 18px !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans > div > .p-4 h3 {
    margin: 0;
    font-size: 14px;
    letter-spacing: -0.2px;
  }
  .fixed.bottom-6.right-6.z-50.font-sans > div > .p-4 p {
    margin: 0;
    font-size: 11px;
    opacity: 0.85;
    color: rgba(230,238,248,0.85);
  }
  .fixed.bottom-6.right-6.z-50.font-sans > div > .p-4 button {
    background: transparent !important;
    color: rgba(230,238,248,0.95) !important;
    font-size: 20px !important;
    border: none !important;
    padding: 6px !important;
    cursor: pointer;
  }

  /* Messages area: make it airy, with glassy backdrop and larger message bubbles */
  .fixed.bottom-6.right-6.z-50.font-sans .flex-1.overflow-y-auto {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent) !important;
    padding: 20px !important;
    gap: 12px !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans .rounded-2xl {
    border-radius: 12px !important;
    box-shadow: none !important;
    padding: 12px 14px !important;
    font-size: 15px !important;
    line-height: 1.35 !important;
  }

  /* Outgoing (me) bubble */
  .fixed.bottom-6.right-6.z-50.font-sans .bg-blue-600 {
    background: linear-gradient(90deg,#06b6d4,#6366f1) !important;
    color: white !important;
    border: none !important;
  }

  /* Incoming bubble */
  .fixed.bottom-6.right-6.z-50.font-sans .bg-white,
  .fixed.bottom-6.right-6.z-50.font-sans .bg-white.dark\\:bg-gray-800 {
    background: rgba(255,255,255,0.03) !important;
    color: rgba(230,238,248,0.95) !important;
    border: 1px solid rgba(255,255,255,0.03) !important;
  }

  .fixed.bottom-6.right-6.z-50.font-sans .text-[10px] {
    color: rgba(230,238,248,0.7) !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans img {
    border-radius: 9999px !important;
    object-fit: cover !important;
  }

  /* Input area: floating glass bar with pill textarea and gradient send */
  .fixed.bottom-6.right-6.z-50.font-sans > div > .p-3.border-t {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)) !important;
    border-top: 1px solid rgba(255,255,255,0.04) !important;
    padding: 16px !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans textarea {
    flex: 1 !important;
    background: rgba(255,255,255,0.02) !important;
    color: #e6eef8 !important;
    padding: 10px 14px !important;
    border-radius: 999px !important;
    border: 1px solid rgba(255,255,255,0.03) !important;
    resize: none !important;
    max-height: 160px !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans button[type="submit"] {
    background: linear-gradient(90deg,#06b6d4,#6366f1) !important;
    color: white !important;
    padding: 8px 14px !important;
    border-radius: 999px !important;
    box-shadow: 0 6px 18px rgba(99,102,241,0.18) !important;
    border: none !important;
    cursor: pointer !important;
  }
  .fixed.bottom-6.right-6.z-50.font-sans .disabled\\:opacity-50[disabled] {
    opacity: 0.45 !important;
    cursor: not-allowed !important;
  }

  /* Small responsive tweak for very small screens */
  @media (max-width: 480px) {
    .fixed.bottom-6.right-6.z-50.font-sans > div {
      width: calc(100% - 32px) !important;
      height: calc(100% - 48px) !important;
      border-radius: 12px !important;
    }
    .fixed.bottom-6.right-6.z-50.font-sans > div > .p-4 {
      padding: 14px !important;
    }
    .fixed.bottom-6.right-6.z-50.font-sans > div > .p-3.border-t {
      padding: 12px !important;
    }
  }
  `;

  const style = document.createElement("style");
  style.id = "chatwidget-override-styles";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Load user from cookie
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setCurrentUser(JSON.parse(userCookie));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Firestore realtime listener
  useEffect(() => {
    if (!isOpen) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(200)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetched);
        setLoading(false);
        scrollToBottom();
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  const formatTime = (ts) => {
    try {
      const date = ts?.toDate ? ts.toDate() : null;
      if (!date) return "";
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    setIsSending(true);

    try {
      await addDoc(collection(db, "messages"), {
        text,
        createdAt: serverTimestamp(),
        uid: currentUser?.uid || "guest",
        displayName: currentUser?.name || "Guest",
        photoURL: currentUser?.photoURL || null,
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsSending(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col h-[520px] overflow-hidden">

          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
            <div>
              <h3 className="font-bold text-sm">Support Chat</h3>
              <p className="text-xs opacity-80">
                We usually reply within minutes
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
            {loading ? (
              <div className="text-center text-gray-400 text-sm">
                Loading...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                No messages yet 👋
              </div>
            ) : (
              messages.map((msg) => {
                const isMe =
                  currentUser &&
                  (msg.uid === currentUser.uid ||
                    msg.uid === currentUser.id);

                const firstLetter = msg.displayName
                  ? msg.displayName.charAt(0).toUpperCase()
                  : "G";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Avatar Left */}
                    {!isMe && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                        {msg.photoURL ? (
                          <img
                            src={msg.photoURL}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          firstLetter
                        )}
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border"
                      }`}
                    >
                      {!isMe && (
                        <p className="text-[10px] font-semibold text-blue-500 mb-1">
                          {msg.displayName}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-[10px] opacity-60 text-right mt-1">
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>

                    {/* Avatar Right (Me) */}
                    {isMe && (
                      <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                        {currentUser?.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          currentUser?.name?.charAt(0)?.toUpperCase() || "Y"
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white dark:bg-gray-900">
            {currentUser ? (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                  placeholder="Type a message..."
                  className="flex-1 resize-none max-h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isSending}
                  className="bg-blue-600 text-white px-4 rounded-full disabled:opacity-50"
                >
                  {isSending ? "..." : "➤"}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Please login to chat
                </p>
                <a
                  href="/login"
                  className="text-xs px-4 py-2 bg-blue-100 text-blue-600 rounded-full"
                >
                  Login Here
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
