import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

/**
 * About Component
 * Displays information about the Vet Mashinani platform, including its mission and vision.
 * 
 * @returns {JSX.Element} The About component.
 */
class About extends React.Component {
    render() {
        return (
            <Section id="about">
                <Container data-aos="fade-up" data-aos-delay="100">
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
                        <Box sx={{ flex: 1, mb: 5 }}>
                            <Typography variant="h3" color="white" mb={4}>
                                About Us
                            </Typography>
                            <Typography
                                variant="body1"
                                className="lead"
                                sx={{
                                    lineHeight: 1.8,
                                    textAlign: 'justify',
                                    color: '#fff',
                                }}
                            >
                                <strong>Vet Mashinani</strong> is your trusted partner in veterinary care. We are revolutionizing the way livestock farmers and pet owners in Kenya connect with certified veterinarians. Our platform, available via a user-friendly mobile app, web interface, and accessible USSD code, ensures that high-quality veterinary services are just a click or a call away.
                                <br /><br />
                                But we don't stop there! Vet Mashinani goes beyond just connecting you with veterinary services. We proudly offer a comprehensive agrovet hub for essential veterinary products and foster a vibrant community forum where you can seek expert advice and share experiences. Together, we are not just enhancing animal health; we are committed to elevating farm productivity and implementing crucial animal welfare initiatives that positively impact your livelihood.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 3 }}>
                                <Box sx={{ flex: 1, minWidth: '45%' }} data-aos="fade-up" data-aos-delay="200">
                                    <InfoBox>
                                        <Typography variant="h4" color="white">
                                            Mission
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold" mt={2}>
                                            To bridge the gap between farmers and certified veterinarians.
                                        </Typography>
                                    </InfoBox>
                                </Box>

                                <Box sx={{ flex: 1, minWidth: '45%' }} data-aos="fade-up" data-aos-delay="300">
                                    <InfoBox>
                                        <Typography variant="h4" color="white">
                                            Vision
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold" mt={2}>
                                            To create a thriving community for farmers and veterinarians.
                                        </Typography>
                                    </InfoBox>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Section>
        );
    }
}

const Section = styled('section')({
    backgroundImage: "url('assets/img/about.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '60px 20px',
    color: '#fff',
});

const InfoBox = styled(Box)({
    padding: '2rem',
    margin: '1rem',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export default About;
