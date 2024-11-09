import React, { FC } from 'react';

interface TeamMember {
    name: string;
    position: string;
    description: string;
    image: string;
}

const Team: FC = () => {
    const teamMembers: TeamMember[] = [
        {
            name: 'Josphine Otieno',
            position: 'Chief Executive Officer',
            description:
                'Josphine drives the strategic vision of the organization, ensuring all operations align with our core objectives. Her leadership fosters innovation and collaboration, empowering our team to excel.',
            image: 'assets/img/team/josphine.png',
        },
        {
            name: 'Michael Kasuku',
            position: 'Project Manager',
            description:
                'Michael coordinates project activities with precision, managing timelines and budgets effectively. His dedication ensures the successful delivery of projects while cultivating a culture of excellence.',
            image: 'assets/img/team/kasuku.png',
        },
        {
            name: 'Daisy Lopez',
            position: 'Chief Technology Officer',
            description:
                'Daisy leads our technological advancements, implementing innovative solutions that enhance operational efficiency and strengthen our capabilities in a rapidly evolving industry.',
            image: 'assets/img/team/lopez.png',
        }
    ];

    const sectionStyle: React.CSSProperties = {
        backgroundColor: '#f9f9f9',
        padding: '60px 0',
        textAlign: 'center',
    };

    const cardContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '0 20px',
    };

    const cardStyle: React.CSSProperties = {
        border: '1px solid #ddd',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '320px',
        textAlign: 'center',
        overflow: 'hidden',
        paddingBottom: '20px',
    };

    const memberImgStyle: React.CSSProperties = {
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        margin: '20px auto 10px',
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    };

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const sectionTitleStyle: React.CSSProperties = {
        fontSize: '2.5rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#007bff',
        textTransform: 'none',  // Changed from uppercase to normal text
    };

    const jobDescriptionStyle: React.CSSProperties = {
        fontSize: '1rem',
        color: '#555',
        margin: '15px 0',
        lineHeight: '1.5',
    };

    const positionStyle: React.CSSProperties = {
        fontSize: '1.1rem',
        fontStyle: 'italic',
        color: '#777',
        marginBottom: '10px',
    };

    return (
        <section id="team" className="team" style={sectionStyle}>
            <div className="container section-title mb-5" data-aos="fade-up">
                <h2 style={sectionTitleStyle}>Meet Our Team</h2>
                <p style={{ fontSize: '1.2rem', color: '#777' }}>A dedicated team of professionals driving our success.</p>
            </div>

            <div className="container" style={cardContainerStyle}>
                {teamMembers.map((member, index) => (
                    <div key={index} style={cardStyle} className="team-card">
                        <div style={memberImgStyle}>
                            <img src={member.image} style={imgStyle} alt={member.name} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <h4 style={{ margin: '10px 0', fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}>{member.name}</h4>
                            <span style={positionStyle}>{member.position}</span>
                            <p style={jobDescriptionStyle}>{member.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Team;
