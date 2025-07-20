/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { sessionTypes, categories } from "@/Constants/Dashboard-Constants/Event";
import Topics from './SessionTopics';
import SessionType from './SessionType';
import Category from './SessionCategory';
import CustomCategoryModal from './CustomCategoryModal';
import SessionCapacity from './SessionCapacity';

const SessionTypeSelector = ({ formData, setFormData, handleChange }) => {
  const [topicInput, setTopicInput] = useState('');
  const [topics, setTopics] = useState([]);
  const [showCustomCategoryModal, setShowCustomCategoryModal] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [availableCategories, setAvailableCategories] = useState(categories);

  const handleAddTopic = () => {
    if (topicInput.trim() && !topics.includes(topicInput.trim())) {
      const newTopics = [...topics, topicInput.trim()];
      setTopics(newTopics);
      setFormData({ ...formData, sessionTopics: newTopics });
      setTopicInput('');
    }
  };

  const handleCategoryChange = (selectedOption) => {
    if (selectedOption.value === 'custom') {
      setShowCustomCategoryModal(true);
    } else {
      setFormData({ ...formData, sessionCategory: selectedOption.value });
    }
  };

  const handleSessionTypeChange = (selectedOption) => setFormData({ ...formData, sessionType: selectedOption.value });

  const handleRemoveTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
    setFormData({ ...formData, sessionTopics: newTopics });
  };

  const handleAddCustomCategory = () => {
    if (customCategoryInput.trim()) {
      const newCategory = {
        value: customCategoryInput.trim().toLowerCase().replace(/\s+/g, '-'),
        label: customCategoryInput.trim()
      };
      setAvailableCategories([...availableCategories, newCategory]);
      setFormData({ ...formData, sessionCategory: newCategory.value });
      setCustomCategoryInput('');
      setShowCustomCategoryModal(false);
    }
  };


  return (
    <div className="w-full space-y-5">
      <div>
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {/* Category Select */}
          <Category formData={formData} availableCategories={availableCategories} handleCategoryChange={handleCategoryChange} />
          {/* Session Type Select */}
          <SessionType formData={formData} sessionTypes={sessionTypes} handleSessionTypeChange={handleSessionTypeChange} />
        </div>

        {/* Session Topics Input */}
        <Topics topicInput={topicInput} setTopicInput={setTopicInput} handleAddTopic={handleAddTopic} topics={topics} handleRemoveTopic={handleRemoveTopic} />
        {/* Capacity Section */}
        <SessionCapacity formData={formData} handleChange={handleChange} />
        {/* Custom Category Modal */}
        {showCustomCategoryModal && (
          <CustomCategoryModal setShowCustomCategoryModal={setShowCustomCategoryModal} customCategoryInput={customCategoryInput} setCustomCategoryInput={setCustomCategoryInput} handleAddCustomCategory={handleAddCustomCategory} />
        )}
      </div>
    </div>
  );
};

export default SessionTypeSelector;