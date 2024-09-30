import { useEffect } from 'react';
import { useRole } from './RoleContext';
import { api } from '../services/Api';

const FetchUserRoleComponent = ({ token }) => {
    const { setRole } = useRole();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await api.get('http://localhost:8000/role', {
                    headers: {
                        'AUTH-TOKEN-AWS': token
                    }
                });

                if (response && response.data && response.data.roles) {
                    const roles = response.data.roles;
                    const isDoctor = roles.some((role) => role.name === 'DOCTOR');
                    const isPatient = roles.some((role) => role.name === 'PATIENT');

                    if (isDoctor) {
                        sessionStorage.setItem('role', 'DOCTOR');
                        setRole('DOCTOR');
                    } else if (isPatient) {
                        sessionStorage.setItem('role', 'PATIENT');
                        setRole('PATIENT');
                    } else {
                        sessionStorage.setItem('role', 'NOT_FOUND');
                        setRole('NOT_FOUND');
                    }

                    console.log('role', sessionStorage.getItem('role'));
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                sessionStorage.setItem('role', 'NOT_FOUND');
                setRole('NOT_FOUND');
                console.error('Error fetching user role:', error);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                }
            }
        };

        fetchUserRole()
            .then((r) => console.log('Role fetched'))
            .catch((e) => console.error('Error fetching role:', e));
    }, [token, setRole]);

    return null; // component doesn't render anything
};

export default FetchUserRoleComponent;
