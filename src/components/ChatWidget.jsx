import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, Loader2, Trash2 } from 'lucide-react';

const N8N_WEBHOOK_URL = "https://n8n-service-mwec.onrender.com/webhook/chat";
const STORAGE_KEY = 'dental_chat_messages';
const SESSION_KEY = 'dental_chat_session';
const EXPIRY_DAYS = 7;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // سنستخدم هذا للتحكم في ارتفاع صندوق النص

  // Initialize session and load messages from localStorage
  useEffect(() => {
    initializeChat();
  }, []);

  // --- وظيفة جديدة: تعديل ارتفاع صندوق النص تلقائياً ---
  useEffect(() => {
    if (inputRef.current) {
      // إعادة تعيين الارتفاع للسماح بالتقليص عند مسح النص
      inputRef.current.style.height = 'auto';
      // تعيين الارتفاع الجديد بناءً على المحتوى (بحد أقصى 120px سيتم تحديده في CSS)
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const initializeChat = () => {
    let storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      try {
        const sessionData = JSON.parse(storedSession);
        const now = new Date().getTime();
        const expiryTime = sessionData.timestamp + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        
        if (now < expiryTime) {
          setSessionId(sessionData.id);
        } else {
          createNewSession();
          clearOldMessages();
        }
      } catch (e) {
        createNewSession();
      }
    } else {
      createNewSession();
    }

    loadMessagesFromStorage();
  };

  const createNewSession = () => {
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const sessionData = {
      id: newSessionId,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    setSessionId(newSessionId);
  };

  const loadMessagesFromStorage = () => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages);
        const now = new Date().getTime();
        
        const validMessages = parsedMessages.filter(msg => {
          const msgTime = new Date(msg.timestamp).getTime();
          const expiryTime = msgTime + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
          return now < expiryTime;
        });

        if (validMessages.length > 0) {
          const messagesWithDates = validMessages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        } else {
          addWelcomeMessage();
        }
      } else {
        addWelcomeMessage();
      }
    } catch (e) {
      console.error('Error loading messages:', e);
      addWelcomeMessage();
    }
  };

  const addWelcomeMessage = () => {
    const welcomeMsg = {
      sender: 'bot',
      text: 'Welcome to our dental clinic! \nHow can I help you today?',
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    saveMessagesToStorage([welcomeMsg]);
  };

  const saveMessagesToStorage = (messagesToSave) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave));
    } catch (e) {
      console.error('Error saving messages:', e);
    }
  };

  const clearOldMessages = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearOldMessages();
      createNewSession();
      addWelcomeMessage();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage(messages);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading) return;

    const userMessage = {
      sender: 'user',
      text: trimmedMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // إعادة تعيين ارتفاع الصندوق يدوياً بعد الإرسال
    if (inputRef.current) {
        inputRef.current.style.height = 'auto';
    }

    setIsLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': sessionId
        },
        body: JSON.stringify({
          message: trimmedMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        sender: 'bot',
        text: data.reply || 'Sorry, there was a connection error.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Connection error:', error);
      
      let errorMessage = 'Sorry, I couldn\'t connect to the server.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network.';
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `⚠️ ${errorMessage}\n\nYou can call us directly at: 0123456789`,
        timestamp: new Date(),
        isError: true
      }]);
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // تم التعديل لدعم Shift+Enter للنزول لسطر جديد
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // منع النزول لسطر جديد عند الضغط على Enter فقط
      handleSendMessage();
    }
    // إذا ضغط Shift+Enter، سيعمل السلوك الطبيعي (سطر جديد)
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const msgDate = new Date(date);
    
    if (msgDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return msgDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="font-sans">
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-emerald-500 hover:bg-emerald-600'
        } text-white font-semibold`}
      >
        {isOpen ? (
          <>
            <X size={20} />
            <span>Close</span>
          </>
        ) : (
          <>
            <MessageCircle size={20} />
            <span>Chat with us</span>
          </>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[380px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 animate-slideUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-5 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
             🦷
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Dental Assistant</h3>
              <p className="text-sm opacity-90">Online now</p>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Clear chat history"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                <div className="flex items-center justify-center my-4">
                  <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {date}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {msgs.map((msg, index) => (
                    <div
                      key={`${date}-${index}`}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-emerald-500 text-white rounded-br-sm'
                            : msg.isError
                            ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-sm'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`text-xs mt-1 block ${
                          msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mt-3">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-emerald-500" />
                  <span className="text-sm text-gray-600">Typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area - تم تحديثه بالكامل */}
          <div className="p-4 bg-white border-t border-gray-200">
            {error && (
              <div className="mb-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex gap-2 items-end"> 
              {/* items-end: لجعل الزر يبقى في الأسفل عندما يكبر الصندوق */}
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                disabled={isLoading}
                rows={1}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none overflow-y-auto min-h-[44px] max-h-[120px]"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-emerald-500 text-white p-3 rounded-full hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 h-[46px] w-[46px] flex items-center justify-center flex-shrink-0 mb-[1px]"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;
