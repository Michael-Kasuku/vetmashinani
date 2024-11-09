import React, { Component } from 'react';
import { Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Types for FAQ Item and Component State
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQsState {
    openIndex: number | null;
}

// Professional FAQs Component Implementation
class FAQs extends Component<{}, FAQsState> {
    constructor(props: {}) {
        super(props);
        this.state = { openIndex: null };
    }

    // Handle toggling FAQ open/close
    toggleFAQ = (index: number): void => {
        this.setState((prevState) => ({
            openIndex: prevState.openIndex === index ? null : index, // Collapse if open
        }));
    };

    render() {
        const faqItems: FAQItem[] = [
            { question: "How do I book an appointment with a veterinarian?", answer: "Booking is simple: log into your Vet Mashinani account, select a certified veterinarian, and choose a convenient time. You'll receive a confirmation email shortly." },
            { question: "Can I reschedule or cancel an appointment?", answer: "Yes, navigate to 'My Appointments' to make changes. Please ensure cancellations are done at least 24 hours in advance to avoid penalties." },
            { question: "How can I track my pet's treatment progress?", answer: "Monitor your pet's progress in real-time on Vet Mashinani. You'll also receive notifications on any changes to the treatment status." },
            { question: "What services do veterinarians offer on Vet Mashinani?", answer: "We offer a wide range of services, including routine check-ups, vaccinations, surgeries, emergency care, and more, detailed on each veterinarian's profile." },
            { question: "How do I choose the right veterinarian for my pet?", answer: "Review each veterinarian's qualifications, specialties, and feedback from other users. You can also directly contact them for any inquiries." },
            { question: "Is my pet's information kept confidential?", answer: "We prioritize your privacy. All pet information is securely stored and shared only with the necessary parties involved in care." },
            { question: "What should I do in case of an emergency?", answer: "In an emergency, contact the nearest veterinary clinic or use Vet Mashinani to find urgent care options in your area." },
            { question: "Can I leave a review for a veterinarian?", answer: "Yes, after your appointment, you can share a review to help others and improve our services." },
            { question: "What payment methods are accepted on Vet Mashinani?", answer: "We accept various payment methods, including credit/debit cards, mobile money, and bank transfers, ensuring seamless transactions." },
            { question: "How can I contact Vet Mashinani for further assistance?", answer: "For support, visit our 'Contact Us' page or reach out to our customer service via email or phone." }
        ];

        return (
            <section id="faq" style={sectionStyles}>
                <Container>
                    <div className="faq-intro" style={introStyles}>
                        <Typography variant="h3" style={headingStyles}>
                            Have Questions? We've Got Answers!
                        </Typography>
                        <Typography variant="body1" style={bodyTextStyles}>
                            At Vet Mashinani, we strive to make pet care simple and accessible. Below, you will find answers to some frequently asked questions.
                        </Typography>
                    </div>

                    {/* Accordion to display FAQ items */}
                    {faqItems.map((item, index) => (
                        <Accordion
                            key={index}
                            expanded={this.state.openIndex === index}
                            onChange={() => this.toggleFAQ(index)}
                            style={accordionStyles}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography style={questionStyles}>{item.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={answerStyles}>{item.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            </section>
        );
    }
}

export default FAQs;

// Styles used within the component for consistent design
const sectionStyles = {
    backgroundColor: '#f4f6fa',
    padding: '3rem 0',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
};

const introStyles = {
    textAlign: 'center',
    marginBottom: '2rem',
};

const headingStyles = {
    color: '#0d6efd',
    fontWeight: 700,
};

const bodyTextStyles = {
    marginTop: '1rem',
    lineHeight: 1.7,
    color: '#555',
};

const accordionStyles = {
    marginBottom: '1rem',
};

const questionStyles = {
    fontWeight: 300,
};

const answerStyles = {
    color: '#555',
};
