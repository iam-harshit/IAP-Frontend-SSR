
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { assets } from '@/Components/pages/AskMentor-Page/assets/assets'
import { Context } from '@/Components/pages/AskMentor-Page/context/Context'
import { FaPlus } from "react-icons/fa6";

const Sidebar = ({ isOpen, setIsOpen, isCompressed, setIsCompressed }) => {
  // Optimize context usage by using separate hooks for each piece of state/function
  const { setInput } = useContext(Context)
  // const { onSent } = useContext(Context)
  const { prevPromptsAndResults, setPrevPromptsAndResults } = useContext(Context)
  const { setShowResult } = useContext(Context)
  const { setRecentPrompt } = useContext(Context)
  const { newChat } = useContext(Context)
  const { chats, setChats } = useContext(Context)
  const { getLastChat } = useContext(Context)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen)
    } else {
      setIsCompressed(!isCompressed)
    }
  }

  const handleClickAndClose = useCallback((action) => {
    action()
    if (isMobile) setIsOpen(false)
  }, [isMobile, setIsOpen])

  // Fixed missing dependency by using useCallback with proper dependencies
  const loadChat = useCallback((chat) => {
    setInput('')
    setRecentPrompt(chat[0].question)

    if (chats.length > 0 && prevPromptsAndResults.length > 0) {
      let prev = chats.some(
        (c) => c[0].question === prevPromptsAndResults[0].question
      )

      if (prev) {
        setChats(
          chats.map((c) =>
            c[0].question === prevPromptsAndResults[0].question
              ? prevPromptsAndResults
              : c
          )
        )
      } else {
        setChats((prevChats) => [...prevChats, prevPromptsAndResults])
      }
    }

    setPrevPromptsAndResults(chat)
    setShowResult(true)
    if (isMobile) setIsOpen(false)
  }, [chats, isMobile, prevPromptsAndResults, setChats, setInput, setIsOpen, setPrevPromptsAndResults, setRecentPrompt, setShowResult])

  const loadLastChat = useCallback(() => {
    setInput('')
    const lastChat = getLastChat()
    if (lastChat) {
      loadChat(lastChat)
    }else{
      console.warn("No valid previous chat found")
    }
  }, [getLastChat, loadChat, setInput])

  const truncateText = (text, limit) => {
    const words = text.split(' ')
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text
  }

  return (
    <div className="w-full  ">
    {/* Hamburger Button */}
    <button
      onClick={toggleSidebar}
      className="absolute top-3 md:top-8 left-4 md:left-3 z-40 p-2 bg-purple-300 rounded-md shadow-md focus:outline-none"
    >
      <div className="flex flex-col gap-1">
        <div className="w-6 h-0.5 bg-gray-500"></div>
        <div className="w-4 h-0.5 bg-gray-500"></div>
      </div>
    </button>

    {/* Sidebar */}
    <div className={`relative w-full `}>
      
      <div
  className={`fixed  inset-0 z-30  shadow-md transition-all duration-300 ease-in-out
    ${isMobile ? `w-[270px] ${isOpen ? 'translate-x-0 bg-[#ede9fe]' : 'hidden'}` : ''}
    ${!isMobile ? `${isCompressed ? 'w-16' : 'w-[210px] xl:w-[250px]'} bg-[#ede9fe]` : ''}`}
>

        <div className="ml-4 md:mx-3 mt-[120px] md:mt-[150px] lg:mt-[170px] mx-[12px] flex flex-col items-start gap-4">
          {/* Title */}
          { !isCompressed && (
            <h2 className="text-[#2E0EA6] text-h3 transition-all duration-200">
              Chatur AI
            </h2>
          )}

          {/* New Chat */}
          <button
            onClick={() => handleClickAndClose(newChat)}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 bg-white font-medium rounded-lg hover:bg-[#dcd0fa] hover:text-[#3b0a91] hover:shadow  "
          >
           
              <FaPlus size={'20px'} />
            
            {(isMobile && isOpen) || (!isMobile && !isCompressed) ? <span>New Chat</span> : null}
          </button>


          {/* Saved Chats */}
          {chats.length > 0 && (
            <div className="mt-4 w-full ">
              {!isCompressed && (
                <p className="text-sm font-semibold  mb-2 ml-1">Saved Chats</p>
              )}
              {!isCompressed && ( 
                <div className="saved-chats flex flex-col gap-1 overflow-y-auto max-h-[210px] md:max-h-[300px] xl:max-h-[250px] 2xl:max-h-[400px]  pb-10 ">
                {chats.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => loadChat(chat)}
                    className="w-full flex items-center gap-1 px-2 py-2 rounded-md text-[13px]  cursor-pointer hover:bg-[#dcd0fa] transition-all duration-200"
                  >
                    <div className="w-6 flex justify-center">
                      <img src={assets.message_icon} alt="Chat" className="w-4 h-4" />
                    </div>
                    {(isMobile && isOpen) || (!isMobile && !isCompressed) ? (
                      <p className="truncate font-caption">{truncateText(chat[0].question, 3)}</p>
                    ) : null}
                  </div>
                ))}
              </div> )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Sidebar