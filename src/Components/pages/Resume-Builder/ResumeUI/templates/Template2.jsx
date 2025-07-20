import { useSelector } from 'react-redux';
import {
  selectEducationData,
  selectExperienceData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';

function Template2() {
  const userInputData = useSelector(selectUserData);
  const userEducationData = useSelector(selectEducationData);
  const userExperienceData = useSelector(selectExperienceData);

  return (
    <div
      className="TemplateD3 flex flex-col items-center justify-center bg-[rgb(192,219,255)] w-[210mm]  "
      // style={{ transform: "scale(1)" }}
    >
      <div className="h-[230px] bg-[rgb(2,87,148)] w-[95%] mt-5 rounded-[150px]">
        <div className="flex flex-row items-center justify-evenly">
          <div className="h-[200px] w-[200px] bg-[rgb(235,236,231)] ml-[-20px] mt-[20px] rounded-[50%]"></div>
          <div className="flex flex-col items-center justify-center bg-white w-[400px] h-[150px] mt-[25px] ml-[30px]  rounded-[50px_100px_100px_50px] border-2 border-solid border-[rgba(1,63,107,)]">
            <div className="flex flex-row text-[40px] text-[rgb(1,63,107)] mt-[-20px] m-6 p-0">
              <p className="firstname  mr-3">
                {userInputData && userInputData.firstName
                  ? userInputData.firstName
                  : 'Devraj'}
              </p>
              <p className="lastname">
                {userInputData && userInputData['last-name']
                  ? userInputData['last-name']
                  : 'Patil'}
              </p>
            </div>
            <hr className="w-[300px] border -mt-5 border-solid border-[rgb(1,63,107)]" />
            <div className="text-xl text-[rgb(1,63,107)] m-0 p-0">
              <p>
                {userInputData && userInputData['email-address']
                  ? userInputData['email-address']
                  : 'cdc@cdc.cdc'}
              </p>
              <div className="flex flex-row">
                <p>
                  {' '}
                  {userInputData && userInputData['city-code']
                    ? userInputData['city-code']
                    : 'city code'}
                </p>
                <p>
                  {userInputData && userInputData.state
                    ? userInputData.state
                    : 'state'}
                </p>
                <p>
                  {' '}
                  {userInputData && userInputData.country
                    ? userInputData.country
                    : 'country'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-3/4 w-full bg-[rgb(192,219,255)]">
        <div className="bg-[rgba(255,255,255,0.448)] w-[720px]  mt-[70px] m-[38px] rounded-[25px]">
          <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
            About me
          </h2>
          <div className="text-[17px] text-[rgb(77,77,77)] m-[15px]">
            {userInputData && userInputData.description ? (
              userInputData.description
            ) : (
              <p>
                Human resources generalist with 8 years of experience in HR,
                including hiring and terminating, disciplining employees and
                helping department managers improve employee performance. Worked
                with labor unions to negotiate compensation packages for
                workers. Organized new hire training initiatives as well as
                ongoing training to adhere to workplace safety standards. Worked
                with OSHA to ensure that all safety regulations are followed.
              </p>
            )}
          </div>
        </div>

        <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
        <div className="flex flex-row items-start">
          <div className="bg-[rgba(255,255,255,0.448)] w-[720px]  m-[38px] rounded-[25px]">
            <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
              Skills
            </h2>
            {userInputData &&
            userInputData.skills &&
            userInputData.skills.length > 0 ? (
              userInputData.skills.map((skill, index) => (
                <ul
                  className="skills text-md m-[15px] text-[rgb(252,255,250)] text-gray-500   flex items-center  w-[60%]   "
                  key={index}
                >
                  <li
                    className={`skillLevel w-[${skill[1]}%] p-[2px]  rounded-sm  bg-[#79a1c8] mr-[15px] text-white text-center text-[10px]`}
                  >
                    {skill[1]}%
                  </li>
                  <li className="updated-skill  ">{skill[0]}</li>
                </ul>
              ))
            ) : (
              <ul className="text-[17px] text-[rgb(77,77,77)] m-[15px] mt-[-10px]">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node</li>
              </ul>
            )}
          </div>
          <div className="experience mt-[25px]">
            <p className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
              Experience
            </p>
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

        <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
        <div className="bg-[rgba(255,255,255,0.448)] w-[720px]  m-[38px] rounded-[25px]">
          <div className="flex flex-col px-4 ">
            <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] mt-2">
              Education
            </h2>

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
          </div>
        </div>
        {/* Adding additional sections based on userData */}
        {/* Projects */}
        {userInputData &&
        userInputData.projects &&
        userInputData.projects.length > 0 ? (
          <div>
            <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
            <div className="projectsD3  bg-[rgba(255,255,255,0.448)] w-[720px] overflow-x-hidden  m-[38px]  rounded-[25px]">
              <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
                Projects
              </h2>
              {userInputData.projects.map((project) => {
                return (
                  <ul
                    key={project.id}
                    className=" text-[rgb(77,77,77)] m-[15px] "
                  >
                    <li className=" w-full  text-black ">
                      <div className="project-header flex flex-row gap-[15px] items-center">
                        <h2 className="text-[23px] heading-D3">
                          {project.Heading}
                        </h2>
                        <a
                          href={project.Link}
                          className="text-md text-cyan-600 cursor-pointer"
                        >
                          {project.Link}
                        </a>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.description,
                        }}
                      />
                    </li>
                  </ul>
                );
              })}
            </div>
            <hr />
          </div>
        ) : null}

        {/*Certificates*/}
        {userInputData &&
        userInputData.certificates &&
        userInputData.certificates.length > 0 ? (
          <>
            <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
            <div className="certificates bg-[rgba(255,255,255,0.448)] w-[720px]  m-[38px] rounded-[25px] ">
              <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
                Certificates
              </h2>
              {userInputData.certificates.map((certificate, index) => {
                return (
                  <ul
                    key={index}
                    className="text-[15px] text-gray-500 leading-5  pt-2 flex flex-col gap-[10px] m-[15px] "
                  >
                    <div className="flex gap-[10px]">
                      <h2 className=" font-bold">
                        {certificate.Certificate_Name}
                      </h2>
                      <a
                        href={certificate.Certificate_Link}
                        className="text-md text-cyan-600 cursor-pointer"
                      >
                        {certificate.Certificate_Link}
                      </a>
                    </div>
                    <div className=" flex gap-[10px]">
                      <h3>{certificate.Institute}</h3> |
                      <span>{certificate.startDate}</span>
                    </div>
                  </ul>
                );
              })}
            </div>
          </>
        ) : null}
        {/* Languages */}
        {userInputData &&
        userInputData.language &&
        userInputData.language.length > 0 ? (
          <>
            <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
            <div className="languagesD3 bg-[rgba(255,255,255,0.448)] w-[720px]  m-[38px] rounded-[25px] ">
              <h2 className="text-[25px] font-[bold] text-[rgb(99,133,255)] m-[15px]">
                Languages
              </h2>
              {userInputData.language.map((lan, index) => {
                return (
                  <ul
                    key={index}
                    className="text-[17px] text-[rgb(77,77,77)] m-[15px]"
                  >
                    <li className="list-item-D3 text-black  w-[150px]">
                      {lan[0]} - {lan[1]}
                    </li>
                  </ul>
                );
              })}
            </div>
          </>
        ) : null}

        {/* Custom Form */}
        {userInputData && userInputData.customData
          ? userInputData.customData.map((customData) => {
              return (
                <div key={customData.id}>
                  <hr className="w-[650px] border ml-[65px] mt-5 border-solid border-[rgb(1,63,107)]" />
                  <div className="customD3  bg-[rgba(255,255,255,0.448)] w-[720px] overflow-x-hidden m-[38px] rounded-[25px]">
                    <ul className=" text-[17px] text-[rgb(77,77,77)] m-[15px] ">
                      <li className=" w-full  text-black ">
                        <h1 className="text-[25px] font-[bold] text-[rgb(99,133,255)]  ">
                          {customData.Custom_Heading}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: customData.description,
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Template2;
