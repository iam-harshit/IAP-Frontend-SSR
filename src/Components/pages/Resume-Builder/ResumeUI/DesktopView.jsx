import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import MultiStepForm from '../ResumeForm/MultiForms/MultiStepForm.jsx';
import Template3 from './templates/Template3.jsx';
import Template4 from './templates/Template4.jsx';
import Template1 from './templates/Template1.jsx';
import Template2 from './templates/Template2.jsx';
import Template5 from './templates/Template5.jsx';

import template1 from '../../../../assets/Resume-Builder/template1.png';

import template3 from '../../../../assets/Resume-Builder/template3.png';
import template4 from '../../../../assets/Resume-Builder/template4.png';
import template5 from '../../../../assets/Resume-Builder/template5.png';
import maintemplate from '../../../../assets/Resume-Builder/maintemplate.png';
import Navbar from './Navbar.jsx';

function DesktopView() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('MainTemplate');

  // Pdf Download Part
  const pdfRef2 = useRef();
  const PrintButton = ({ componentRef }) => {
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    return (
      <button onClick={handlePrint} className="hidden lg:block mt-[20px] ">
        {' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={'45px'}
          fill="#3b82f6"
        >
          <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
        </svg>{' '}
      </button>
    );
  };

  const handleTemplateClick = (templateId) => {
    setSelectedTemplate(templateId);
    setPopupVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const templates = [
    {
      id: 'TemplateD1',
      name: 'Template 1',
      image: template1,
      component: Template1,
    },
    {
      id: 'TemplateD2',
      name: 'Template 2',
      image: template3,
      component: Template2,
    },
    {
      id: 'TemplateS1',
      name: 'Template 3',
      image: template5,
      component: Template3,
    },
    {
      id: 'TemplateS2',
      name: 'Template 4',
      image: template4,
      component: Template4,
    },
    {
      id: 'MainTemplate',
      name: 'Template 5',
      image: maintemplate,
      component: Template5,
    },
  ];

  return (
    <div className="overflow-scroll no-scrollbar mb-4">
      <div className="desktop-view flex flex-col max-w-8xl m-auto pt-[20px] mx-[30px]">
        <div className="flex flex-row">
          <div className="left w-[50%]">
            <Navbar
              selectedTemplate={selectedTemplate}
              setPopupVisible={setPopupVisible}
              templates={templates}
              popupVisible={popupVisible}
              handleTemplateClick={handleTemplateClick}
              closePopup={closePopup}
            />
            <div className="w-auto">
              <MultiStepForm />
            </div>
          </div>

          <div className=" w-[45%] h-[400px] mt-[150px] ">
            <div className="transform origin-top-left scale-[0.60]  ">
              <div className="" ref={pdfRef2}>
                {selectedTemplate === 'TemplateD1' && <Template1 />}

                {selectedTemplate === 'TemplateD2' && <Template2 />}
                {selectedTemplate === 'TemplateS1' && <Template3 />}
                {selectedTemplate === 'TemplateS2' && <Template4 />}
                {selectedTemplate === 'MainTemplate' && <Template5 />}
              </div>
              <PrintButton componentRef={pdfRef2} />
            </div>
          </div>
        </div>
      </div>

      {popupVisible && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white p-8 rounded-lg shadow-lg grid grid-cols-3 gap-4 h-[600px] w-[600px] relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {templates.map((template) => (
              <img
                key={template.id}
                src={template.image}
                alt={template.name}
                onClick={() => handleTemplateClick(template.id)}
                className="cursor-pointer border-4 border-indigo-500"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopView;
