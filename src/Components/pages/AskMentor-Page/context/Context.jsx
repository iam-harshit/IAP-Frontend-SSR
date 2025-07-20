import React, { createContext, useState, useEffect } from 'react';
import runChat from '../config/Gemini';
import { useSelector } from 'react-redux';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPromptsAndResults, setPrevPromptsAndResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [chats, setChats] = useState([]);

  const userDataFromRedux = useSelector((state) => state.user.currentUser);

  // Load chats from localStorage on initial load
  useEffect(() => {
    if (localStorage.getItem('chat')) {
      const val = JSON.parse(localStorage.getItem('chat'));
      if (val?.userName === userDataFromRedux?.userName && val.chats && val.chats.length > 0) {
        setChats(val.chats);
      } else {
        // Clear local storage if user has changed
        setChats([]);
        localStorage.removeItem('chat');
      }
    } else {
      setChats([]);
    }
  }, [userDataFromRedux]);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(
        'chat',
        JSON.stringify({
          userName: userDataFromRedux?.userName,
          chats: chats,
          currentChat: prevPromptsAndResults.length > 0 ? prevPromptsAndResults : null
        })
      );
    }
  }, [chats, prevPromptsAndResults, userDataFromRedux]);

  // Check for and load unfinished conversation on startup
  useEffect(() => {
    const loadUnfinishedChat = () => {
      if (localStorage.getItem('chat')) {
        const val = JSON.parse(localStorage.getItem('chat'));
        if (val?.currentChat && val.currentChat.length > 0) {
          setPrevPromptsAndResults(val.currentChat);
          setShowResult(true);
          // If there's a question, set it as recentPrompt
          if (val.currentChat[val.currentChat.length - 1]?.question) {
            setRecentPrompt(val.currentChat[val.currentChat.length - 1].question);
          }
        }
      }
    };
    
    // Load unfinished chat on startup
    loadUnfinishedChat();
  }, []);

  // Helper function to update or add current chat to chat history
  const updateChatHistory = (currentChat) => {
    if (!currentChat || currentChat.length === 0) return;
    
    // Check if this chat already exists in history
    const firstQuestion = currentChat[0]?.question;
    if (!firstQuestion) return;
    
    let existingChatIndex = -1;
    
    if (chats.length > 0) {
      existingChatIndex = chats.findIndex(chat => 
        chat[0]?.question === firstQuestion
      );
    }
    
    let newChats;
    if (existingChatIndex >= 0) {
      // Update existing chat
      newChats = [...chats];
      newChats[existingChatIndex] = currentChat;
    } else {
      // Add as new chat
      newChats = [...chats, currentChat];
    }
    
    setChats(newChats);
  };

  const triggerAutoSearch = (query) => {
    setInput(query);
    setTimeout(() => {
      onSent(query); // Delay onSent to ensure input is updated
    }, 100); // 100 ms delay
  };

  
  const onSent = async (finalInput = input) => {
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(finalInput);
    setResultData('');
  
    // Optimistically show "Loading..." immediately
    const loadingMessage = { question: finalInput, answer: "Loading..." };
    const updatedPromptList = [...prevPromptsAndResults, loadingMessage];
    setPrevPromptsAndResults(updatedPromptList);
  
    updateChatHistory(updatedPromptList); // optional, depends on your flow
  
    // Fetch actual response
    const response = await runChat(finalInput);
  
    // Replace the "Loading..." with the real response
    const finalPromptList = updatedPromptList.map(item =>
      item.question === finalInput ? { ...item, answer: response } : item
    );
  
    setPrevPromptsAndResults(finalPromptList);
    updateChatHistory(finalPromptList);
    setResultData(response);
    setLoading(false);
    setInput('');
  };
  
  
  const newChat = () => {
    // No need to handle saving here as it's already saved during interaction
    setPrevPromptsAndResults([]);
    setRecentPrompt('');
    setResultData('');
    setShowResult(false);
  };

  const getLastChat = () => {
    if (chats.length > 0) {
      return chats[chats.length - 1];
    }
    return null;
  };

  const handleCopy = (event) => {
    const copyButton = event.target.closest('.copy-btn');
    
    if (copyButton) {
      const codeId = copyButton.getAttribute('data-code-id');
      if (codeId) {
        const codeElement = document.getElementById(codeId);
        if (codeElement) {
          // Get the text content of the code element
          const textToCopy = codeElement.textContent;
          
          // Use the clipboard API to copy the text
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              // Store the original text
              const originalText = copyButton.textContent;
              
              // Provide visual feedback
              copyButton.textContent = 'Copied!';
              copyButton.classList.add('bg-green-500');
              copyButton.classList.remove('bg-gray-500');
              
              // Reset button after 2 seconds
              setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.classList.remove('bg-green-500');
                copyButton.classList.add('bg-gray-500');
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy:', err);
              
              // Show error feedback
              copyButton.textContent = 'Failed';
              copyButton.classList.add('bg-red-500');
              copyButton.classList.remove('bg-gray-500');
              
              setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.classList.remove('bg-red-500');
                copyButton.classList.add('bg-gray-500');
              }, 2000);
            });
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCopy);
    return () => {
      document.removeEventListener('click', handleCopy);
    };
  }, []);

  // Backup measure: Save current chat state when page unloads
  useEffect(() => {
    const saveBeforeUnload = () => {
      if (prevPromptsAndResults.length > 0) {
        updateChatHistory(prevPromptsAndResults);
        
        localStorage.setItem(
          'chat',
          JSON.stringify({
            userName: userDataFromRedux?.userName,
            chats: chats,
            currentChat: prevPromptsAndResults
          })
        );
      }
    };

    window.addEventListener('beforeunload', saveBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', saveBeforeUnload);
    };
  }, [chats, prevPromptsAndResults, userDataFromRedux]);

  const contextValue = {
    prevPromptsAndResults,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    chats,
    setChats,
    setPrevPromptsAndResults,
    getLastChat,
    triggerAutoSearch,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;