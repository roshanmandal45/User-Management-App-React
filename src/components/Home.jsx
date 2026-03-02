import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide uppercase">
              User Management System 2.0
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Manage Users with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Speed & Style
              </span>
            </h1>
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Powerful tools to onboard, manage and analyze your users — analytics, roles, and avatars all in one elegant UI.
              </p>
              <div className="mt-6">
                I need more specific guidance! "Change something" is too vague. Here are some suggestions:

                1. **Simplify the search bar** – remove the role filter dropdown
                2. **Change button styling** – use different colors or sizes
                3. **Reorganize layout** – stack elements differently on mobile
                4. **Update placeholder text** – make it more concise
                5. **Remove the "Add User" button** – keep just the search
                6. **Make it more compact** – reduce padding/spacing

                Could you clarify what you'd like changed? For example:
                - "Make the search bar simpler"
                - "Change the button colors to green"
                - "Remove the role filter dropdown"
                - "Make it take up less vertical space"

                Let me know and I'll update the code!}
                <div className="mt-6 mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-3 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full ring-1 ring-white dark:ring-gray-900 object-cover" src="https://i.pravatar.cc/48?img=5" alt="user-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Aisha Thompson</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">aisha@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">Admin</div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Last active: 2h ago</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-3 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full ring-1 ring-white dark:ring-gray-900 object-cover" src="https://i.pravatar.cc/48?img=8" alt="user-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Miguel Santos</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">miguel@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full">Member</div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Last active: yesterday</div>
                    </div>
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-3 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full ring-1 ring-white dark:ring-gray-900 object-cover" src="https://i.pravatar.cc/48?img=12" alt="user-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Lena Müller</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">lena@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full">Guest</div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Last active: 3d ago</div>
                    </div>
                  </div>
                </div>

                {/* Micro-metrics row */}
                <div className="mt-6 mx-auto max-w-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Monthly growth</div>
                    <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-semibold text-green-600 dark:text-green-300 shadow-sm">+6.8%</div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3l2 2" /></svg>
                    <div>Average session 5m 12s</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Verified</div>
                    <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs rounded-full flex items-center gap-1 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      Company-ready
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
                  <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5V8a2 2 0 00-2-2h-3M2 20h5V4a2 2 0 012-2h6a2 2 0 012 2v16" /></svg>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">12.4k</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">98%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Active Weekly</div>
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">132</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">New Today</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://i.pravatar.cc/40?img=1" alt="avatar1" />
                  <img className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://i.pravatar.cc/40?img=2" alt="avatar2" />
                  <img className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://i.pravatar.cc/40?img=3" alt="avatar3" />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Trusted by teams at startups and enterprises worldwide
                </div>
              </div>
            </>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A precise, secure, and beautiful way to manage your user base. track stats, names, emails, and avatars with our modern dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/users" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Users
              </Link>
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold rounded-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-800  dark:hover:bg-gray-750  transition-colors duration-300 border border-transparent hover:border-blue-200 dark:hover:border-blue-9">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Comprehensive User Data</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                View detailed profiles including names, emails, contact info, and avatars in a unified interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-800  dark:hover:bg-gray-750 transition-colors duration-300 border border-transparent hover:border-purple-200 dark:hover:border-purple-900">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">24/7 Support Chat</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Instant help with our new integrated chat widget. Connect with support or other admins instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750 transition-colors duration-300 border border-transparent hover:border-green-200 dark:hover:border-green-900">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Secure & Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Built with React and Vite for blazing fast performance, secured with Firebase authentication.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
