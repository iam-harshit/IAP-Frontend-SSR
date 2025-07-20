import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import HomeSection from '@/Components/pages/Profile-Page/Dashboard-components/Home-Section/HomeSection';
import PaymentSection from '@/Components/pages/Profile-Page/Dashboard-components/Payment-Section/PaymentSection';
import ManageSessions from '@/Components/pages/Profile-Page/Dashboard-components/Sessions-Section/ManageSessions';
import WorkCareerSection from '@/Components/pages/Profile-Page/Form-components/DashboardCareer-Section/WorkCareerSection';
import EditAbout from '@/Components/pages/Profile-Page/Form-components/DashboardAbout-Section/EditAbout';
import LEFI from '@/Components/pages/Profile-Page/Dashboard-components/LEFI/LEFI.jsx';
// Redux and API
import {
  handleMyProfileApi,
  handleUpdateProfileApi,
} from '../../../services/Operations/ProfileOperation/ProfilePageApi';
import toast from 'react-hot-toast';
import CreateEvent from './Dashboard-components/Event-Section/Create-Event/CreateEvent';
import MenteeDetails from './Form-components/DashboardMentee-Section/MenteeDetails';
import MentorDetails from './Form-components/DashboardMentor-Section/MentorDetails';
import BankAccountSection from '@/Components/pages/Profile-Page/Dashboard-components/bank-acount-section/BankAccountSection';
import ViewEvent from './Dashboard-components/Event-Section/View-Event/ViewEvent';
import CertificationSection from './Form-components/DashboardCareer-Section/CertificationSection';
import { signInSuccess } from '@/Reducers/userSlice';
import MyBlog from './Dashboard-components/MyBlog/MyBlog';

const EditSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  // console.log(currentUser)

  // State
  const [formData, setFormData] = useState({
    full_name: currentUser?.name || '',
    city: currentUser?.location?.city || '',
    state: currentUser?.location?.state || '',
    country: currentUser?.location?.country || '',
    pin_code: currentUser?.location?.pincode || '',
    profile_picture_url: currentUser?.profilePicture || '',
    phone_number: '',
    street_address: currentUser?.location?.streetAddress || '',
    description: currentUser?.bio || '',
    category: '',
    company: '',
    title: '',
    companyWebsite: '',
    c_startDate: null,
    c_endDate: null,
    institution: '',
    degree: '',
    specialization: '',
    startYear: null,
    endYear: null,
    platform: '',
    link: '',
    socialLinks: currentUser?.socialMedia || [],
    language: currentUser?.language || [],
    skills: currentUser?.skills || [],
    currentlyWorking: false,
    certificate_title: '',
    certificate_institution: '',
    issueDate: '',
    expirationDate: '',
    credentialsId: '',
    credentialsURL: '',
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar
  // console.log(formData)

  const isMentor = currentUser?.role === 'mentor';

  const { section = 'home' } = useParams();

  const aboutFields = [
    {
      type: 'text',
      name: 'full_name',
      placeholder: 'Full Name',
      value: formData?.full_name,
    },
    {
      type: 'text',
      name: 'street_address',
      placeholder: 'Street Address',
      value: formData?.street_address,
    },
    { type: 'text', name: 'city', placeholder: 'City', value: formData?.city },
    {
      type: 'text',
      name: 'state',
      placeholder: 'State',
      value: formData?.state,
    },
    {
      type: 'number',
      name: 'pin_code',
      placeholder: 'Postal Code',
      value: formData?.pin_code,
    },
  ];
  const EducationFields = [
    {
      type: 'text',
      name: 'institution',
      placeholder: 'Name Of The Institute',
      value: formData?.institution,
    },
    {
      type: 'text',
      name: 'degree',
      placeholder: 'Degree',
      value: formData?.degree,
    },
  ];
  const CareerFields = [
    {
      type: 'text',
      name: 'company',
      placeholder: 'Name Of The Company',
      value: formData?.company,
    },
    {
      type: 'text',
      name: 'title',
      placeholder: 'Job Title',
      value: formData?.title,
    },
    {
      type: 'url',
      name: 'companyWebsite',
      placeholder: 'Company Website',
      value: formData?.companyWebsite,
    },
  ];

  const certificateFields = [
    {
      type: 'text',
      name: 'certificate_title',
      placeholder: 'Certification Title',
      value: formData?.certificate_title,
    },
    {
      type: 'text',
      name: 'certificate_institution',
      placeholder: 'Certification Institution',
      value: formData?.certificate_institution,
    },
    {
      type: 'text',
      name: 'credentialsId',
      placeholder: 'credentialsId',
      value: formData?.credentialsId,
    },
    {
      type: 'url',
      name: 'credentialsURL',
      placeholder: 'credentialsURL',
      value: formData?.credentialsURL,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 990);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [section]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty platform or link values
    const validSocialLinks = formData?.socialLinks?.filter(
      (item) => item.platform.trim() !== '' && item.link.trim() !== ''
    );

    const payload = {
      name: formData?.full_name,
      location: {
        streetAddress: formData?.street_address,
        city: formData?.city,
        state: formData?.state,
        country: formData?.country,
        pincode: formData?.pin_code,
      },
      certifications: formData?.certifications,
      profilePicture: formData?.profile_picture_url,
      bio: formData?.description,
      isActive: true,
      experience: formData?.experience,
      education: formData?.education,
      socialMedia: validSocialLinks,
      language: formData?.language,
      skills: formData?.skills,
    };
    try {
      const response = await handleUpdateProfileApi(
        payload,
        dispatch,
        navigate
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success('Profile updated successfully!');
        // Fetch the latest profile after update
        const profileResponse = await handleMyProfileApi();
        if (
          profileResponse?.status === 200 ||
          profileResponse?.status === 201
        ) {
          dispatch(signInSuccess(profileResponse?.data?.data));
        } else {
          toast.error('Profile updated, but failed to fetch latest data');
        }

        navigate('/profile');
      } else {
        toast.error('Failed to update profile, please try again');
        console.warn('Update failed:', updateResponse);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again later');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render the appropriate section component
  const renderSection = () => {
    switch (section) {
      case 'background-details':
        return (
          <EditAbout
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onChange={handleChange}
            fields={aboutFields}
            loading={loading}
          />
        );
      case 'professional-details':
        return (
          <WorkCareerSection
            formData={formData}
            onSubmit={handleSubmit}
            career={CareerFields}
            education={EducationFields}
            onChange={handleChange}
            setFormData={setFormData}
            loading={loading}
          />
        );
      case 'certification-details':
        return (
          <CertificationSection
            formData={formData}
            onSubmit={handleSubmit}
            certificateFields={certificateFields}
            onChange={handleChange}
            setFormData={setFormData}
            loading={loading}
          />
        );
      case 'mentor-details':
        return <MentorDetails />;
      case 'mentee-details':
        return <MenteeDetails />;
      case 'home':
        return <HomeSection />;
      case 'create-event':
        return isMentor && <CreateEvent />;
      case 'view-event':
        return isMentor && <ViewEvent />;
      case 'manage-events':
        return <ManageSessions />;
      case 'transaction-history':
        return <PaymentSection />;
      case 'bank-details':
        return isMentor && <BankAccountSection />;
      case 'lefi':
        return <LEFI />;
      case 'my-blogs':
        return <MyBlog />;
      default:
        return null;
    }
  };

  return (
    <div className={`${section === 'lefi' ? '' : 'sm:p-4'}`}>
      {renderSection()}
    </div>
  );
};

export default EditSection;
