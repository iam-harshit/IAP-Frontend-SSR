import { LuMoveRight } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '@/Reducers/userSlice';
import { RxCross2 } from 'react-icons/rx';
import PhoneForm from '@/Components/core/authModalSteps/CountrySelector';
import toast from 'react-hot-toast';
export const AuthModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true);
  const [lastStep, setLastStep] = useState(false);

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    country: '',
  });

  const handleAuthSubmit = async () => {
    try {
      toast.loading('Signing Up...');
      const res = await fetch('/api/v1/auth/google-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...signupData }),
      });
      const data = await res.json();

      if (data.success === false) {
        toast.dismiss();
        toast.error('Something went wrong');
        return;
      }

      toast.dismiss();
      toast.success('Signed Up Successfully');
      //dispatch(setToken(data.token))
      dispatch(signInSuccess(data?.data?.users));
      navigate('/'); // Will redirect to dashboard :warning:
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    }
  };
  useEffect(() => {
    // console.log(signupData);

    setUserData({
      fullName: signupData?.fullName,
      email: signupData?.email,
    });
  }, []);

  return (
    isOpen && (
      <div className="bg-[#9484B0] bg-opacity-70 fixed h-screen w-screen top-0 left-0 flex justify-center items-center z-[50] overflow-hidden">
        <div className=" p-3 bg-white bg-opacity-75 rounded-2xl lg:w-[46rem]">
          <div className="bg-white border-[4px] border-[#6734BB] border-dashed rounded-xl max-h-fit min-h-[250px] sm:h-fit lg:h-fit flex  justify-start items-center overflow-hidden p-4 gap-3">
            <button
              className="absolute top-0 right-0 m-2"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <RxCross2 size={24} />
            </button>
            {/* Image side */}
            <div className=" overflow-hidden rounded-lg relative z-10 max-w-[20rem] hidden sm:block md:block lg:block xl:block">
              <img
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className=" relative object-cover h-[26.8rem] w-[20rem] mr-5"
              />
              <div className="flex justify-end gap-3 flex-col top-0 absolute z-[1000] h-full w-full rounded-lg bg-gradient-to-t from-gray-900 to-transparent">
                <div className=" p-3">
                  <p className=" text-xl   font-semibold text-white mb-2">
                    Steps
                  </p>
                  <div className=" flex gap-2 my-2">
                    <div
                      className={`${
                        isFirst ? 'bg-gray-200' : 'bg-[#A965FF]'
                      } h-2 flex bg-opacity-75 flex-grow rounded-lg`}
                    ></div>
                    <div
                      className={`${
                        signupData?.phonenumber === undefined
                          ? 'bg-gray-200'
                          : 'bg-[#A965FF]'
                      } bg-opacity-75 h-2 flex flex-grow rounded-lg`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-grow justify-center">
              <div>
                {/* <div className="flex w-full justify-center mt-2">
                <div className="h-10 w-10 flex justify-center p-2 items-center bg-transparent border-2 border-purple-700 border-dashed rounded-full text-purple-500">
                  <Lock />
                </div>
              </div> */}
                <div className=" w-[93%] mx-auto mt-3">
                  {lastStep === false ? (
                    <div>
                      <h2 className={`text-2xl font-bold text-start`}>
                        Confirm <br /> Your Details
                      </h2>
                      <p className=" ml-1 text-sm text-gray-500 text-start mt-1">
                        to complete signup
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h2 className={`text-2xl font-bold text-center`}>
                        Create <br /> Your Account
                      </h2>
                    </div>
                  )}
                </div>
                {isFirst ? (
                  <div className="flex flex-col p-3 gap-3 h-full items-start">
                    <div className="text-start flex flex-col justify-center w-full">
                      <label htmlFor="name">Full Name</label>
                      {
                        {
                          /* console.log(userData?userData:null) */
                        }
                      }
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={userData?.fullName}
                        onChange={(e) =>
                          setUserData({ ...userData, fullName: e.target.value })
                        }
                        className="border border-gray-800 rounded-md bg-gray-100 w-[100%]"
                      />
                    </div>
                    <div className="text-start flex flex-col justify-center w-full pointer-events-none">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData?.email ?? ''}
                        onChange={() => {}}
                        className="border border-gray-800 rounded-md bg-gray-100 w-[100%] opacity-80"
                      />
                    </div>
                    <div className=" flex flex-wrap gap-3 w-[100%] mt-1">
                      <div
                        className={`${
                          userData.role === 'mentor'
                            ? 'border-[#9A54F4]'
                            : ' border-transparent'
                        } bg-[#EBEBEB] flex flex-grow justify-center px-3 py-1 rounded-md border-2 hover:border-[#9A54F4] cursor-pointer`}
                        onClick={() => {
                          setUserData({ ...userData, role: 'mentor' });
                        }}
                      >
                        Mentor
                      </div>
                      <div
                        className={`${
                          userData.role === 'mentee'
                            ? 'border-[#9A54F4]'
                            : ' border-transparent'
                        } bg-[#EBEBEB] flex flex-grow justify-center px-2 py-1 rounded-md border-2 hover:border-[#9A54F4] cursor-pointer`}
                        onClick={() => {
                          setUserData({ ...userData, role: 'mentee' });
                  
                        }}
                      >
                        Mentee
                      </div>
                      <div
                        className={`${
                          userData.role === 'organization'
                            ? 'border-[#9A54F4]'
                            : ' border-transparent'
                        } bg-[#EBEBEB] flex flex-grow justify-center px-2 py-1 rounded-md border-2 hover:border-[#9A54F4] cursor-pointer`}
                        onClick={() => {
                          setUserData({ ...userData, role: 'organization' });
                   
                        }}
                      >
                        Organization
                      </div>
                    </div>
                    <button
                      className="mt-2 flex w-full bg-[#8200FF] px-3 py-2 justify-center rounded-md text-white gap-1"
                     
                    >
                      Confirm <LuMoveRight className=" ml-1" />
                    </button>
                  </div>
                ) : signupData?.country === undefined ? (
                  <div>
                    <PhoneForm
                      setUserData={setUserData}
                      userData={userData}
                      isFirstHandler={setIsFirst}
                      setLastStep={setLastStep}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 h-full w-full justify-start items-start p-3 my-3">
                    <button
                      className="bg-[#8200FF] py-2 px-3 rounded-md text-white"
                      onClick={handleAuthSubmit}
                    >
                      Complete Signup
                    </button>
                    <button
                      className="bg-[#e8e8e8] py-2 px-3 rounded-md text-black w-full"
                   
                    >
                      back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
