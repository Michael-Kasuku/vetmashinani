import React from 'react';
import { Container, Typography, Link, Divider, Box } from '@mui/material';

class Terms extends React.Component {
    render() {
        return (
            <section
                id="terms"
                style={{
                    padding: '80px 20px',
                    backgroundColor: '#f8f9fa',
                    color: '#2d3436'
                }}
            >
                <Container maxWidth="md">
                    {/* Section Header */}
                    <Box mb={5} textAlign="center">
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 'bold',
                                color: '#0984e3',
                                fontSize: '2.8rem',
                                mb: 1
                            }}
                        >
                            Terms of Service
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#636e72',
                                fontSize: '1.2rem',
                                maxWidth: '80%',
                                margin: '0 auto'
                            }}
                        >
                            Welcome to Vet Mashinani! Please take a moment to read and understand our Terms of Service to ensure the best possible experience on our platform.
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 5 }} />

                    {/* Terms Sections */}
                    {[
                        {
                            title: "Acceptance of Terms",
                            text: "By accessing or using Vet Mashinani, you agree to follow our Terms of Service. If you disagree with any of the terms outlined, we kindly ask you not to use our platform."
                        },
                        {
                            title: "Eligibility to Use",
                            text: "Vet Mashinani is intended for individuals aged 18 and above. Users under 18 may access the platform only with parental or guardian consent."
                        },
                        {
                            title: "Account Responsibility",
                            text: "Keep your account details secure, as all activities under your account are your responsibility. Ensure compliance with Kenyan laws and these terms."
                        },
                        {
                            title: "Booking Veterinary Services",
                            text: "Vet Mashinani connects you with trusted veterinarians for service bookings. Note that service availability is subject to each veterinarian's schedule and resources."
                        },
                        {
                            title: "Payments and Refunds",
                            text: "Our platform facilitates payments securely. Should you have questions about transactions or refunds, feel free to contact us. Refunds may apply in specific circumstances."
                        },
                        {
                            title: "Limitations of Liability",
                            text: "While we work to provide reliable connections, Vet Mashinani is not liable for outcomes or services rendered by veterinarians. Use our platform responsibly and provide feedback to improve your experience."
                        },
                        {
                            title: "Privacy and Data Protection",
                            text: "Your privacy is essential to us. Refer to our Privacy Policy for details on data use and protection. By using our services, you consent to our data practices as per Kenyan regulations."
                        },
                        {
                            title: "Updating Terms",
                            text: "We may update these terms occasionally to enhance our services. Notifications of changes will be provided, and continued use signifies acceptance."
                        },
                        {
                            title: "Governing Law",
                            text: "These terms are governed by Kenyan laws. Any disputes arising from the interpretation of these terms shall be resolved within the Kenyan legal framework."
                        }
                    ].map((section, index) => (
                        <Box mb={4} key={index}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#00b894',
                                    mb: 1.5,
                                    fontSize: '1.5rem'
                                }}
                            >
                                {`${index + 1}. ${section.title}`}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '1.15rem',
                                    lineHeight: 1.8,
                                    color: '#2d3436',
                                    textAlign: 'justify'
                                }}
                            >
                                {section.text}
                            </Typography>
                        </Box>
                    ))}

                    {/* Footer Note */}
                    <Box textAlign="center" mt={5}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1rem',
                                color: '#636e72'
                            }}
                        >
                            If you have questions or need assistance, please contact us at{' '}
                            <Link href="mailto:vetmashinani@gmail.com" color="primary">
                                vetmashinani@gmail.com
                            </Link>
                        </Typography>
                    </Box>
                </Container>
            </section>
        );
    }
}

export default Terms;
