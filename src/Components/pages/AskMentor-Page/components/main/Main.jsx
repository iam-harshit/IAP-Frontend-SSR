import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Main.css';
import { assets } from '@/Components/pages/AskMentor-Page/assets/assets';
import { Context } from '@/Components/pages/AskMentor-Page/context/Context';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import '../../../../../index.css';
import { FiSend } from 'react-icons/fi';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    const codeId = `code-${Math.random().toString(36).substring(2, 9)}`;
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `
        <div class='flex flex-col items-start w-full my-0 py-0'>
          <div class='flex justify-between w-full  '>
            <div class='text-gray-600 font-medium'>Code: ${lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : ''}</div>
            <button data-code-id='${codeId}' class='copy-btn bg-gray-500 hover:bg-blue-500 transition-all duration-300 w-16 p-1 text-white rounded-full'>Copy</button>
          </div>  
          <pre class="w-full m-0 p-0"><code id='${codeId}' class="markdown">${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>
        </div>
      `.trim();
      } catch (err) {
        // console.log(err);
      }
    }

    return `
      <div class='flex flex-col items-start w-full my-0 py-0'>
        <div class='flex justify-between w-full mb-1'>
          <div class='text-gray-600 font-medium'>Code:</div>
          <button data-code-id='${codeId}' class='copy-btn bg-gray-500 hover:bg-blue-500 transition-all duration-300 w-16 p-1 text-white rounded-full'>Copy</button>
        </div>  
        <pre class="w-full m-0 p-0 "><code id='${codeId}' class="markdown">${md.utils.escapeHtml(str)}</code></pre>
      </div>
    `.trim();
  },
});

const markdownClasses = {
  '<p>': '<p class="my-[10px] text-gray-800 leading-relaxed">',
  '<h1>': '<h1 class="text-2xl  font-bold">',
  '<h2>': '<h2 class="text-xl   font-semibold">',
  '<h3>': '<h3 class="text-lg  font-medium">',
  '<ul>': '<ul class="ml-5 list-disc">',
  '<ol>': '<ol class="ml-5 list-decimal">',
  '<code>': '<code class="bg-gray-100 rounded text-blue-500">',
  '<a ': '<a class="text-blue-500 hover:underline font-semibold" ',
};

const renderMarkdownWithSpacing = (text) => {
  let renderedText = md.render(text);

  Object.entries(markdownClasses).forEach(([tag, replacement]) => {
    renderedText = renderedText.replace(new RegExp(tag, 'g'), replacement);
  });

  return renderedText;
};

// Moved cardData outside the component to prevent re-creation on each render
const cardData = [
  {
    text: 'Suggest beautiful places to see on an upcoming road trip',
    icon: assets.compass_icon,
    bgColor: 'bg-[#FFE0E9]',
    iconBg: 'bg-[#FFB3C6]',
  },
  {
    text: 'Brainstorm team bonding activities for our work retreat',
    icon: assets.bulb_icon,
    bgColor: 'bg-[#E0F7FA]',
    iconBg: 'bg-[#B2EBF2]',
  },
  {
    text: 'How to Create a Gyroscope using Disc?',
    icon: assets.message_icon,
    bgColor: 'bg-[#FFF3CD]',
    iconBg: 'bg-[#FFE082]',
  },
  {
    text: 'Create a Script for the YouTube video about coding',
    icon: assets.code_icon,
    bgColor: 'bg-[#E6F4EA]',
    iconBg: 'bg-[#C8E6C9]',
  },
];

function Main({ currentUser, isCompressed }) {
  const {
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    prevPromptsAndResults,
    setInput,
    input,
    triggerAutoSearch,
  } = useContext(Context);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const [isFirstPrompt, setIsFirstPrompt] = useState(true);

  useEffect(() => {
    const handleCopyClick = (e) => {
      // Use closest() to find the copy button even if a child element was clicked
      const copyButton = e.target.closest('.copy-btn');

      if (copyButton) {
        const codeId = copyButton.getAttribute('data-code-id');
        if (codeId) {
          const codeElement = document.getElementById(codeId);
          if (codeElement) {
            // Get the text content of the code element
            const textToCopy = codeElement.textContent;

            // Use the clipboard API to copy the text
            navigator.clipboard
              .writeText(textToCopy)
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
              .catch((err) => {
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

    // Add event listener to the document to catch all clicks
    document.addEventListener('click', handleCopyClick);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('click', handleCopyClick);
    };
  }, []);
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [input]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      let maxHeight;
      const width = window.innerWidth;
      if (width < 640) {
        maxHeight = 50;
      } else if (width <= 768) {
        maxHeight = 60;
      } else {
        maxHeight = 60;
      }

      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      setTextareaHeight(`${newHeight}px`);
    }
  };
  useEffect(() => {
    // Adjust height on mount
    adjustTextareaHeight();
    // Adjust height on window resize
    window.addEventListener('resize', adjustTextareaHeight);
    return () => {
      window.removeEventListener('resize', adjustTextareaHeight);
    };
  }, []);
  const handleCardClick = useCallback(
    (cardText) => {
      setSelectedCard(cardText);
      setIsCardLoading(true);
      triggerAutoSearch(cardText);
      setIsInputDisabled(true);
      setIsFirstPrompt(false);
    },
    [triggerAutoSearch]
  ); // Only depends on triggerAutoSearch

  const renderedCards = useMemo(() => {
    return cardData.map((card, index) => (
      <div
        key={index}
        className={`flex flex-col h-[120px]  lg:min-h-[200px] ${card.bgColor} border-none outline-none xl:min-h-[180px] card gap-2 p-3 sm:p-4 rounded-[10px] cursor-pointer hover:scale-105 transition duration-200 w-full`}
        onClick={() => handleCardClick(card.text)}
      >
        <img
          src={card.icon}
          className={`w-[24px] p-[3px] ${card.iconBg} rounded-full shrink-0`}
          alt="icon"
        />
        <p className="text-[#444] text-h5 break-words">{card.text}</p>
      </div>
    ));
  }, [handleCardClick]);

  useEffect(() => {
    if (prevPromptsAndResults.length > 0) {
      const latestResultId = `result-${prevPromptsAndResults.length - 1}`;
      // Set the hash to the latest result ID
      window.location.hash = latestResultId;
      setIsFirstPrompt(false); // No longer the first prompt once we have results
    }
  }, [prevPromptsAndResults]);

  // combined loading effects
  useEffect(() => {
    if (loading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    } else {
      setIsCardLoading(false);
      setIsInputDisabled(false);
    }
  }, [loading]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isInputDisabled) return;

    setIsInputDisabled(true);
    setIsFirstPrompt(false);
    setRecentPrompt(trimmedInput);

    try {
      await onSent();
    } catch (error) {
      console.error('Failed to send prompt:', error);
    } finally {
      setIsInputDisabled(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled && input.trim()) {
      e.preventDefault(); // Prevent default to avoid new line
      handleSend();
    }
  };

  return (
    <div className="flex flex-grow flex-row w-full max-w-full  ">
      <div className="main flex-1 relative flex flex-col max-w-full ">
        <div className="main-container pt-14 lg:pt-8 flex flex-col justify-start flex-grow md:mx-auto md:w-[90%] lg:w-[95%] xl:w-[80%] h-[80dvh] sm:h-[85dvh] ">
          {!showResult ? (
            <>
              {/* Greet Message */}

              <div className="greet px-4 text-h3 xs:text-h2 md:text-h1  text-[#a0a3a1] w-full max-w-full">
                <span className="bg-gradient-to-r from-[#8800FF] via-[#9c27b0] to-[#ba68c8] bg-clip-text text-transparent">
                  Hello, {currentUser?.name || 'there'}
                </span>
                <p className="text-gray-600 text-h4 xs:text-h3 md:text-h2 ">
                  How can I help you today?
                </p>
              </div>

              {/* Cards */}
              <div className="cards pb-[80px]  md:pb-[100px]  flex flex-wrap overflow-y-auto h-[55vh] max-h-[55vh] sm:h-[60vh] sm:max-h-[60vh] md:h-[55vh] md:max-h-[55vh] lg:h-[80vh] lg:max-h-[80vh] scroll-hide gap-[15px]  mt-3 lg:mt-6 px-4 w-full max-w-full">
                {renderedCards}
              </div>
            </>
          ) : (
            <div
              ref={scrollRef}
              className="result flex-1 h-[65vh] max-h-[65vh] md:h-[70vh] md:max-h-[70vh] 2xl:h-[80vh] 2xl:max-h-[80vh] overflow-y-auto pb-36 px-3 w-full max-w-full"
            >
              <div className="flex items-start flex-col gap-[20px] relative w-full max-w-full">
                {/* Show loading for card selection */}
                {isCardLoading && selectedCard ? (
                  <div className="w-full flex flex-col gap-[10px]">
                    <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <div className="text-[17px] font-[400] leading-1.8 w-full">
                    {/* First prompt loading state - new addition */}
                    {loading && prevPromptsAndResults.length === 0 && (
                      <div className="w-full flex flex-col gap-[10px] mb-4">
                        <div className="w-full flex justify-end">
                          <div className="bg-purple-200 px-3 py-2 md:px-4 md:py-3  rounded-2xl max-w-[85%] sm:max-w-[70%] md:max-w-[60%] xl:max-w-[50%] break-words">
                            <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">
                              {input}
                            </p>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-[10px] mt-4">
                          <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                          <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                          <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* Previous prompts and results */}
                    {prevPromptsAndResults?.length > 0 && (
                      <div className="previous-results">
                        {prevPromptsAndResults.map((item, index) => {
                          const isLast =
                            index === prevPromptsAndResults.length - 1;
                          const resultId = `result-${index}`;

                          return (
                            <div
                              key={index}
                              id={resultId}
                              className="previous-result w-full"
                            >
                              {loading && isLast ? (
                                // Loader for both question and answer
                                <div className="flex flex-col gap-2">
                                  <div className="w-full flex justify-end">
                                    <div className="bg-purple-200 px-3 py-2 md:px-4 md:py-3 rounded-2xl max-w-[85%] sm:max-w-[70%] md:max-w-[60%] xl:max-w-[50%] break-words">
                                      <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">
                                        {item.question}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full flex flex-col gap-[10px] mt-4">
                                    <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
                                    <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                                    <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {/* Actual question */}
                                  <div className="w-full flex justify-end">
                                    <div className="bg-purple-200 px-3 py-2 md:px-4 md:py-3 rounded-2xl max-w-[85%] sm:max-w-[70%] md:max-w-[60%] xl:max-w-[50%] break-words">
                                      <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap">
                                        {item.question}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Actual answer */}
                                  <div className="markdown-output w-full text-[15px] mt-4 px-2 leading-relaxed overflow-x-auto">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: renderMarkdownWithSpacing(
                                          item.answer
                                        ),
                                      }}
                                    />
                                  </div>
                                </>
                              )}
                              {!isLast && <hr className="my-4" />}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Search button */}
          <div
            className={` fixed bottom-6  w-full ${isCompressed ? ' md:w-[85%] lg:w-[90%] xl:w-[77%]' : ' md:w-[70%] lg:w-[80%] xl:w-[70%]'} px-2 `}
          >
            <div className="flex justify-between items-center gap-4 bg-white border-2 border-gray-200 min-h-14  rounded-full w-full shadow-md py-1">
              <textarea
                ref={textareaRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={input}
                placeholder="Ask Chatur"
                disabled={isInputDisabled}
                style={{ height: textareaHeight }}
                className="flex-1 bg-transparent border-0 outline-0 focus:outline-none focus:ring-0 text-[14px] md:text-[18px] px-4 py-3 leading-relaxed resize-none overflow-y-auto max-h-32 pl-4 pr-2 custom-scrollbar"
              />
              <div
                className={` h-full px-[14px] py-4 mr-1 md:mr-2 bg-[#8800FF] rounded-full flex items-center justify-center  ${input.trim() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'} ${isCardLoading || isInputDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => {
                  if (input.trim() && !isCardLoading) {
                    handleSend();
                  }
                }}
                disabled={isInputDisabled}
              >
                <FiSend className="text-white text-xl w-[24px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
