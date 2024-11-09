import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

class PrivacyPolicy extends React.Component {
    render() {
        return (
            <Box
                component="section"
                id="privacy"
                sx={{
                    py: 6,
                    backgroundColor: '#f4f6f8',
                    color: '#333',
                }}
            >
                <Container data-aos="fade-up" data-aos-delay="100" maxWidth="md">
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h2" color="primary" gutterBottom>
                            Privacy Policy
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '1.2rem',
                                lineHeight: 1.75,
                                textAlign: 'justify',
                                mb: 4,
                            }}
                        >
                            At Vet Mashinani, we are committed to protecting your personal information and ensuring transparency. This Privacy Policy outlines how we collect, use, protect, and share your data in compliance with relevant data protection laws, including Kenya's Data Protection Act, 2019, and the Constitution of Kenya, 2010. By using our platform, you consent to the practices described here.
                        </Typography>

                        {/* Section 1 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            1. Information We Collect
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We collect personal information to facilitate services on our platform. This includes:
                        </Typography>
                        <ul>
                            <li><strong>Personal Identification Information:</strong> Your full name, email, phone number, and other registration details.</li>
                            <li><strong>Veterinary and Animal Details:</strong> Information related to your animals, appointment records, and veterinary services requested.</li>
                            <li><strong>Payment Information:</strong> Details necessary to process payments on our platform.</li>
                            <li><strong>Usage Data:</strong> Interactions with the platform, including access times, device details, IP addresses, and browser type.</li>
                            <li><strong>Location Information:</strong> Geographic data for location-based services, such as nearby veterinarian suggestions.</li>
                        </ul>

                        {/* Section 2 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            2. Use of Your Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We use your information to deliver, enhance, and secure our services. Uses include:
                        </Typography>
                        <ul>
                            <li>Facilitating communication and appointments between users and licensed veterinarians.</li>
                            <li>Securely processing payments and maintaining transaction records.</li>
                            <li>Improving platform performance by analyzing usage trends and user preferences.</li>
                            <li>Meeting legal obligations, such as responding to lawful requests from authorities.</li>
                            <li>Maintaining the security and integrity of our platform, including fraud prevention.</li>
                        </ul>

                        {/* Section 3 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            3. Disclosure of Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We do not sell or rent your personal information. However, we may share your data in the following situations:
                        </Typography>
                        <ul>
                            <li>With <strong>service providers</strong> performing tasks on our behalf, like payment processing or data analysis, bound by strict confidentiality agreements.</li>
                            <li>To comply with <strong>legal obligations</strong> or respond to lawful requests from regulatory authorities.</li>
                            <li>To <strong>protect the rights and safety</strong> of Vet Mashinani, our users, or third parties, as necessary to enforce our terms or prevent harm.</li>
                        </ul>

                        {/* Section 4 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            4. Data Security
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We implement strong security measures to protect your data, including encryption, secure servers, and routine audits. Although we strive for comprehensive protection, no online platform can guarantee absolute security.
                        </Typography>

                        {/* Section 5 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            5. Cookies and Tracking Technologies
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            Vet Mashinani uses cookies and tracking technologies to personalize your experience and gather insights into platform usage. You can adjust your browser settings to decline cookies, though some features may be limited.
                        </Typography>

                        {/* Section 6 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            6. Retention of Personal Information
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We retain personal information as long as needed to fulfill the purposes for which it was collected, comply with legal obligations, and resolve disputes. When no longer required, we securely delete or anonymize the data.
                        </Typography>

                        {/* Section 7 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            7. Your Data Protection Rights
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            You have rights concerning your personal data, including:
                        </Typography>
                        <ul>
                            <li>The right to access your data and obtain a copy.</li>
                            <li>The right to request corrections for inaccurate or incomplete data.</li>
                            <li>The right to data erasure in certain circumstances ("right to be forgotten").</li>
                            <li>The right to restrict or object to data processing.</li>
                            <li>The right to data portability, allowing a structured, common format for data transfer.</li>
                        </ul>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 4 }}>
                            To exercise these rights or if you have privacy concerns, please contact us at <Link href="mailto:vetmashinani@gmail.com">vetmashinani@gmail.com</Link>.
                        </Typography>

                        {/* Section 8 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            8. Third-Party Links
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            Our platform may contain links to third-party websites. Vet Mashinani is not responsible for the privacy practices or content of these sites, and we encourage you to review their privacy policies.
                        </Typography>

                        {/* Section 9 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            9. Changes to this Privacy Policy
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
                            We reserve the right to update this Privacy Policy. Changes will be posted here, and significant updates will be communicated via email or notifications. Continued use of our services constitutes acceptance of these updates.
                        </Typography>

                        {/* Section 10 */}
                        <Typography variant="h4" color="primary" gutterBottom>
                            10. Contact Us
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                            If you have questions or wish to exercise your data rights, please reach out to us at <Link href="mailto:vetmashinani@gmail.com">vetmashinani@gmail.com</Link>.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        );
    }
}

export default PrivacyPolicy;
