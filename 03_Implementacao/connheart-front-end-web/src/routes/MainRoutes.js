import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Admin from '../views/pages/Admin';
import Planos from '../views/pages/Planos';
import PlanosClient from '../views/pages/Planos/client';
import Users from '../views/pages/Users';
import UsersAdd from '../views/pages/UsersAdd';

import { RequireAuth } from 'aws-auth-lib';
import QuestionnaireBuilder from '../views/pages/QuestionnaireBuilder';
import QuestionnaireManagerPatient from '../views/pages/QuestionnaireViewer/index_paciente';
//import FilledFormsViewer from '../views/pages/QuestionnaireBuilder/FilledFormViewer';
import { RoleContext, useRole } from '../utils/RoleContext';
import QuestionnaireManager from '../views/pages/QuestionnaireBuilder';
import FilledFormsViewer from '../views/pages/QuestionnaireBuilder/FilledFormViewer';

// dashboard routing
const MedicDashboard = Loadable(lazy(() => import('views/dashboard/Medic')));
const ClientDashboard = Loadable(lazy(() => import('views/dashboard/Client')));
const MedicSinais = Loadable(lazy(() => import('views/pages/Sinais/Medic')));
const ClientSinais = Loadable(lazy(() => import('views/pages/Sinais/Client')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ===========================|| MAIN ROUTING ||=========================== //
// ProtectRoute component
function ProtectRoute({ children }) {
    const action = () => <Navigate to="/login" replace />;
    return (
        <RequireAuth action={action}>
            <MainLayout />
        </RequireAuth>
    );
}

// Role-based main routes
const getMainRoutes = (role) => {
    switch (role) {
        case 'DOCTOR':
            return [
                {
                    path: '/',
                    element: <MedicDashboard />
                },
                {
                    path: '/medicSinais', // new route
                    element: <MedicSinais />
                },
                {
                    path: '/dashboard/default',
                    element: <MedicDashboard />
                },
                {
                    path: '/admin',
                    element: <Admin />
                },
                {
                    path: '/users',
                    element: <Users />
                },
                {
                    path: '/users/add',
                    element: <UsersAdd />
                },
                {
                    path: '/planos',
                    element: <Planos />
                },
                {
                    path: '/questionarios',
                    element: <QuestionnaireManager />
                },
                {
                    path: '/questionarios/paciente', // PACIENTE
                    element: <QuestionnaireManagerPatient />
                },
                {
                    path: '/questionarios-preenchidos/:pacienteNumUtenteSaude',
                    element: <FilledFormsViewer />
                },
                {
                    path: '/agenda',
                    element: <MedicDashboard />
                },
                {
                    path: '/utils/util-typography',
                    element: <UtilsTypography />
                },
                {
                    path: '/utils/util-color',
                    element: <UtilsColor />
                },
                {
                    path: '/utils/util-shadow',
                    element: <UtilsShadow />
                },
                {
                    path: '/icons/tabler-icons',
                    element: <UtilsTablerIcons />
                },
                {
                    path: '/icons/material-icons',
                    element: <UtilsMaterialIcons />
                },
                {
                    path: '/sample-page',
                    element: <SamplePage />
                }
            ];
        case 'PATIENT':
            return [
                {
                    path: '/',
                    element: <ClientDashboard />
                },
                {
                    path: '/dashboard', // new route
                    element: <ClientDashboard />
                },
                {
                    path: '/clientSinais', // new route
                    element: <ClientSinais />
                },
                {
                    path: '/dashboard/default',
                    element: <ClientDashboard />
                },
                {
                    path: '/admin',
                    element: <Admin />
                },
                {
                    path: '/users',
                    element: <Users />
                },
                {
                    path: '/users/add',
                    element: <UsersAdd />
                },
                {
                    path: '/questionarios',
                    element: <QuestionnaireManager />
                },
                {
                    path: '/planos',
                    element: <PlanosClient />
                },
                {
                    path: '/questionarios/paciente',
                    element: <QuestionnaireManagerPatient />
                },
                {
                    path: '/questionarios-preenchidos/:pacienteNumUtenteSaude',
                    element: <FilledFormsViewer />
                },
                {
                    path: '/agenda',
                    element: <ClientDashboard />
                },
                {
                    path: '/utils/util-typography',
                    element: <UtilsTypography />
                },
                {
                    path: '/utils/util-color',
                    element: <UtilsColor />
                },
                {
                    path: '/utils/util-shadow',
                    element: <UtilsShadow />
                },
                {
                    path: '/icons/tabler-icons',
                    element: <UtilsTablerIcons />
                },
                {
                    path: '/icons/material-icons',
                    element: <UtilsMaterialIcons />
                },
                {
                    path: '/sample-page',
                    element: <SamplePage />
                }
            ];
        default:
            return [];
    }
};

export { ProtectRoute };
export default getMainRoutes;
