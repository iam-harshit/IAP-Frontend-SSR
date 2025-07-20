import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectEducationData,
  selectExperienceData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';

function Template3() {
  const skillarray = ['Frontend', 'Bakcend', 'Python', 'C++'];

  const userInputData = useSelector(selectUserData);
  const userExperienceData = useSelector(selectExperienceData);
  const userEducationData = useSelector(selectEducationData);
  return (
    <div
      className="a4-sheet  bg-white w-[793px]   flex flex-col items-center  border border-gray-200 "
      // style={{ transform: "scale(0.7)", marginTop: "-150px" }}
    >
      {/* <div className="w-[210mm] h-[297mm] lg:max-h-[1100px] lg:overflow-hidden  "> */}
      {/* coloured box area  */}
      <div className="pfp-details  flex flex-row items-center justify-between bg-[rgb(99,133,255)] h-[220px] w-[750px] m-[15px] rounded-[120px_5px_50px_120px]">
        <div className="pfp  bg-[white] w-[180px] h-[180px] border m-[15px] rounded-[50%] border-solid border-[gray]" />

        <div className="details-space  flex flex-col items-center justify-center w-[220px]">
          {/* name  */}
          <div className="name flex flex-row items-center justify-center">
            <p className="text-3xl font-[bold] text-[white] m-0.5">
              {userInputData && userInputData.firstName
                ? userInputData.firstName
                : 'Saksham'}
            </p>
            <p className="text-3xl font-[bold] text-[white] m-0.5">
              {userInputData && userInputData['last-name']
                ? userInputData['last-name']
                : 'Gupta'}
            </p>
          </div>
          <div className="w-[300px] h-px bg-white m-2.5 border-[none]" />

          {/* Occupation  */}
          <div className="occupation">
            <p className="text-xl font-[bold] text-[white] m-0.5">
              {userExperienceData
                ? userExperienceData[userExperienceData.length - 1]?.Job_Title
                : 'MERN Stack Developer'}
            </p>
          </div>
        </div>

        {/* mail and phone number  */}

        <div className="email-phno-space  flex flex-col items-end w-40 text-[white] text-sm m-2.5">
          <div className="email font-medium">
            <p className="m-1">
              {userInputData && userInputData['email-address']
                ? userInputData['email-address']
                : 'oDfJt@example.com'}
            </p>
          </div>

          {/* Address line  */}
          <div className=" font-semibold">
            <p>
              {' '}
              {userInputData && userInputData.address
                ? userInputData.address
                : '121-a9'}{' '}
              ,{' '}
              {userInputData && userInputData.city
                ? userInputData.city
                : 'ABC Highrise,'}
            </p>
            <p>
              City Code:{' '}
              {userInputData && userInputData['city-code']
                ? userInputData['city-code']
                : '829911'}
            </p>
          </div>
          <div className="city-and-state font-semibold">
            <p>
              {userInputData && userInputData.city
                ? userInputData.city
                : 'Jaipur'}
              ,{' '}
              {userInputData && userInputData.state
                ? userInputData.state
                : 'Rajasthan'}
              ,
              {userInputData && userInputData.country
                ? userInputData.country
                : 'India'}
            </p>
          </div>
        </div>
      </div>
      {/* colorless area  */}
      <div className="data-space">
        {/* About me  */}
        <div className="about-me   bg-[rgba(255,255,255,0.448)] w-[720px]">
          <div className="professional-experience flex flex-row items-start ">
            <div className="w-[90%] flex mt-3 ml-[40px] flex-col items-start">
              <h2 className="text-[35px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
                About me
              </h2>
              {userInputData && userInputData.description ? (
                userInputData.description
              ) : (
                <p>
                  Human resources generalist with 8 years of experience in HR,
                  including hiring and terminating, disciplining employees and
                  helping department managers improve employee performance.
                  Worked with labor unions to negotiate compensation packages
                  for workers. Organized new hire training initiatives as well
                  as ongoing training to adhere to workplace safety standards.
                  Worked with OSHA to ensure that all safety regulations are
                  followed.
                </p>
              )}
            </div>
            {/* this is EDU DESC  */}
            <div className=" skill-set w-[450px] flex flex-col ml-5 mt-1  text-base p-5 rounded-[20px]">
              <h2 className="text-[35px] mb-[10px] font-[bold] text-[rgb(99,133,255)]">
                Key Skills
              </h2>
              {userInputData &&
              userInputData.skills &&
              userInputData.skills.length > 0 ? (
                userInputData.skills.map((skill, index) => (
                  <ul
                    className="pt-[10px] text-lg  text-[rgb(252,255,250)] text-gray-500 leading-[25px]  flex items-center  w-[90%]   "
                    key={index}
                  >
                    <li
                      className={`skillLevel w-[${skill[1]}%] p-[2px]  rounded-sm  bg-[rgb(99,133,255)] mr-[15px] text-white text-center text-[10px]`}
                    >
                      {skill[1]}
                    </li>
                    <li className="updated-skill text-[17px] text-[rgb(84,84,84)]">
                      {skill[0]}
                    </li>
                  </ul>
                ))
              ) : (
                <div className="skillarray">
                  {skillarray.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex m-2 flex-row items-center"
                      >
                        <div className="w-[100px] h-3 bg-[rgb(99,133,255)] mx-2.5 my-0" />{' '}
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="w-[700px] mt-[20px] ml-[50px] h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" />
        <div className="about">
          <h2 className="text-[35px]  ml-[50px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
            Experience
          </h2>
          <div className="px-10 m-[15px]">
            {userExperienceData && userExperienceData.length > 0 ? (
              <>
                {userExperienceData.map((exp, index) => (
                  <div
                    key={index}
                    className="flex-col justify-start  m-[15px]  exp-1 flex items-start  gap-3 font-serif pt-2"
                  >
                    <div className="duration flex gap-x-2 ">
                      <h2>{exp.Job_Title}</h2>
                      <span className="text-gray-500">
                        {exp.Company_Name} | {exp.WrkStartDate} to{' '}
                        {exp.WrkEndDate}
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
                  <li>
                    Implement effective company policies to ensure that all
                    practices comply with labor and employment regulations
                  </li>
                  <li>
                    Increased employee retention rates by managing workplace
                    satisfaction to an over 90% success rate by creating and
                    maintaining a positive work environment
                  </li>
                  <li>
                    Develop targeted outreach practices to increase minority
                    recruitment and ensure compliance with affirmative action
                    policies
                  </li>
                  <li>
                    Monitor scheduled in and out times as well as employee
                    breaks to ensure that proper employment laws are met
                  </li>
                </ul>

                <div className="exp-1 flex items-center w-[70%] gap-3 font-serif pt-2 lg:w-[100%]">
                  <h2>{'Manager'}</h2>
                  <div className="duration text-gray-500 ">
                    {'XYZ company'} | {'Start Date - End Date'}
                  </div>
                </div>
                <ul className="text-[15px] text-gray-500 lg:leading-[25px]">
                  <li>
                    Implement effective company policies to ensure that all
                    practices comply with labor and employment regulations
                  </li>
                  <li>
                    Increased employee retention rates by managing workplace
                    satisfaction to an over 90% success rate by creating and
                    maintaining a positive work environment
                  </li>
                  <li>
                    Develop targeted outreach practices to increase minority
                    recruitment and ensure compliance with affirmative action
                    policies
                  </li>
                  <li>
                    Monitor scheduled in and out times as well as employee
                    breaks to ensure that proper employment laws are met
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <hr className="w-[700px] mt-[20px] ml-[50px] h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" />

        {/* Professional skills  */}
        <div className="">
          {/* <hr className="w-[700px] mt-[-20px] ml-[50px] h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" /> */}

          <div className="skilldev flex flex-row items-center justify-start w-[700px]  bg-[rgba(255,255,255,0.448)]">
            {/* this is edu to go up  */}
            <div className="w-[90%]  ml-[50px]">
              <h2 className="text-[35px] mt-[30px] font-[bold] text-[rgb(99,133,255)]">
                Education
              </h2>
              {userEducationData && userEducationData.length > 0 ? (
                <>
                  {userEducationData.map((edu, index) => (
                    <div
                      key={index}
                      className="edu-1 flex-col justify-start  flex items-start w-[80%] gap-3 font-serif pt-2 lg:w-[100%] m-[15px]"
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
            </div>

            {/* education details  */}
          </div>
        </div>

        <hr className="w-[700px]  mt-[20px] ml-[50px]  h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" />
      </div>
      {/* Adding additional sections based on userData */}
      {/* Languages */}
      {userInputData &&
      userInputData.language &&
      userInputData.language.length > 0 ? (
        <div className="flex flex-col justify-start w-[90%] ">
          <h2 className="text-[35px]  font-[bold] text-[rgb(99,133,255)] m-[15px]">
            Languages
          </h2>
          {userInputData.language.map((lan, index) => {
            return (
              <ul key={index} className="flex mx-[15px]">
                <div className=" w-3 h-2.5 bg-[rgb(99,133,255)] m-2.5 rounded-[50px]" />
                <li className=" text-black  w-[150px]">
                  {lan[0]} - {lan[1]}
                </li>
              </ul>
            );
          })}
        </div>
      ) : null}
      {userInputData && userInputData.language && (
        <hr className="w-[700px] h-[5px]  mt-[20px] ml-[50px]  bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" />
      )}

      {/* Projects */}
      {userInputData &&
      userInputData.projects &&
      userInputData.projects.length > 0 ? (
        <div className="flex flex-col justify-start w-[87%]">
          <h2 className="text-[35px]  font-[bold] text-[rgb(99,133,255)] m-[15px]">
            Projects
          </h2>
          {userInputData.projects.map((project) => {
            return (
              <ul key={project.id} className="">
                <li className=" w-full m-[15px] ">
                  <div className="project-header flex flex-row gap-[15px] items-center">
                    <h2 className="text-2xl heading-S1">{project.Heading}</h2>
                    <a
                      href={project.Link}
                      className="text-md text-cyan-600 cursor-pointer"
                    >
                      {project.Link}
                    </a>
                  </div>
                  <div
                    className="max-w-[700px] text-wrap pt-[10px] text-[17px] text-[rgb(84,84,84)] mx-[15px] "
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </li>
              </ul>
            );
          })}
        </div>
      ) : null}
      {userInputData && userInputData.projects && (
        <hr className="w-[700px] h-[5px]  mt-[25px] ml-[50px]  bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none] " />
      )}

      {/* Certificates */}
      {userInputData &&
      userInputData.certificates &&
      userInputData.certificates.length > 0 ? (
        <div className="flex flex-col justify-start w-[87%]">
          <h2 className="text-[35px]  font-[bold] text-[rgb(99,133,255)] m-[15px]">
            Certificates
          </h2>
          {userInputData.certificates.map((certificate, index) => {
            return (
              <ul
                key={index}
                className="text-[15px] text-gray-500   mx-[15px]  pt-2 flex flex-col gap-[2px] "
              >
                <div className="flex gap-[10px]">
                  <h2 className="font-serif font-bold m-[5px]">
                    {certificate.Certificate_Name}
                  </h2>

                  <a
                    href={certificate.Certificate_Link}
                    className="text-md text-cyan-600 cursor-pointer"
                  >
                    {certificate.Certificate_Link}
                  </a>
                </div>
                <div className=" flex gap-[10px] m-[5px]">
                  <h3>{certificate.Institute}</h3> |
                  <span>{certificate.startDate}</span>
                </div>
              </ul>
            );
          })}
        </div>
      ) : null}
      {userInputData && userInputData.projects && (
        <hr className="w-[700px]  mt-[25px] ml-[50px] h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none]" />
      )}
      {/* Custom Form */}
      {userInputData && userInputData.customData
        ? userInputData.customData.map((customData) => {
            return (
              <div key={customData.id}>
                <ul className="w-[670px]">
                  <li className=" w-[90%]">
                    <h2 className="text-[35px]  font-[bold] text-[rgb(99,133,255)] m-[15px]">
                      {customData.Custom_Heading}
                    </h2>

                    <div
                      className="max-w-[700px] text-wrap  text-[17px] m-[15px] text-[rgb(84,84,84)]"
                      dangerouslySetInnerHTML={{
                        __html: customData.description,
                      }}
                    />
                  </li>
                </ul>
                <hr className="w-[700px]  ml-[50px] h-[5px] bg-[rgb(99,133,255)] shadow-[0_0_5px_2px_rgba(82,160,255,0.8)] rounded-[90%] border-[none] mt-[25px]" />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Template3;
