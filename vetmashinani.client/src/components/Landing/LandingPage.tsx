import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Team from './Team';
import FAQs from './FAQs';

const LandingPage: React.FC = () => {
    // Define inline styles
    const mainStyle: React.CSSProperties = {
        margin: 0,             // Remove default margins
        padding: 0,            // Remove default padding
        width: '100%',         // Ensure full width
        boxSizing: 'border-box' // Include padding and border in element's total width and height
    };

    useEffect(() => {
        // Apply body styles to remove default margins
        document.body.style.margin = '0'; // Ensures body has no margin

        // Cleanup effect to reset styles on component unmount
        return () => {
            document.body.style.margin = '';
        };
    }, []);

    return (
        <div style={{ margin: 0 }}>
            <Navbar />
            <main style={mainStyle}>
                <Hero />
                <Services/>
                <About />
                <Team />
                <FAQs/>
            </main>
        </div>
    );
}

export default LandingPage;
