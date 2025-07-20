import { useSelector } from 'react-redux';
import {
  selectEducationData,
  selectExperienceData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';

function Template5() {
  const userInputData = useSelector(selectUserData);
  const userExperienceData = useSelector(selectExperienceData);
  const userEducationData = useSelector(selectEducationData);
  return (
    <div className="bg-white mt-[-20px] w-[210mm]  min-h-[1120px]  p-10 border border-gray-200 ">
      {/*Template Header */}
      <div className="header-wrapper pt-5  ">
        <header className="flex justify-between  ">
          {/* left */}
          <div className="left flex  w-[300px]  justify-between gap-[10px] ">
            {/* logo */}
            <div className="mt-3">
              <button className="logo  p-4 bg-[#de8535] rounded-full ">
                <span className="text-white text-lg lg:text-4xl  font-serif">
                  {' '}
                  {userInputData && userInputData.firstName
                    ? userInputData.firstName[0]
                    : 'C'}
                </span>
                <span className="text-white text-lg lg:text-4xl font-serif">
                  {userInputData && userInputData['last-name']
                    ? userInputData['last-name'][0]
                    : 'C'}{' '}
                </span>
              </button>
            </div>
            {/* name & job */}
            <div className="name-job ">
              <div className="firstName text-[#de8535] font-serif text-xl lg:text-4xl">
                {userInputData && userInputData.firstName
                  ? userInputData.firstName
                  : 'Chris'}
              </div>
              <div className="lastName text-[#de8535] font-serif text-xl lg:text-4xl">
                {userInputData && userInputData['last-name']
                  ? userInputData['last-name']
                  : 'Candidate'}
              </div>
              <div className="job-title w-[250px] text-[15px] lg:text-md font-serif ">
                {userExperienceData
                  ? userExperienceData[userExperienceData.length - 1]?.Job_Title
                  : 'Human Resource Manager'}
              </div>
            </div>
            {/* right */}
            <div className="right  text-custom-orange ml-[180px]">
              <div className="adress text-[15px]">
                {userInputData && userInputData.address
                  ? userInputData.address
                  : 'Sunnydale Lane'}
              </div>
              <div className="adress-city  flex  gap-[5px]">
                <div className="city text-[15px]">
                  {userInputData && userInputData.city
                    ? userInputData.city
                    : 'Plano'}
                </div>
                <div className="city-code text-[15px]">
                  {userInputData && userInputData['city-code']
                    ? userInputData['city-code']
                    : 'TX 75071'}
                </div>
              </div>
              <div className="adress-state-country  flex   gap-[5px]">
                <div className="state text-[15px]">
                  {userInputData && userInputData.state
                    ? userInputData.state
                    : 'Texas'}
                </div>
                <div className="country text-[15px]">
                  {userInputData && userInputData.country
                    ? userInputData.country
                    : 'USA'}
                </div>
              </div>
              <div className="email text-[15px]">
                {userInputData && userInputData['email-address']
                  ? userInputData['email-address']
                  : 'email@youremail.com'}
              </div>
            </div>
          </div>
        </header>
        {userInputData && userInputData.description ? (
          userInputData.description
        ) : (
          <p className="description text-[13px] lg:text-[15px] lg:leading-[24px] text-gray-500 pt-4 leading-3">
            Human resources generalist with 8 years of experience in HR,
            including hiring and terminating, disciplining employees and helping
            department managers improve employee performance. Worked with labor
            unions to negotiate compensation packages for workers. Organized new
            hire training initiatives as well as ongoing training to adhere to
            workplace safety standards. Worked with OSHA to ensure that all
            safety regulations are followed.
          </p>
        )}
      </div>
      {/* Template body */}
      <div className=" ">
        <h1 className=" text-serif  text-lg lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
          Professional Experience
        </h1>
        {userExperienceData && userExperienceData.length > 0 ? (
          <>
            {userExperienceData.map((exp, index) => (
              <div
                key={index}
                className="flex-col justify-start  exp-1 flex items-start w-[70%] gap-3 font-serif pt-2 lg:w-[100%]"
              >
                <div className="duration flex gap-x-2 ">
                  <h2>{exp.Job_Title}</h2>
                  <span className="text-gray-500">
                    {exp.Company_Name} | {exp.WrkStartDate} to {exp.WrkEndDate}
                  </span>
                </div>
                <div
                  className="text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: exp.description,
                  }}
                ></div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="exp-1 flex items-center w-[70%] gap-3 font-serif pt-2 lg:w-[100%]">
              <h2>{'Manager'}</h2>
              <div className="duration text-gray-500 ">
                {'XYZ company'} | {'Start Date - End Date'}
              </div>
            </div>
            <ul className="text-[15px] text-gray-500 lg:leading-[25px]">
              <li className="list-item">
                Implement effective company policies to ensure that all
                practices comply with labor and employment regulations
              </li>
              <li className="list-item">
                Increased employee retention rates by managing workplace
                satisfaction to an over 90% success rate by creating and
                maintaining a positive work environment
              </li>
              <li className="list-item">
                Develop targeted outreach practices to increase minority
                recruitment and ensure compliance with affirmative action
                policies
              </li>
              <li className="list-item">
                Monitor scheduled in and out times as well as employee breaks to
                ensure that proper employment laws are met
              </li>
            </ul>

            <div className="exp-1 flex items-center w-[70%] gap-3 font-serif pt-2 lg:w-[100%]">
              <h2>{'Manager'}</h2>
              <div className="duration text-gray-500 ">
                {'XYZ company'} | {'Start Date - End Date'}
              </div>
            </div>
            <ul className="text-[15px] text-gray-500 lg:leading-[25px]">
              <li className="list-item">
                Implement effective company policies to ensure that all
                practices comply with labor and employment regulations
              </li>
              <li className="list-item">
                Increased employee retention rates by managing workplace
                satisfaction to an over 90% success rate by creating and
                maintaining a positive work environment
              </li>
              <li className="list-item">
                Develop targeted outreach practices to increase minority
                recruitment and ensure compliance with affirmative action
                policies
              </li>
              <li className="list-item">
                Monitor scheduled in and out times as well as employee breaks to
                ensure that proper employment laws are met
              </li>
            </ul>
          </>
        )}
        <h1 className="education text-lg lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
          Education
        </h1>
        {userEducationData && userEducationData.length > 0 ? (
          <>
            {userEducationData.map((edu, index) => (
              <div
                key={index}
                className="edu-1 flex-col justify-start  flex items-start w-[80%] gap-3 font-serif pt-2 lg:w-[100%]"
              >
                <div className="duration flex gap-x-2">
                  <h2>{edu.degree}</h2>
                  <span className="text-[15px] text-gray-500">
                    {edu.schoolName} | {edu.startDate} - {edu.endDate}
                  </span>
                </div>

                <div className="duration text-[15px] text-gray-500">
                  {edu.description}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <div>
              <h2>{'Masters in Human Resources'}</h2>
              <div className="duration text-[15px] text-gray-500">
                {'The University of Texas, Dallas '} | {'Start Date'} -{' '}
                {'End Date'}
              </div>
            </div>
            <div>
              <h2>{'Masters in Human Resources'}</h2>
              <div className="duration text-[15px] text-gray-500">
                {'The University of Texas, Dallas '} | {'Start Date'} -{' '}
                {'End Date'}
              </div>
            </div>
          </div>
        )}

        <div className="skills-div w-[100%]">
          <h1 className="skills text-lg lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2 ">
            Key Skills
          </h1>
          {userInputData &&
          userInputData.skills &&
          userInputData.skills.length > 0 ? (
            userInputData.skills.map((skill, index) => (
              <ul
                className="text-[15px] text-gray-500 lg:leading-[25px] pt-2 flex items-center  w-[40%]   "
                key={index}
              >
                <li
                  className={`skillLevel w-[${skill[1]}%] p-[2px] text-white text-center text-[10px] rounded-sm  bg-[#de8535] mr-[15px]`}
                >
                  {skill[1]}
                </li>
                <li className="updated-skill">{skill[0]}</li>
              </ul>
            ))
          ) : (
            <ul className="text-[15px] text-gray-500 lg:leading-[25px] pt-2">
              <li className="skill">Detail oriented</li>
              <li className="skill">Well-versed in Texas employment law</li>
              <li className="skill">
                Excellent written and oral communication skills
              </li>
              <li className="skill">
                Develops positive workplace relationships
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* Adding additional sections based on userData */}

      {/* Projects */}
      {userInputData &&
      userInputData.projects &&
      userInputData.projects.length > 0 ? (
        <>
          <h1 className="projects text-lg  lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
            Projects
          </h1>
          {userInputData.projects.map((project) => {
            return (
              <ul
                key={project.id}
                className="text-[15px] text-gray-500 lg:leading-5  pt-2 flex gap-[10px] "
              >
                <li className=" w-full ">
                  <div className="project-header flex flex-row gap-[15px] items-center">
                    <h2 className="text-lg heading">{project.Heading}</h2>
                    <a
                      href={project.Link}
                      className="text-md text-cyan-600 cursor-pointer"
                    >
                      {project.Link}
                    </a>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </li>
              </ul>
            );
          })}
        </>
      ) : null}
      {/*Certificates*/}
      {userInputData &&
      userInputData.certificates &&
      userInputData.certificates.length > 0 ? (
        <>
          <h1 className="languages text-lg lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
            Certificates
          </h1>
          {userInputData.certificates.map((certificate, index) => {
            return (
              <ul
                key={index}
                className="text-[15px] text-gray-500 lg:leading-5  pt-2 flex flex-col gap-[10px]"
              >
                <div className="flex gap-[10px]">
                  <h2 className="font-serif font-bold">
                    {certificate.Certificate_Name}
                  </h2>
                  <a
                    href={certificate.Certificate_Link}
                    className="text-md text-cyan-600 cursor-pointer"
                  >
                    {certificate.Certificate_Link}
                  </a>
                </div>
                <div className="flex gap-[10px]">
                  <h3>{certificate.Institute}</h3> |
                  <span>{certificate.startDate}</span>
                </div>
              </ul>
            );
          })}
        </>
      ) : null}
      {/* Languages */}
      {userInputData &&
      userInputData.language &&
      userInputData.language.length > 0 ? (
        <>
          <h1 className="languages text-sm lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
            Languages
          </h1>
          {userInputData.language.map((lan, index) => {
            return (
              <ul
                key={index}
                className="text-[15px] text-gray-500 lg:leading-5  pt-2 flex gap-[10px]"
              >
                <li className="list-item text-black  w-[150px]">
                  {lan[0]} - {lan[1]}
                </li>
              </ul>
            );
          })}
        </>
      ) : null}

      {/* Custom Form */}
      {userInputData && userInputData.customData
        ? userInputData.customData.map((customData) => {
            return (
              <ul
                key={customData.id}
                className="text-[15px] text-gray-500 lg:leading-5  pt-2 flex gap-[10px] "
              >
                <li className=" w-full ">
                  <h1 className="custom-data  text-lg lg:text-2xl text-[#de8535] border-b-2 border-[#de8535] pt-2">
                    {customData.Custom_Heading}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: customData.description }}
                  />
                </li>
              </ul>
            );
          })
        : null}
    </div>
  );
}

export default Template5;
