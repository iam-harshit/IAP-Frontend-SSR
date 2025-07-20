import toast from "react-hot-toast";

// Generic function to handle adding entries
export const handleAddEntry = (entryType, formData, setFormData, setWorkDataList, setEduList) => {
    if (entryType === 'work') {
        const newWorkEntry = {
            company: formData?.company,
            title: formData?.title,
            companyWebsite: formData?.companyWebsite,
            startDate: formData?.c_startDate,
            endDate: formData?.c_endDate,
        };

        if (
            formData?.company &&
            formData?.title &&
            formData?.companyWebsite,
            formData?.c_startDate &&
            (formData?.c_endDate || formData?.currentlyWorking)
        ) {
            setWorkDataList((prevList) => [...prevList, newWorkEntry]);
            toast.success('Work Experience Added Successfully');
            setFormData((prev) => ({
                ...prev,
                company: '',
                title: '',
                companyWebsite: '',
                c_startDate: '',
                c_endDate: '',
                currentlyWorking: false,
            }));
        } else {
            toast.error('Please fill all work experience fields');
        }
    }

    if (entryType === 'education') {
        const newEducationEntry = {
            institution: formData?.institution,
            degree: formData?.degree,
            startYear: formData?.startYear,
            endYear: formData?.endYear,
        };

        if (
            formData?.institution &&
            formData?.degree &&
            formData?.startYear &&
            formData?.endYear
        ) {
            setEduList((prevList) => [...prevList, newEducationEntry]);
            toast.success('Education Added Successfully');
            setFormData((prev) => ({
                ...prev,
                institution: '',
                degree: '',
                startYear: '',
                endYear: '',
            }));
        } else {
            toast.error('Please fill all education fields');
        }
    }
};

// Generic function to handle Editing entries
export const handleEditEntry = (entryType, formData, setFormData, workIndex, eduIndex, workDataList, setWorkDataList, eduList, setEduList, setWorkIndex, setEduIndex, setEdit) => {
    console.log(eduList, "eduList");
    if (entryType === 'work' && workIndex !== null) {
        const updatedList = workDataList?.map((item, idx) =>
            idx === workIndex
                ? {
                    company: formData?.company,
                    title: formData?.title,
                    companyWebsite: formData?.companyWebsite,
                    startDate: formData?.c_startDate,
                    endDate: formData?.c_endDate,
                    currentlyWorking: formData?.currentlyWorking,
                }
                : item
        );

        setWorkDataList(updatedList);
        toast.success('Work Details Updated successfully');
        setEdit(false);
        setWorkIndex(null);
        setFormData((prev) => ({
            ...prev,
            company: '',
            title: '',
            companyWebsite: '',
            c_startDate: '',
            c_endDate: '',
            currentlyWorking: false,
        }));
    } else if (entryType === 'education' && eduIndex !== null) {
        const updatedList = eduList.map((item, idx) =>
            idx === eduIndex
                ? {
                    institution: formData?.institution,
                    degree: formData?.degree,
                    startYear: formData?.startYear,
                    endYear: formData?.endYear,
                }
                : item
        );

        setEduList(updatedList);
        toast.success('Education Details Updated successfully');
        setEdit(false);
        setEduIndex(null);
        setFormData((prev) => ({
            ...prev,
            institution: '',
            degree: '',
            startYear: '',
            endYear: '',
        }));
    }
};

// Generic function to handle deleting entries
export const handleDeleteEntry = (entryType, index, setWorkDataList, setEduList) => {
    if (entryType === 'work') {
        setWorkDataList((prevList) => prevList?.filter((_, idx) => idx !== index));
    } else if (entryType === 'education') {
        setEduList((prevList) => prevList?.filter((_, idx) => idx !== index));
    }
};