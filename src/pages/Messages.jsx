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
    <div className="h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="mx-auto w-full max-w-6xl h-[92vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden grid grid-cols-12">
        /* Left: Participants */
          <aside className="col-span-3 border-r border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700 dark:text-gray-200">Participants</h4>
              <span className="text-xs text-gray-400">{messages.length}</span>
            </div>

            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="overflow-auto space-y-3 mt-2">
              {(() => {
                const participants = Object.values(
                  messages.reduce((acc, m) => {
                    const key =
                      m.uid ||
                      m.id ||
                      m.displayName ||
                      m.text?.slice(0, 10) ||
                      Math.random().toString();
                    // keep the most recent message per participant and count messages
                    if (
                      !acc[key] ||
                      (m.createdAt?.seconds || 0) >
                        (acc[key].createdAt?.seconds || 0)
                    ) {
                      acc[key] = { ...m, count: (acc[key]?.count || 0) + 1 };
                    } else {
                      acc[key].count = (acc[key].count || 0) + 1;
                    }
                    return acc;
                  }, {})
                ).sort(
                  (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
                );

                return participants.map((p) => {
                  const lastSeconds = p.createdAt?.seconds || 0;
                  const lastDate = lastSeconds ? new Date(lastSeconds * 1000) : null;
                  const minutesAgo = lastDate
                    ? (Date.now() - lastDate.getTime()) / 60000
                    : Infinity;
                  const online = minutesAgo <= 5; // consider "online" if last message within 5 minutes

                    return (
                    <div
                      key={p.id || p.uid || p.displayName}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer transition"
                    >
                      <div className="relative flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden ring-2 ${
                        online ? "ring-green-300" : "ring-gray-200 dark:ring-gray-700"
                        }`}
                      >
                        <img
                        src={
                          p.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          p.displayName || "User"
                          )}&background=random`
                        }
                        alt="avatar"
                        className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-1 ring-white ${
                        online ? "bg-green-400" : "bg-gray-400"
                        }`}
                        title={online ? "Active recently" : "Offline"}
                      />
                      </div>

                      <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {p.displayName || p.uid || "User"}
                        </div>

                        {online ? (
                          <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                          Online
                          </span>
                        ) : (
                          <div className="text-[11px] text-gray-400 truncate">
                          {lastDate
                            ? `${Math.max(0, Math.floor(minutesAgo))}m ago`
                            : "No activity"}
                          </div>
                        )}
                        </div>

                        <div className="text-xs text-gray-400 whitespace-nowrap">
                        {lastDate
                          ? lastDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : ""}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1 italic">
                        {p.text ? p.text.slice(0, 70) : "No recent messages"}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                        <div className="flex items-center gap-2">
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          {p.count || 1} msg{(p.count || 1) > 1 ? "s" : ""}
                        </span>
                        <span className="hidden sm:inline">ID: {String(p.uid || p.id || "").slice(0, 8)}</span>
                        </div>

                        <button
                        type="button"
                        className="text-xs text-indigo-600 hover:underline px-2 py-1 rounded-md"
                        title="Start a direct chat"
                        >
                        Message
                        </button>
                      </div>
                      </div>
                    </div>
                    );
                });
              })()}

              {messages.length === 0 && (
                <div className="text-sm text-gray-400">No participants yet</div>
              )}
            </div>
          </aside>
                const key = m.uid || m.id || m.displayName || Math.random().toString();
                if (!acc[key]) acc[key] = m;
                return acc;
               {}
            .map((p)
              <div
                key={p.id || p.uid}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <img
                  src={
                    p.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      p.displayName || "User"
                    )}&background=random`
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {p.displayName || "User"}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {p.text?.slice(0, 40) || "No messages yet"}
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {p.createdAt?.seconds
                    ? new Date(p.createdAt.seconds * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>
            )
            {messages.length === 0 && (
              <div className="text-sm text-gray-400">No participants yet</div>
            )}
          </div>
        </aside>

        {/* Center: Chat */}
        <main className="col-span-7 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                💬 Community Chat
              </h3>
              <p className="text-xs text-gray-400">Be kind — this is a friendly space</p>
            </div>
            <div className="text-sm text-gray-500">{user?.name || user?.email || "Guest"}</div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            {loading ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading conversation...
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                <p className="text-sm">No messages yet.</p>
                <p className="text-xs">Be the first to say hello 👋</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = user && (msg.uid === user.uid || msg.uid === user.id);
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-3 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={
                          msg.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            msg.displayName || "User"
                          )}&background=random`
                        }
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    )}

                    <div className="max-w-[75%]">
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm break-words shadow-sm ${
                          isMe
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-br-none"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700"
                        }`}
                      >
                        {!isMe && (
                          <div className="text-[11px] font-semibold text-indigo-600 mb-1">
                            {msg.displayName || "User"}
                          </div>
                        )}
                        <div className="leading-relaxed">{msg.text}</div>
                        <div
                          className={`text-[10px] mt-2 text-right ${
                            isMe ? "text-white/70" : "text-gray-400"
                          }`}
                        >
                          {msg.createdAt?.seconds
                            ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Just now"}
                        </div>
                      </div>
                    </div>

                    {isMe && (
                      <img
                        src={
                          msg.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            msg.displayName || "You"
                          )}&background=random`
                        }
                        alt="avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    )}
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input (floating style) */}
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                title="Attach"
              >
                📎
              </button>

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message and press Enter..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />

              <button
                type="submit"
                disabled={!message.trim()}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm transition disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </main>

        {/* Right: Info / Tips */}
        <aside className="col-span-2 border-l border-gray-100 dark:border-gray-800 p-4">
          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Tips</h5>
          <ul className="mt-3 text-xs text-gray-500 space-y-2">
            <li>Be respectful and helpful.</li>
            <li>Use clear messages and avoid spam.</li>
            <li>Click a participant to view recent messages.</li>
          </ul>

          <div className="mt-6 text-xs text-gray-400">
            <div>Connected as</div>
            <div className="mt-2 font-medium text-gray-700 dark:text-gray-100">
              {user?.name || user?.email || "Guest"}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
