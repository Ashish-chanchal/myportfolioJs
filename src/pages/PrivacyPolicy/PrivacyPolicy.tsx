import React, { useEffect } from 'react';
import HeadingSec from '../../components/shared/HeadingSec';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      content: (
        <ul className="list-disc list-inside text-xs sm:text-sm font-mono space-y-2 text-[#D4D4D4]">
          <li><strong>Personal details:</strong> Name, email address, and phone number when reaching out or engaging with applications.</li>
          <li><strong>Telemetry & analytics:</strong> Anonymous device hardware indicators, crash traces, and system response latencies used for performance debugging.</li>
          <li><strong>Communications:</strong> Technical inquiries and transmission messages dispatched to our mailbox.</li>
        </ul>
      ),
    },
    {
      id: 2,
      title: 'How We Use Information',
      content: (
        <ul className="list-disc list-inside text-xs sm:text-sm font-mono space-y-2 text-[#D4D4D4]">
          <li>To maintain, engineer, and optimize deployed applications and microservices.</li>
          <li>To respond to inbound technical inquiries and project collaboration transmissions.</li>
          <li>To audit system reliability and verify uptime metrics across cloud deployments.</li>
        </ul>
      ),
    },
    {
      id: 3,
      title: 'Third-Party Services',
      content: (
        <p className="text-xs sm:text-sm font-mono text-[#D4D4D4]">
          Certain applications may integrate third-party infrastructure providers (e.g. Firebase, Azure Cloud, OpenAI APIs) governed by their respective security and privacy guidelines.
        </p>
      ),
    },
    {
      id: 4,
      title: 'Data Security & Storage',
      content: (
        <p className="text-xs sm:text-sm font-mono text-[#D4D4D4]">
          We apply robust industry security practices to prevent unauthorized data loss, access, or modification across all endpoints.
        </p>
      ),
    },
    {
      id: 5,
      title: 'Transmission & Inquiries',
      content: (
        <p className="text-xs sm:text-sm font-mono text-[#D4D4D4]">
          For questions regarding data processing or this policy, dispatch an email to <a href="mailto:akchanchal2002@gmail.com" className="text-accent font-bold underline">akchanchal2002@gmail.com</a>.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-24">
      <Helmet>
        <title>Privacy Policy // Ashish Chanchal</title>
        <meta
          name="description"
          content="Privacy Policy and data governance statements for software applications built by Ashish Chanchal."
        />
      </Helmet>

      <HeadingSec
        title="PRIVACY_POLICY"
        description="Data governance, transparency protocols, and security principles."
        waypoint="LOGBOOK // PRIVACY_STATEMENT"
      />

      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Intro Box */}
        <div className="bg-[#121212] border-2 border-white p-6 shadow-brutal mb-8">
          <p className="font-mono text-xs sm:text-sm text-[#D4D4D4] leading-relaxed">
            This statement outlines data practices for applications and open-source systems published by <span className="text-accent font-bold">Ashish Chanchal</span>.
          </p>
        </div>

        {/* Section Cards */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-[#121212] border-2 border-white p-6 shadow-brutal hover:shadow-brutal-accent brutal-card"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-[#262626] mb-4">
                <span className="w-2.5 h-2.5 bg-accent inline-block border border-black"></span>
                <h3 className="font-heading font-black text-base text-white uppercase">
                  {section.title}
                </h3>
              </div>
              <div>{section.content}</div>
            </div>
          ))}
        </div>

        {/* Direct Contact Footer */}
        <div className="mt-12 bg-[#181818] border-2 border-white p-6 shadow-brutal-sm font-mono text-xs text-[#888888] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            EFFECTIVE DATE: JANUARY 2026 // NOIDA, INDIA
          </div>
          <a
            href="mailto:akchanchal2002@gmail.com"
            className="text-accent font-bold hover:underline"
          >
            akchanchal2002@gmail.com ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
