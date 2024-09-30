import { Provider } from 'react-redux';
import 'assets/scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { reducer } from 'store';
import App from 'App';
import { AmplifyProvider } from 'aws-auth-lib';
import config from './amplifyconfiguration.json';
import { RoleProvider } from './utils/RoleContext';

// ==============================|| REACT DOM RENDER  ||============================== //

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <AmplifyProvider config={config}>
        <Provider store={reducer}>
            <RoleProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </RoleProvider>
        </Provider>
    </AmplifyProvider>
);
