import React, { ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Snackbar,
    Box,
    Stack,
} from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import axios from 'axios';

/**
 * Contact Information interface for contact details
 */
interface ContactInfo {
    icon: React.ReactNode;
    title: string;
    description: string;
}

/**
 * Snackbar Configuration interface for managing snackbar state
 */
interface SnackbarConfig {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    vertical: 'bottom' | 'top';
    horizontal: 'center' | 'left' | 'right';
}

/**
 * Contact Component - class-based component to handle the contact page functionality
 */
class Contact extends React.Component {
    state = {
        formData: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        snackbar: {
            open: false,
            message: '',
            severity: 'success',
            vertical: 'bottom',
            horizontal: 'center',
        } as SnackbarConfig,
    };

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState: any) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { name, email, subject, message } = this.state.formData;

        if (!name || !email || !subject || !message) {
            this.setState({
                snackbar: {
                    open: true,
                    message: 'All fields are required.',
                    severity: 'error',
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
            return;
        }

        try {
            const apiUrl = `https://localhost:7095/api/messages`;
            const response = await axios.post(apiUrl, {
                Name: name,
                SenderEmailAddress: email,
                Subject: subject,
                MessageContent: message,
            });

            if (response.status === 201) {
                this.setState({
                    snackbar: {
                        open: true,
                        message: 'Message sent successfully!',
                        severity: 'success',
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
                this.setState({
                    formData: { name: '', email: '', subject: '', message: '' },
                });
            }
        } catch (error) {
            this.setState({
                snackbar: {
                    open: true,
                    message: 'Error sending message. Please try again.',
                    severity: 'error',
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState((prevState: any) => ({
            snackbar: {
                ...prevState.snackbar,
                open: false,
            },
        }));
    };

    render() {
        const contactDetails: ContactInfo[] = [
            {
                icon: <LocationOn style={{ color: '#0d6efd', fontSize: '30px' }} />,
                title: 'Our Location',
                description: 'Mega Plaza, Second Floor, Oginga Odinga Street, Kisumu City',
            },
            {
                icon: <Phone style={{ color: '#0d6efd', fontSize: '30px' }} />,
                title: 'Phone',
                description: '+254 742 644 460',
            },
            {
                icon: <Email style={{ color: '#0d6efd', fontSize: '30px' }} />,
                title: 'Email',
                description: 'vetmashinani@gmail.com',
            },            
        ];

        return (
            <section id="contact" style={{ padding: '60px 0', backgroundColor: '#f5f8fa' }}>
                <Container maxWidth="md" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Typography variant="h3" style={{ color: '#0d6efd', fontWeight: 'bold', marginBottom: '20px' }}>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" style={{ color: '#6c757d', marginBottom: '30px' }}>
                        We're here to help and answer any questions you may have. Reach out, and we'll get back to you as soon as possible.
                    </Typography>
                </Container>

                <Container maxWidth="lg">
                    <Box display="flex" flexWrap="wrap" gap={4}>
                        <Box flex={1}>
                            <Stack spacing={2}>
                                {contactDetails.map((info, index) => (
                                    <Paper
                                        key={index}
                                        elevation={3}
                                        style={{
                                            padding: '20px',
                                            textAlign: 'center',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <div style={{ marginBottom: '15px' }}>{info.icon}</div>
                                        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#0d6efd', marginBottom: '10px' }}>
                                            {info.title}
                                        </Typography>
                                        <Typography variant="body2" style={{ color: '#6c757d' }}>
                                            {info.description}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>

                        <Box flex={1}>
                            <Paper elevation={3} style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                <form onSubmit={this.handleSubmit}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Your Name"
                                            name="name"
                                            required
                                            value={this.state.formData.name}
                                            onChange={this.handleChange}
                                            style={{ backgroundColor: '#f3f6f9' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Your Email"
                                            name="email"
                                            type="email"
                                            required
                                            value={this.state.formData.email}
                                            onChange={this.handleChange}
                                            style={{ backgroundColor: '#f3f6f9' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Subject"
                                            name="subject"
                                            required
                                            value={this.state.formData.subject}
                                            onChange={this.handleChange}
                                            style={{ backgroundColor: '#f3f6f9' }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={5}
                                            required
                                            value={this.state.formData.message}
                                            onChange={this.handleChange}
                                            style={{ backgroundColor: '#f3f6f9' }}
                                        />
                                        <Box style={{ textAlign: 'center' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{
                                                    backgroundColor: '#3f51b5',
                                                    color: '#ffffff',
                                                    padding: '12px 28px',
                                                    transition: '0.3s ease',
                                                }}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#303f9f')}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3f51b5')}
                                            >
                                                Send Message
                                            </Button>
                                        </Box>
                                    </Stack>
                                </form>
                            </Paper>
                        </Box>
                    </Box>
                </Container>

                <Snackbar
                    open={this.state.snackbar.open}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    message={this.state.snackbar.message}
                    anchorOrigin={{ vertical: this.state.snackbar.vertical, horizontal: this.state.snackbar.horizontal }}
                    ContentProps={{
                        style: {
                            backgroundColor: this.state.snackbar.severity === 'success' ? '#4caf50' : '#f44336',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        },
                    }}
                />
            </section>
        );
    }
}

export default Contact;
