import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface LinkType {
    href?: string;  // External link
    to?: string;    // Internal link
    label: string;
    icon?: string;  // Optional icon for social links
}

interface FooterState {
    hoveredLink: number | null;
}

class Footer extends React.Component<{}, FooterState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hoveredLink: null,
        };
    }

    renderLinks = (links: LinkType[]) => {
        const { hoveredLink } = this.state;
        return links.map((link, index) => (
            <li key={index} style={{ margin: '8px 0' }}>
                {link.to ? (
                    <Link
                        to={link.to}
                        style={{
                            color: hoveredLink === index ? '#FFD700' : '#ffffff',
                            textDecoration: 'none',
                            fontSize: '16px',
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={() => this.setState({ hoveredLink: index })}
                        onMouseLeave={() => this.setState({ hoveredLink: null })}
                    >
                        {link.label}
                    </Link>
                ) : (
                    <a
                        href={link.href}
                        style={{
                            color: hoveredLink === index ? '#FFD700' : '#ffffff',
                            textDecoration: 'none',
                            fontSize: '16px',
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={() => this.setState({ hoveredLink: index })}
                        onMouseLeave={() => this.setState({ hoveredLink: null })}
                    >
                        {link.label}
                    </a>
                )}
            </li>
        ));
    };

    render() {
        const socialLinks: Array<LinkType> = [
            { href: 'https://www.twitter.com', icon: 'fab fa-x', label: 'X' },
            { href: 'https://www.facebook.com', icon: 'fab fa-facebook', label: 'Facebook' },
            { href: 'https://www.instagram.com', icon: 'fab fa-instagram', label: 'Instagram' },
            { href: 'https://www.linkedin.com/in/vet-mashinani-4b0741326/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
        ];

        const usefulLinks: LinkType[] = [
            { href: '#hero', label: 'Home' },
            { href: '#about', label: 'About Us' },
            { href: '#services', label: 'Services' },
            { to: '/terms', label: 'Terms of Service' },
            { to: '/privacy', label: 'Privacy Policy' },
        ];

        const serviceLinks: LinkType[] = [
            { href: '#', label: 'Vet Directory' },
            { href: '#', label: 'Agrovet Hub' },
            { href: '#', label: 'Educational Content' },
            { href: '#', label: 'Community Forum' },
        ];

        const footerStyle: React.CSSProperties = {
            backgroundColor: '#121212',
            color: '#ffffff',
            padding: '60px 0 40px',
            textAlign: 'left',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        };

        const socialLinkStyle: React.CSSProperties = {
            color: '#ffffff',
            fontSize: '24px',
            margin: '0 10px',
            transition: 'transform 0.3s ease',
        };

        return (
            <footer id="footer" style={footerStyle}>
                <Container>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} justifyContent="space-between">
                        <Box>
                            <Typography variant="h5" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                                Connect with Us
                            </Typography>
                            <Typography variant="body2" style={{ marginBottom: '20px' }}>
                                Follow us on social media for updates:
                            </Typography>
                            <Box display="flex">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        style={socialLinkStyle}
                                        aria-label={link.icon}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <i className={link.icon}></i>
                                    </a>
                                ))}
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="h5" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                                Useful Links
                            </Typography>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {this.renderLinks(usefulLinks)}
                            </ul>
                        </Box>

                        <Box>
                            <Typography variant="h5" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                                Our Services
                            </Typography>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {this.renderLinks(serviceLinks)}
                            </ul>
                        </Box>

                        <Box>
                            <Typography variant="h5" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                                Contact Us
                            </Typography>
                            <Typography variant="body2" style={{ marginBottom: '8px' }}>Mega Plaza, Second Floor</Typography>
                            <Typography variant="body2" style={{ marginBottom: '8px' }}>Oginga Odinga Street, Kisumu City</Typography>
                            <Typography variant="body2" style={{ marginBottom: '8px' }}><strong>Phone:</strong> 0742644460</Typography>
                            <Typography variant="body2"><strong>Email:</strong> vetmashinani@gmail.com</Typography>
                        </Box>
                    </Stack>
                </Container>

                <Box textAlign="center" marginTop="40px" style={{ color: '#eaeaea' }}>
                    <Typography variant="body2">
                        &copy; 2024 <strong>Vet Mashinani</strong> - All Rights Reserved!
                    </Typography>
                </Box>
            </footer>
        );
    }
}

export default Footer;
