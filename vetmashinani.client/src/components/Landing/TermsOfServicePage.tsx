import React from 'react';
import { Box, Container } from '@mui/material';
import Terms from './Terms';

class TermsOfServicePage extends React.Component {
    render() {
        return (
            <Box
                sx={{
                    backgroundColor: '#eaeff1',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '60px 0',
                }}
            >
                <Container maxWidth="lg">
                    <main
                        className="main"
                        style={{
                            backgroundColor: '#ffffff',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '40px',
                        }}
                    >
                        <Terms />
                    </main>
                </Container>
            </Box>
        );
    }
}

export default TermsOfServicePage;
