import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Team from './Team';
import FAQs from './FAQs';
import Contact from './Contact';
import Footer from './Footer';

class LandingPage extends React.Component {
    componentDidMount() {
        // Apply body styles to remove default margins
        document.body.style.margin = '0';
    }

    componentWillUnmount() {
        // Cleanup effect to reset styles on component unmount
        document.body.style.margin = '';
    }

    render() {
        // Define inline styles
        const mainStyle: React.CSSProperties = {
            margin: 0,             // Remove default margins
            padding: 0,            // Remove default padding
            width: '100%',         // Ensure full width
            boxSizing: 'border-box' // Include padding and border in element's total width and height
        };

        return (
            <div style={{ margin: 0 }}>
                <Navbar />
                <main style={mainStyle}>
                    <Hero />
                    <About />
                    <Services />
                    <Team />
                    <FAQs />
                    <Contact />
                </main>
                <Footer />
            </div>
        );
    }
}

export default LandingPage;
