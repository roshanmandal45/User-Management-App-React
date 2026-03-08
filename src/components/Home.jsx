import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      
      
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        
        /* Decorative blobs */
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[36rem] h-[28rem] bg-gradient-to-r from-amber-200/30 to-rose-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-72 h-72 bg-blue-100/20 rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-semibold text-sm tracking-wide uppercase">
                User Management System 2.0
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Manage users with clarity,
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-rose-600">
                  speed & style
                </span>
              </h1>

              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Onboard, organize and analyze your user base — beautiful avatars, roles, and realtime stats in a single elegant dashboard.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center lg:justify-start">
                <Link
                  to="/users"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md w-full sm:w-auto text-center"
                >
                  Explore Users
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold rounded-lg w-full sm:w-auto text-center"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full font-semibold text-green-600">+6.8%</div>
                  <div>Monthly growth</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full font-semibold text-blue-600">12.4k</div>
                  <div>Total users</div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full font-semibold text-purple-600">132</div>
                  <div>New today</div>
                </div>
              </div>
            </div>

            {/* Right: Compact dashboard preview */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-gray-800/60 rounded-3xl p-6 shadow-xl border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Active now</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">4,218</div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Updated 2m ago</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/48?img=5" alt="Aisha" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Aisha Thompson</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">aisha@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-full">Admin</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last active: 2h ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-gray-900/40 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/48?img=8" alt="Miguel" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Miguel Santos</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">miguel@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-full">Member</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last active: yesterday</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors">
                    <img className="w-12 h-12 rounded-full object-cover" src="https://i.pravatar.cc/48?img=12" alt="Lena" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Lena Müller</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">lena@example.com</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 rounded-full">Guest</div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last active: 3d ago</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Team trust</div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full shadow-sm">Company-ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
