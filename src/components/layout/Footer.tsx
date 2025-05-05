import React, { useState, useRef } from 'react';
import { Paperclip, Send, X, Loader2 } from 'lucide-react';
import axios from 'axios';

type AIResponse = {
  response?: string;
  data?: any;
  status?: string;
};

type ResponseData = string | Record<string, any>;

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
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Array<{prompt: string, response: ResponseData}>>([]);
  const dialogInputRef = useRef<HTMLInputElement>(null);

  const formatJSON = (json: any): string => {
    return JSON.stringify(json, null, 2);
  };

  const sendPrompt = async (promptMessage: string) => {
    if (promptMessage.trim()) {
      setIsLoading(true);
      setError(null);
      setJsonResponse(null);
      setAiResponse('');
      
      try {
        const response = await axios.post<AIResponse>(
          'http://127.0.0.1:5002/reports',
          { prompt: promptMessage },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzc3NDg5MTcsInVzZXIiOnsiaWQiOiI2NzkyOWQ1ODlhY2JjYmIzZTY3ODk1MWEiLCJ1c2VybmFtZSI6IkpvaG4gRG9lcyIsImZ1bGxOYW1lIjoiSm9obiBEb2VzIiwiZW1haWwiOiJqb2huLmRvZUBkdW5uby5jb20iLCJtb2JpbGUiOiIxMjM0NTY3ODkwIiwib3RwVmVyaWZpZWQiOmZhbHNlLCJicmFuY2hJZHMiOltdLCJyb2xlcyI6W10sImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDI1LTAxLTIzVDE5OjQ5OjQ0LjExWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDEtMjNUMTk6NDk6NDQuMTFaIn19.NN7jcc8iBrz5ccYhpGmOLuCz1lANMJyGWl9DC7C5Wu8'
            }
          }
        );
        
        // Handle different response formats
        let responseData: ResponseData;
        if (response.data && (response.data.data || response.data.status)) {
          setJsonResponse(response.data);
          responseData = response.data;
        } else if (typeof response.data === 'string') {
          setAiResponse(response.data);
          responseData = response.data;
        } else if (response.data && response.data.response) {
          setAiResponse(response.data.response);
          responseData = response.data.response;
        } else {
          responseData = 'No response data received';
        }
        
        // Add to conversation history
        setConversationHistory(prev => [
          ...prev,
          { prompt: promptMessage, response: responseData }
        ]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setError('Sorry, there was an error processing your request.');
      } finally {
        setIsLoading(false);
        setDialogMessage('');
        
        // Focus the dialog input field after response
        setTimeout(() => {
          if (dialogInputRef.current) {
            dialogInputRef.current.focus();
          }
        }, 100);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsDialogOpen(true);
      const currentMessage = message;
      setMessage('');
      sendPrompt(currentMessage);
    }
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendPrompt(dialogMessage);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setMessage('');
    setDialogMessage('');
    setError(null);
    setConversationHistory([]);
  };

  const renderResponse = () => {
    if (jsonResponse) {
      return (
        <div className="prose prose-lg max-w-none">
          <pre className="bg-black-600 p-4 rounded-lg border border-gray-200 overflow-auto text-sm">
            <code>{formatJSON(jsonResponse)}</code>
          </pre>
        </div>
      );
    } else if (aiResponse) {
      return (
        <div className="prose prose-lg max-w-none prose-headings:text-purple-900 prose-a:text-purple-600 prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg">
          <div className="text-gray-700 whitespace-pre-wrap">{aiResponse}</div>
        </div>
      );
    }
    return null;
  };

  const renderConversationHistory = () => {
    if (conversationHistory.length === 0) return null;
    
    return (
      <div className="mb-4 space-y-6">
        {conversationHistory.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-medium text-purple-800">You asked:</p>
              <p className="text-gray-700">{item.prompt}</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <p className="font-medium text-gray-800 mb-2">AI response:</p>
              {typeof item.response === 'string' ? (
                <div className="text-gray-700 whitespace-pre-wrap">{item.response}</div>
              ) : (
                <pre className="bg-black-600 p-4 rounded-lg border border-gray-200 overflow-auto text-sm">
                  <code>{formatJSON(item.response)}</code>
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      {/* AI Response Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-[80%] h-[80%] max-h-[80vh] overflow-hidden flex flex-col shadow-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800">AI Conversation</h2>
              </div>
              <button 
                onClick={closeDialog} 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-auto">
              {renderConversationHistory()}
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-24">
                  <Loader2 className="w-12 h-12 text-purple-900 animate-spin" />
                  <p className="mt-4 text-gray-600 text-lg">Processing your request...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              ) : (conversationHistory.length === 0 && (renderResponse()))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleDialogSubmit} className="flex items-center gap-2">
                <input
                  ref={dialogInputRef}
                  type="text"
                  value={dialogMessage}
                  onChange={e => setDialogMessage(e.target.value)}
                  placeholder="Ask another question..."
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  disabled={!dialogMessage.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sticky chat input */}
      <div className="bg-white border-t border-gray-200 p-2 bottom-0 left-0 right-0">
        <div className="mx-3 px-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border-[1px] border-solid border-[#BBBBBB]"
          >
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
              onChange={e => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
            />

            <button
              type="submit"
              className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
