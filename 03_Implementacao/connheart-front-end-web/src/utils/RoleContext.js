import React, { createContext, useContext, useState } from 'react';

// Role context
export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState('PATIENT'); // default role => PATIENT

    return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

// custom hook to use the RoleContext
export const useRole = () => {
    return useContext(RoleContext);
};
