import { useSelector } from 'react-redux';
import {
  selectEducationData,
  selectExperienceData,
  selectUserData,
} from '../../../../../Reducers/ResumeBuilderFormDataSlice.js';
function Template4() {
  const userInputData = useSelector(selectUserData);
  const userExperienceData = useSelector(selectExperienceData);
  const userEducationData = useSelector(selectEducationData);
  const techSkill = ['Frontend', 'Backend', 'Testing', 'Devops'];

  return (
    <>
      <div
        className=" w-[794px]  bg-white flex border border-gray-200"
        // style={{ transform: "scale(0.7)", marginTop: "-150px" }}
      >
        <div className="left-box">
          <div className="profile-space w-[200px] h-[200px] bg-white mt-10 mx-10 ml-[100px] rounded-[300px] border-[5px] border-solid border-[gold]" />
          <div className="top-curve w-[400px]  bg-[gold] mx-2.5 my-[50px] rounded-[50px_50px_0px_0px] grow">
            <div className="data">
              <div className="about-right h-auto pt-px text-center px-5">
                <h1 className="text-center text-[40px] pt-2.5 text-3xl my-10">
                  About Me
                </h1>
                {userInputData && userInputData.description ? (
                  userInputData.description
                ) : (
                  <p className="text-left px-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero quisquam modi suscipit hic deleniti totam sint
                    tempore vel velit! Perspiciatis, molestias maiores totam,
                    minima excepturi accusantium nesciunt deserunt suscipit illo
                    officia eaque blanditiis. Deserunt eveniet veritatis, sunt,
                    quos, quis provident possimus illo eligendi veniam est
                    molestias? Dicta, quo quod. Repudiandae. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Aperiam laborum quam
                    animi nihil officia, illum velit expedita commodi, ex
                    aspernatur soluta unde doloribus, libero saepe.
                  </p>
                )}
              </div>
              <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />

              <div className="Technical-skills   flex flex-wrap ">
                {userInputData &&
                userInputData.skills &&
                userInputData.skills.length > 0 ? (
                  userInputData.skills.map((skill, index) => (
                    <ul
                      className="pt-[15px]   flex items-center  ml-[35px]  w-[60%]  "
                      key={index}
                    >
                      <li
                        className={`skillLevel w-[${skill[1]}%] p-[3px]  rounded-lg  bg-white mr-[15px] text-[#ffd700] text-center text-[10px]`}
                      >
                        {skill[1]}
                      </li>
                      <li className="updated-skill  ">{skill[0]}</li>
                    </ul>
                  ))
                ) : (
                  <div className="Technical-skills grid grid-cols-[repeat(2,1fr)] m-5 p-5 gap-[10px]">
                    {techSkill.map((item, index) => {
                      return (
                        <div className="TechSkill" key={index}>
                          <p>{item}</p>
                          <div className="progressbox w-[150px] h-5 bg-white mb-2.5 rounded-[10px]" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />

            {/* Adding additional sections based on userData */}
            {/* Languages */}
            {userInputData &&
            userInputData.language &&
            userInputData.language.length > 0 ? (
              <>
                <h1 className="text-center text-[40px] pt-2.5 text-3xl my-10">
                  Languages
                </h1>
                {userInputData.language.map((lan, index) => {
                  return (
                    <ul key={index} className="flex justify-center mb-[15px]">
                      <div className=" w-3 h-2.5 bg-[rgb(255,255,255)] m-2.5 rounded-[50px]" />
                      <li className="text-black  w-[150px]">
                        {lan[0]} - {lan[1]}
                      </li>
                    </ul>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
        <div className="right-box bg-white w-[400px]  border-[50px_0px_20px_0px] border-solid border-t-[35px] border-b-[20px] border-[gold]">
          <h1 className="name-right pt-[45px] text-center text-[40px] ">
            {userInputData && userInputData.firstName
              ? userInputData.firstName
              : 'Saksham'}{' '}
            {userInputData && userInputData['last-name']
              ? userInputData['last-name']
              : 'Gupta'}
          </h1>
          <h4 className="jobmain-right text-center pt-2.5">
            {userExperienceData
              ? userExperienceData[userExperienceData.length - 1]?.Job_Title
              : 'MERN Stack Developer'}
          </h4>
          <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />
          <br /> <br />
          <div className="contact-box">
            <div className="valdetail text-end text-[15px] font-[Medium] mx-10 my-5">
              <p>
                {userInputData && userInputData['email-address']
                  ? userInputData['email-address']
                  : 'qRr0h@example.com'}
              </p>
            </div>

            <div className="valdetail text-end text-[15px] font-[Medium] mx-10 my-5">
              <p>
                {userInputData && userInputData.address
                  ? userInputData.address
                  : 'S-2 330 Palm Heights'}
                ,
                {userInputData && userInputData.city
                  ? userInputData.city
                  : 'Hyderabad'}{' '}
              </p>
              <p>
                {userInputData && userInputData.state
                  ? userInputData.state
                  : 'Telangana'}
                ,
                {userInputData && userInputData.country
                  ? userInputData.country
                  : 'India'}
              </p>
              <p>
                {userInputData && userInputData.citycode
                  ? userInputData.citycode
                  : '500072'}
              </p>
            </div>
            <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />
          </div>
          <div className="workexp">
            <h2 className="work-right text-center px-5 text-2xl">
              Work Experience
            </h2>
            <div className="px-[15px]">
              {userExperienceData && userExperienceData.length > 0 ? (
                <>
                  {userExperienceData.map((exp, index) => (
                    <div
                      key={index}
                      className="flex-col justify-start exp-1 flex items-start w-[70%] gap-3 font-serif pt-2 lg:w-[100%]"
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
                </>
              )}
            </div>
          </div>
          <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />
          <div className="Professional-skills">
            <h2 className="work-right text-center px-5 text-2xl">Education</h2>
            <div className="px-[15px]">
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
          <hr className="my-4 w-4/5 bg-[aliceblue]  m-auto rounded-[70px] border-2 border-solid border-[aliceblue]" />
          {/* Projects */}
          {userInputData &&
          userInputData.projects &&
          userInputData.projects.length > 0 ? (
            <>
              <h2 className=" text-center px-5 text-2xl mt-[30px]">Projects</h2>
              {userInputData.projects.map((project) => {
                return (
                  <ul key={project.id} className="">
                    <li className=" w-full ">
                      <div className="project-header flex flex-row gap-[15px] items-center">
                        <h2 className="text-2xl heading-S2">
                          {project.Heading}
                        </h2>
                        <a
                          href={project.Link}
                          className="text-md text-cyan-600 cursor-pointer max-w-[200px] flex-wrap overflow-x-hidden"
                        >
                          {project.Link}
                        </a>
                      </div>
                      <div
                        className="max-w-[500px] text-wrap pt-[10px] text-[17px] text-[rgb(84,84,84)] "
                        dangerouslySetInnerHTML={{
                          __html: project.description,
                        }}
                      />
                    </li>
                  </ul>
                );
              })}
            </>
          ) : null}
          {/* Certificates */}
          {userInputData &&
          userInputData.certificates &&
          userInputData.certificates.length > 0 ? (
            <>
              <h2 className=" text-center px-5 text-2xl mt-[30px]">
                Certificates
              </h2>
              {userInputData.certificates.map((certificate, index) => {
                return (
                  <ul
                    key={index}
                    className="text-[15px] text-gray-500 leading-5  pt-2 flex flex-col gap-[10px]"
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
                    <div className=" flex gap-[10px]">
                      <h3>{certificate.Institute}</h3> |
                      <span>{certificate.startDate}</span>
                    </div>
                  </ul>
                );
              })}
            </>
          ) : null}
          {/* Custom Form */}
          {userInputData && userInputData.customData
            ? userInputData.customData.map((customData) => {
                return (
                  <ul key={customData.id} className=" ">
                    <li className=" w-full ">
                      <h2 className="text-center px-5 text-2xl mt-[30px]">
                        {customData.Custom_Heading}
                      </h2>
                      <div
                        className="max-w-[700px] text-wrap  text-[17px] text-[rgb(84,84,84)] mt-[15px]"
                        dangerouslySetInnerHTML={{
                          __html: customData.description,
                        }}
                      />
                    </li>
                  </ul>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
export default Template4;
