import { useState } from 'react';

import { GiGraduateCap } from 'react-icons/gi';
import { GrCertificate } from 'react-icons/gr';
import { LiaLanguageSolid } from 'react-icons/lia';
import { FaTools } from 'react-icons/fa';
import { MdDeveloperMode } from 'react-icons/md';

import {
  LanguageForm,
  CustomForm,
  SkillsForm,
  CertificatesForm,
  ProjectsForm,
} from './AdditionalForms/index.js';

const FormCards = ({ TabIcons, TabHead, setCurrForm, FormNum }) => {
  return (
    <div
      onClick={() => setCurrForm(FormNum)}
      className="cursor-pointer p-1 md:p-2 flex flex-col justify-center align-middle gap-2 border border-purple-600 md:w-24 h-20  md:h-24 md:min-w-14   bg-purple-100 rounded-lg"
    >
      <div>
        {<TabIcons className="w-[18px] h-auto m-auto text-purple-900 " />}
      </div>
      <div>
        <h4 className="text-purple-600 font-medium text-[12px] text-center leading-4 ">
          {TabHead}
        </h4>
      </div>
    </div>
  );
};

const AccorComponent = () => {
  const [currForm, setCurrForm] = useState(3);

  function RenderComponent() {
    switch (currForm) {
      case 1:
        return <SkillsForm />;
      case 2:
        return <LanguageForm />;
      case 3:
        return <ProjectsForm />;
      case 4:
        return <CustomForm />;
      case 5:
        return <CertificatesForm />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex flex-col p-3 mb-8 md:w-auto md:max-w-[480px]  items-center border-[#9333ea] border-2 shadow-[#9333ea] shadow-md h-auto ">
      <div className="my-2">
        <h2 className="text-2xl font-semibold">
          Additional<span className="text-purple-700"> Section.</span>
        </h2>
        <div className=" my-4 flex flex-row gap-2   justify-center">
          <FormCards
            FormNum={3}
            setCurrForm={setCurrForm}
            TabIcons={FaTools}
            TabHead={'Add Projects'}
          />
          <FormCards
            FormNum={5}
            setCurrForm={setCurrForm}
            TabIcons={GrCertificate}
            TabHead={'Add Certificates'}
          />
          <FormCards
            FormNum={2}
            setCurrForm={setCurrForm}
            TabIcons={LiaLanguageSolid}
            TabHead={'Add Languages'}
          />
          <FormCards
            FormNum={4}
            setCurrForm={setCurrForm}
            TabIcons={MdDeveloperMode}
            TabHead={'Custom Section'}
          />
        </div>
      </div>

      <div>{RenderComponent()}</div>
    </div>
  );
};

export default AccorComponent;
