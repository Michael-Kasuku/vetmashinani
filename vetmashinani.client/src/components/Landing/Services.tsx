import React from 'react';
import { Container, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/system';

// Define types for service items
interface ServiceItem {
    title: string;
    description: string;
    delay: number;
}

const services: ServiceItem[] = [
    {
        title: 'Vet Directory',
        description: 'Quickly locate certified veterinarians near you and book appointments with confidence.',
        delay: 100,
    },
    {
        title: 'Agrovet Hub',
        description: 'Access a wide range of veterinary products and animal care essentials at competitive prices.',
        delay: 200,
    },
    {
        title: 'Educational Resources',
        description: 'Stay informed with our in-depth blogs and webinars on the latest veterinary practices.',
        delay: 300,
    },
    {
        title: 'Community Forum',
        description: 'Join a vibrant community of fellow farmers and pet owners.',
        delay: 400,
    },
];

// Styled components
const Section = styled('section')({
    backgroundColor: '#f8f9fa',
    padding: '2rem 1rem', // Default padding for extra small screens
    '@media (min-width:600px)': {
        padding: '3rem 1.5rem', // Small screens
    },
    '@media (min-width:960px)': {
        padding: '4rem 2rem', // Medium screens
    },
    '@media (min-width:1280px)': {
        padding: '5rem 3rem', // Large screens
    },
});

const ServiceItemBox = styled(Box)(({
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    border: '1px solid #dee2e6',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
}));

const Title = styled(Typography)(({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '0.5rem',
    '@media (max-width: 600px)': {
        fontSize: '1.1rem', // Smaller font size on mobile
    },
}));

const Description = styled(Typography)(({
    fontSize: '0.9rem',
    color: '#6c757d',
    '@media (max-width: 600px)': {
        fontSize: '0.85rem', // Smaller font size on mobile
    },
}));

// Convert functional component to class component
class Services extends React.Component {
    render() {
        return (
            <Section id="services">
                <Container className="text-center" data-aos="fade-up" maxWidth="lg">
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            color: '#0d6efd',
                            marginBottom: { xs: '1rem', md: '1.5rem' },
                        }}
                    >
                        Our Services
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            color: '#6c757d',
                            marginBottom: { xs: '2rem', md: '3rem' },
                        }}
                    >
                        Discover our comprehensive solutions designed to enhance animal health and ensure their well-being.
                    </Typography>
                </Container>

                <Container>
                    <Stack
                        direction={{ xs: 'column', sm: 'row', md: 'row' }}
                        spacing={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                    >
                        {services.map((service, index) => (
                            <Box
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={service.delay}
                                flexBasis={{ xs: '100%', sm: '48%', md: '23%' }}
                            >
                                <ServiceItemBox>
                                    <div>
                                        <Title variant="h4">{service.title}</Title>
                                        <Description variant="body1">{service.description}</Description>
                                    </div>
                                </ServiceItemBox>
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Section>
        );
    }
}

export default Services;
