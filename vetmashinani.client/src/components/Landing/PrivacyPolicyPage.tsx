import React from 'react';
import PrivacyPolicy from './PrivacyPolicy';

class PrivacyPolicyPage extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <main className="main">
                    <PrivacyPolicy />
                </main>
            </div>
        );
    }
}

export default PrivacyPolicyPage;
