import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Users, X, Mail, User, Search } from 'lucide-react';

const AttendeesModal = ({ attendees, isOpen, onClose, sessionTitle }) => {
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter attendees based on search term
  const filteredAttendees = useMemo(() => {
    if (!attendees || !searchTerm.trim()) return attendees || [];
    
    const term = searchTerm.toLowerCase().trim();
    return attendees.filter(attendee => 
      attendee?.name?.toLowerCase().includes(term) ||
      attendee?.email?.toLowerCase().includes(term) ||
      attendee?.username?.toLowerCase().includes(term)
    );
  }, [attendees, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const attendeesModal = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="relative w-full max-w-md max-h-[85vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Session Attendees</h2>
                  <p className="text-sm text-gray-500">
                    {filteredAttendees?.length || 0} of {attendees?.length || 0} participant{attendees?.length !== 1 ? 's' : ''}
                    {searchTerm && ' (filtered)'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Session Title */}
          {sessionTitle && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex-shrink-0">
              <p className="text-sm text-gray-700 font-medium">{sessionTitle}</p>
            </div>
          )}

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Attendees List - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredAttendees && filteredAttendees?.length > 0 ? (
              <div className="p-4 space-y-3">
                {filteredAttendees?.map((attendee, index) => (
                  <motion.div
                    key={attendee?._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm mr-3">
                      {attendee?.name 
                        ? attendee.name.charAt(0).toUpperCase() 
                        : <User className="w-5 h-5" />
                      }
                    </div>

                    {/* Attendee Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {attendee?.name || 'Unknown Attendee'}
                        </p>
                      </div>
                      
                      {attendee?.email && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          <span className="truncate">{attendee.email}</span>
                        </div>
                      )}
                      
                      {attendee?.username && (
                        <p className="text-xs text-gray-500 mt-1">
                          @{attendee.username}
                        </p>
                      )}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex-shrink-0">
                      {/* <div className="w-2 h-2 bg-green-400 rounded-full"></div> */}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                {searchTerm ? (
                  <>
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">No attendees found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search terms</p>
                  </>
                ) : (
                  <>
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No attendees found</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white border-t border-gray-200 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(attendeesModal, document.body);
};

export default AttendeesModal;