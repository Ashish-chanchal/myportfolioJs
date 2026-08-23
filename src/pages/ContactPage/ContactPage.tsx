import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeadingSec from '../../components/shared/HeadingSec';
import Contact from '../../components/Contact/Contact';
import Socials from '../../components/Socials/Socials';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-20">
      <Helmet>
        <title>Contact // Ashish Chanchal - Transmission Relay</title>
        <meta
          name="description"
          content="Initiate contact with Ashish Chanchal for software development contracts, AI systems engineering, and full-stack collaborations."
        />
      </Helmet>

      <HeadingSec
        title="TRANSMISSION_RELAY"
        description="Establish direct communications for software engineering opportunities, AI architectures, and technical inquiries."
        waypoint="LOGBOOK // WAYPOINT_05_RELAY"
      />

      <Contact />

      <Socials />
    </div>
  );
};

export default ContactPage;
