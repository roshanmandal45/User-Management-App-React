import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-900 pt-16 pb-8 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link to="/docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="https://api.usermapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                API
              </a>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
                <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <rect width="48" height="48" rx="10" fill="url(#g1)" />
                  <path d="M14 32v-16h8l6 8-6 8h-8z" fill="white" opacity="0.95" />
                  </svg>
                  <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  UserMApp
                  </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Elevating user management with style and precision. Build better teams, faster — secure, auditable, and delightful.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full">SSO</span>
                  <span className="px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-full">RBAC</span>
                  <span className="px-2 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full">Audit Logs</span>
                  <span className="px-2 py-1 text-xs bg-yellow-50 dark:bg-yellow-900/10 text-yellow-600 rounded-full">Real-time</span>
                </div>

                <div className="flex gap-3 items-center">
                  <Link to="/demo" className="text-sm px-3 py-2 bg-white/90 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition">
                  Try Demo
                  </Link>
                  <Link to="/docs" className="text-sm px-3 py-2 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                  Docs
                  </Link>
                </div>

                <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
                  <div>
                  Contact: <a href="mailto:hello@usermapp.com" className="text-blue-600 dark:text-blue-400 hover:underline">hello@usermapp.com</a>
                  </div>
                  <div>
                  Phone: <a href="tel:+1234567890" className="text-gray-500 dark:text-gray-400 hover:text-blue-400">+1 (234) 567-890</a>
                  </div>
                </div>

                <div className="flex gap-4"> {/* Social Icons */}
              {['github', 'twitter', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-50" /> 
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</Link></li>
              <li><Link to="/users" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Users</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-gray-900 dark:text-white transition-colors"
              />
              <button className="px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} User Management App. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
