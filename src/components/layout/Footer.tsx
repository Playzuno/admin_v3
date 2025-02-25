import React, { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-50 border-t">
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             © {new Date().getFullYear()} MyApp. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <a href="#" className="text-gray-500 hover:text-gray-600">
//               Privacy
//             </a>
//             <a href="#" className="text-gray-500 hover:text-gray-600">
//               Terms
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



function Footer() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      
      
      
      {/* Sticky chat input */}
      <div className="bg-white border-t border-gray-200 p-2  bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border-[1px] border-solid border-[#BBBBBB]">
            <button
              type="button"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Add attachment"
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
            />
            
            <button
              type="submit"
              className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              disabled={!message.trim()}
            >
               <Send className="w-4 h-4" />
              Send
             
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;