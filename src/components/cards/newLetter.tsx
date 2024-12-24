import React from 'react';

export default function NewsletterCard() {
  return (
    <div className="max-w-md p-6 bg-white/80 backdrop-blur-md shadow-lg rounded-lg border border-gray-200 dark:bg-zinc-900/80 dark:border-zinc-700">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to our newsletter!</h2>
        <p className="text-gray-600 dark:text-gray-400">Get updates on new features and blogs.</p>
      </div>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
        />
        <button className="w-full px-4 py-2 font-semibold text-white bg-emerald-500 rounded-md shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
          Subscribe
        </button>
      </div>
    </div>
  );
}
