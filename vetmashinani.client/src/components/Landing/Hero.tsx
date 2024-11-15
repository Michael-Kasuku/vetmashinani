import React, { CSSProperties } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * Hero Component
 * Displays the hero section with a background image and call-to-action buttons.
 */
class Hero extends React.Component {
    // Define styles for the hero section and common button styles
    heroSectionStyle: CSSProperties = {
        position: 'relative',
        backgroundImage: 'url(assets/img/hero.png)', // Ensure this image path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        padding: '60px 20px',
    };

    buttonStyles = {
        zIndex: 3,
        boxShadow: 4,
        textTransform: 'none',
        padding: '12px 30px',
        '&:focus': {
            outline: '2px solid #fff',
            outlineOffset: '2px',
        },
    };

    render() {
        return (
            <section id="hero" className="hero section" style={this.heroSectionStyle}>
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: { xs: 2, sm: 4 },
                        textAlign: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="h4" color="rgba(255, 255, 255, 0.8)" sx={{ mb: { xs: 2, sm: 0 } }}>
                        Bridging the Gap in Veterinary Services
                    </Typography>

                    {/* Button for Veterinary Network */}
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/vetlogin"
                        sx={{
                            ...this.buttonStyles,
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#115293',
                            },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                        aria-label="Join Veterinary Network"
                    >
                        Join Our Veterinary Network
                    </Button>

                    <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" sx={{ margin: '0 8px' }}>
                        or
                    </Typography>

                    {/* Button for Farmer Network */}
                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/farmerlogin"
                        sx={{
                            ...this.buttonStyles,
                            backgroundColor: '#4caf50',
                            '&:hover': {
                                backgroundColor: '#388e3c',
                            },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                        aria-label="Join Farmer Network"
                    >
                        Join Our Farmer Network
                    </Button>
                </Box>
            </section>
        );
    }
}

export default Hero;
