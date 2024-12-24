import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full px-6 py-12 mt-24 bg-white/80 dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800 shadow-inner backdrop-blur-lg rounded-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">Dashify</h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Creating dynamic and customizable dashboards with ease.</p>
        </div>
        
        {/* Navigation Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Quick Links</h2>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        
        {/* Contact Info and Social Media */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">Contact Us</h2>
          <p className="text-zinc-600 dark:text-zinc-400">123 Dashboard St.<br />Suite 100<br />City, State, 12345</p>
          <p className="text-zinc-600 dark:text-zinc-400">Email: info@example.com<br />Phone: (123) 456-7890</p>
          
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.6,2.8C19.5,2.6,19.3,2.5,19.2,2.4c-0.1,0-0.2,0-0.3,0h-14c-0.3,0-0.6,0.1-0.8,0.3c-0.2,0.2-0.3,0.4-0.3,0.7v18 c0,0.3,0.1,0.6,0.3,0.8c0.2,0.2,0.4,0.3,0.7,0.3h14c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7V3.4C19.7,3.1,19.6,2.9,19.6,2.8 z M17.8,18.2H6.2v-1.7h11.6V18.2z M17.8,15H6.2V6.9h11.6V15z"/></svg>
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.9,8.3c0.5,0.4,1,0.8,1.4,1.3c0.1,0.1,0.2,0.3,0.2,0.4s0,0.3-0.1,0.4c-0.1,0.1-0.2,0.2-0.4,0.2h-4.3 c0,0.1,0,0.1,0,0.2c0,0.7-0.1,1.3-0.2,2c-0.2,1.1-0.5,2.2-1,3.2c-0.5,1-1.2,1.9-2,2.6c-0.8,0.7-1.8,1.3-2.8,1.6 c-1.1,0.4-2.2,0.5-3.4,0.4c-1.3-0.1-2.5-0.4-3.6-1c0.2,0,0.4,0,0.6,0c1.1,0,2.2-0.3,3.2-0.8c-0.9,0-1.7-0.5-2.1-1.3 c0.2,0,0.4,0.1,0.5,0.1c0.3,0,0.7-0.1,1-0.2c-1-0.2-1.8-0.9-2-1.9c0.3,0,0.6,0.2,1,0.2c-1.2-0.8-1.7-2.3-1.2-3.6 c1.2,1.5,2.8,2.5,4.6,2.6c-0.3-1.5,0.6-2.9,2.1-3.2c0.7-0.1,1.3,0,1.9,0.3c0.4-0.1,0.8-0.2,1.1-0.4c0.4-0.2,0.7-0.4,1-0.7 c0.3-0.3,0.5-0.6,0.7-0.9c0.2-0.3,0.3-0.7,0.4-1c0.1-0.3,0.1-0.6,0.2-1C19.9,7.2,20.4,7.7,20.9,8.3z"/></svg>
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.1,3C6.5,3,2,7.5,2,13.1c0,4.1,2.9,7.5,6.7,8.5c0.5,0.1,0.7-0.2,0.7-0.5c0-0.2,0-0.8,0-1.5 c-2.7,0.6-3.2-1.3-3.2-1.3c-0.4-1-1.1-1.3-1.1-1.3c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.6,2.4,1.1,3,0.9 c0.1-0.7,0.3-1.1,0.6-1.3c-2.1-0.2-4.4-1-4.4-4.4c0-1,0.3-1.9,1-2.6C7,9.4,6.7,8.3,7.2,7c0,0,0.8-0.2,2.6,1c0.8-0.2,1.7-0.3,2.6-0.3 c0.9,0,1.8,0.1,2.6,0.3c1.8-1.2,2.6-1,2.6-1c0.5,1.3,0.2,2.4,0.1,2.6c0.7,0.7,1,1.6,1,2.6c0,3.5-2.3,4.3-4.4,4.5 c0.3,0.3,0.6,0.9,0.6,1.8c0,1.3,0,2.4,0,2.7c0,0.3,0.2,0.7,0.7,0.5C19.1,20.6,22,17.2,22,13.1C22,7.5,17.5,3,12.1,3z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-6 text-center text-zinc-600 dark:text-zinc-400">
        &copy; 2024 Your Company. All rights reserved.
      </div>
    </footer>
  );
}
