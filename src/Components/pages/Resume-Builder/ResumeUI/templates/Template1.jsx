import { useSelector } from 'react-redux';
import {
  selectEducationData,
  selectExperienceData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';

function Template1() {
  const userInputData = useSelector(selectUserData);
  const userExperienceData = useSelector(selectExperienceData);
  const userEducationData = useSelector(selectEducationData);
  return (
    // <div
    //   className="w-[210mm] h-[297mm] lg:max-h-[297mm] lg:overflow-auto flex flex-row  border-[2px] border-[rgb(0 0 0)]  "

    // >
    //       <div
    //   className="w-[210mm] h-[297mm] lg:max-h-[842px] lg:overflow-hidden flex flex-row  "
    // >
    <div className="w-[210mm]   flex flex-row border border-gray-300 ">
      <div className="bg-[rgb(39,55,85)] w-[150%] text-[rgb(252,255,250)]   grow">
        <div className="leftimgbox">
          <div className="img">
            <div className="w-[200px] h-[200px] bg-[black] ml-10 mt-10 p-2.5 rounded-[50%]"></div>
          </div>
          <div className="mt-[-0px] text-15px lg:text-[40px] font-bold ml-10 flex">
            <p className="text-[rgb(252,255,250)] firstname">
              {userInputData && userInputData.firstName
                ? userInputData.firstName
                : 'Devraj'}
            </p>
            <p className="text-[rgb(252,255,250)] lastname ml-2">
              {userInputData && userInputData['last-name']
                ? userInputData['last-name']
                : 'Patil'}
            </p>
          </div>
          <div className="text-xl font-medium mt-[-0px] ml-[70px]">
            <p className="emailaddress">
              {userInputData && userInputData['email-address']
                ? userInputData['email-address']
                : 'gmail@gmail.com'}
            </p>
            <p className="Address">
              {userInputData && userInputData.address
                ? userInputData.address
                : 'Belgian tower'}
              ,
              {userInputData && userInputData.city
                ? userInputData.city
                : 'Paris'}
            </p>
            <p className="citycode">
              {userInputData && userInputData['city-code']
                ? userInputData['city-code']
                : '12345'}
            </p>
            <p className="state">
              {userInputData && userInputData.state
                ? userInputData.state
                : 'state'}
            </p>
            <p className="country">
              {userInputData && userInputData.country
                ? userInputData.country
                : 'Country'}
            </p>
          </div>
        </div>

        <div className="w-4/5 bg-white text-[rgb(219,219,219)] ml-10 mt-5">
          <hr />
        </div>
        <div className="text-[rgb(255,255,255)] ml-10 mt-5 ">
          <h3 className="text-3xl font-semibold text-[rgb(252,255,250)] mt-[60px]">
            EDUCATION
          </h3>

          {userEducationData && userEducationData.length > 0 ? (
            <>
              {userEducationData.map((edu, index) => (
                <div
                  key={index}
                  className="edu-1 flex-col justify-start  flex items-start w-[80%] gap-3 font-serif pt-2 lg:w-[100%]"
                >
                  <div className="duration flex gap-x-2">
                    <h2>{edu.degree}</h2>
                    <span className="text-[15px] text-[rgb(219,219,219)]">
                      {edu.schoolName} | {edu.startDate} - {edu.endDate}
                    </span>
                  </div>

                  <div className="duration text-[15px] text-[rgb(219,219,219)]">
                    {edu.description}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>
              <div>
                <h2>{'Masters in Human Resources'}</h2>
                <div className="duration text-[15px] text-[rgb(219,219,219)]">
                  {'The University of Texas, Dallas '} | {'Start Date'} -{' '}
                  {'End Date'}
                </div>
              </div>
              <div>
                <h2>{'Masters in Human Resources'}</h2>
                <div className="duration text-[15px] text-[rgb(219,219,219)]">
                  {'The University of Texas, Dallas '} | {'Start Date'} -{' '}
                  {'End Date'}
                </div>
              </div>
            </div>
          )}

          <div className=" font-medium  mt-[35px] ">
            <h2 className="text-3xl font-semibold text-[rgb(252,255,250)]">
              Skills
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
                    className={`skillLevel w-[${skill[1]}%] p-[2px]  rounded-sm  bg-white mr-[15px] text-black text-center text-[10px]`}
                  >
                    {skill[1]}
                  </li>
                  <li className="updated-skill  text-[rgb(252,255,250)]">
                    {skill[0]}
                  </li>
                </ul>
              ))
            ) : (
              <ul className="pt-5 text-lg  text-[rgb(252,255,250)] ">
                <li className="mt-2">First</li>
                <li className="mt-2">Fdfsrdst</li>
                <li className="mt-2">sdgsdgt</li>
                <li className="mt-2">Fisdg</li>
              </ul>
            )}
          </div>
          {/* Adding additional sections based on userData */}
          {/* Languages */}
          {userInputData &&
          userInputData.language &&
          userInputData.language.length > 0 ? (
            <>
              <h3 className="text-3xl font-semibold text-[rgb(252,255,250)] mt-[60px]">
                LANGUAGES
              </h3>
              {userInputData.language.map((lan, index) => {
                return (
                  <ul key={index} className="">
                    <li className="list-item-D1 text-l font-medium text-[rgb(224,231,239)] pt-[10px]">
                      {lan[0]} - {lan[1]}
                    </li>
                  </ul>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

      <div className="bg-[#FFFFFF] ">
        <div className="text-xl font-medium text-black ml-10 mt-20 ">
          <h2 className="text-3xl font-bold text-[rgb(2,4,2)]">Profile</h2>
          {userInputData && userInputData.description ? (
            userInputData.description
          ) : (
            <p className="mt-5 text-base font-medium text-[rgb(89,88,90)] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Explicabo veritatis mollitia voluptates reiciendis deleniti error
              quasi dolorum dignissimos rem? Adipisci error facere aspernatur
              delectus consequatur dolorem ducimus eligendi hic omnis.
            </p>
          )}
        </div>

        <div className="text-xl font-medium text-black ml-10 mt-5">
          <h2 className="text-3xl font-semibold text-[rgb(2,4,2)]">
            Professional Experience
          </h2>

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
                    className=" text-base font-medium text-[rgb(89,88,90)]"
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
              <ul className="text-base font-medium text-[rgb(89,88,90)] lg:leading-[25px]">
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
                  Monitor scheduled in and out times as well as employee breaks
                  to ensure that proper employment laws are met
                </li>
              </ul>

              <div className="exp-1 flex items-center w-[70%] gap-3 font-serif pt-2 lg:w-[100%]">
                <h2>{'Manager'}</h2>
                <div className="duration text-gray-500 ">
                  {'XYZ company'} | {'Start Date - End Date'}
                </div>
              </div>
              <ul className="text-base font-medium text-[rgb(89,88,90)] lg:leading-[25px]">
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
                  Monitor scheduled in and out times as well as employee breaks
                  to ensure that proper employment laws are met
                </li>
              </ul>
            </>
          )}
        </div>
        {/* Adding additional sections based on userData */}
        {/* Projects */}
        {userInputData &&
        userInputData.projects &&
        userInputData.projects.length > 0 ? (
          <>
            <div className="text-xl font-medium text-black ml-10 mt-5">
              <h2 className="text-3xl font-semibold text-[rgb(2,4,2)]">
                Projects
              </h2>
              {userInputData.projects.map((project) => {
                return (
                  <ul key={project.id} className="pt-5 text-lg font-medium">
                    <div className="project-header mt-2 text-base ">
                      <h2 className="text-2xl heading-D1">{project.Heading}</h2>
                      <a
                        href={project.Link}
                        className="text-md text-cyan-600 cursor-pointer"
                      >
                        {project.Link}
                      </a>
                    </div>
                    <div
                      className="max-w-[400px] text-base font-medium text-[rgb(89,88,90)] text-wrap pt-[10px]"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </ul>
                );
              })}
            </div>
          </>
        ) : null}

        {/* Certificates */}
        {userInputData &&
        userInputData.certificates &&
        userInputData.certificates.length > 0 ? (
          <>
            <div className="text-xl font-medium text-black ml-10 mt-5">
              <h2 className="text-3xl font-semibold text-[rgb(2,4,2)]">
                Certificates
              </h2>
              {userInputData.certificates.map((certificate, index) => {
                return (
                  <ul
                    key={index}
                    className="text-[15px] text-gray-500 leading-5  pt-2 flex flex-col gap-[10px]"
                  >
                    <div className="flex gap-[10px] pt-[30px]">
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
                    <div className=" flex gap-[10px]">
                      <h3>{certificate.Institute}</h3>
                      <span>|</span>
                      <span>{certificate.startDate}</span>
                    </div>
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
                <ul
                  key={customData.id}
                  className="pt-5 text-lg font-medium ml-10"
                >
                  <div className="project-header mt-2 text-base ">
                    <h2 className=" text-3xl font-semibold text-[rgb(2,4,2)]">
                      {' '}
                      {customData.Custom_Heading}
                    </h2>
                    <div
                      className="max-w-[400px] text-wrap text-base font-medium text-[rgb(89,88,90)] pt-[10px]"
                      dangerouslySetInnerHTML={{
                        __html: customData.description,
                      }}
                    />
                  </div>
                </ul>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Template1;
