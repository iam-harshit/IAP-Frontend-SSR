export const changeSection = (e, newSection,setEditing,setSection,dispatch,navigate) => {
    e.preventDefault();
    dispatch(setEditing(true));
    dispatch(setSection(newSection));
    navigate(`/dashboard/${newSection}`); // Navigating to section with edit mode
  };