import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import HeadingSec from "../../components/shared/HeadingSec";
import { Helmet } from 'react-helmet-async';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        controls.start('visible');
      }, delay);
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      {children}
    </motion.div>
  );
};

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 1,
      title: 'Information we collect',
      icon: '📊',
      content: (
        <ul className="list-disc list-inside text-sm space-y-3 text-gray-300">
          <li><strong>Personal information you provide:</strong> name, email address, and phone number when you contact us or sign up for services within the app.</li>
          <li><strong>Automatically collected information:</strong> device identifiers (e.g., advertising ID, device model), OS version, app usage data, crash logs, and analytics data collected to improve app performance and user experience.</li>
          <li><strong>In-app payment and purchase data:</strong> transaction receipts and purchase metadata when you make in-app purchases or subscribe to paid features.</li>
          <li><strong>Communications:</strong> content of support requests and email communications when you contact us for help.</li>
        </ul>
      ),
    },
    {
      id: 2,
      title: 'How we use information',
      icon: '🎯',
      content: (
        <>
          <p className="text-sm text-gray-300 mb-3">We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
            <li>To provide, maintain, and improve the app and its features.</li>
            <li>To process purchases and manage subscriptions.</li>
            <li>To respond to your requests and provide customer support.</li>
            <li>To analyze trends, usage, and performance to enhance the app.</li>
            <li>To comply with legal obligations and protect the rights and safety of users and the public.</li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: 'Third-party services and SDKs',
      icon: '🔗',
      content: (
        <p className="text-sm text-gray-300">We may use third-party analytics, crash reporting, payment processors, and other SDKs (for example, Firebase, Google Analytics, or equivalent services). These providers may collect and process data as described in their privacy policies. Their use of your information is governed by their policies, not this Privacy Policy.</p>
      ),
    },
    {
      id: 4,
      title: 'Push notifications',
      icon: '🔔',
      content: (
        <p className="text-sm text-gray-300">If you enable push notifications, we may send you messages such as updates, reminders, or promotional communications. You can opt out of notifications in your device settings.</p>
      ),
    },
    {
      id: 5,
      title: 'Retention and deletion',
      icon: '🗑️',
      content: (
        <p className="text-sm text-gray-300">We retain personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law. You may request deletion of your personal data by contacting us at the details below; where legally required, we will comply with valid requests to delete your personal data.</p>
      ),
    },
    {
      id: 6,
      title: "Children's privacy",
      icon: '👶',
      content: (
        <p className="text-sm text-gray-300">Our apps are not directed to children under 13 (or local age of consent). We do not knowingly collect or solicit personal information from children. If you believe we have collected information from a child, please contact us and we will remove the information and take appropriate steps.</p>
      ),
    },
    {
      id: 7,
      title: 'Security',
      icon: '🔒',
      content: (
        <p className="text-sm text-gray-300">We take reasonable measures to protect information from loss, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no method of transmission or storage is 100% secure; we cannot guarantee absolute security.</p>
      ),
    },
    {
      id: 8,
      title: 'Your rights and choices',
      icon: '⚙️',
      content: (
        <ul className="list-disc list-inside text-sm space-y-2 text-gray-300">
          <li><strong>Access & correction:</strong> You may request access to or correction of your personal information.</li>
          <li><strong>Deletion:</strong> You may request deletion of your personal information, subject to legal exceptions.</li>
          <li><strong>Marketing opt-out:</strong> You can opt out of marketing communications by following the unsubscribe instructions in the message or contacting us.</li>
        </ul>
      ),
    },
    {
      id: 9,
      title: 'International transfers',
      icon: '🌍',
      content: (
        <p className="text-sm text-gray-300">By using our apps, you acknowledge that your information may be transferred to and processed in countries other than your country of residence, including the country where we operate and where our service providers are located.</p>
      ),
    },
    {
      id: 10,
      title: 'Changes to this policy',
      icon: '📝',
      content: (
        <p className="text-sm text-gray-300">We may update this Privacy Policy from time to time. If we make material changes, we will provide notice in the app or via email where possible. The effective date of the most recent version will be indicated at the top of this page.</p>
      ),
    },
  ];

  return (
    <div className="pb-24">
      <Helmet>
        <title>Privacy Policy — Ashish Chanchal</title>
        <meta name="description" content="Privacy Policy for mobile applications published by Ashish Chanchal on Google Play Store and Apple App Store." />
      </Helmet>

      <HeadingSec title="privacy-policy" description="How we collect, use, and protect your information" />

      <div className="max-w-4xl mx-auto p-4">
        {/* Introduction */}
        <ScrollReveal>
          <div className="mb-12 p-6 rounded-lg bg-gradient-to-r from-secondary/10 to-transparent border border-secondary/30">
            <p className="text-gray-300 text-base leading-relaxed">
              This Privacy Policy explains how <span className="text-secondary font-semibold">Ashish Chanchal</span> ("we", "us", or "our") collects, uses, discloses, and protects information in connection with mobile applications published on the Google Play Store and Apple App Store.
            </p>
          </div>
        </ScrollReveal>

        {/* Sections Grid */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <ScrollReveal key={section.id} delay={index * 50}>
              <motion.div
                className="group p-6 rounded-lg border border-gray-700/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{section.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="text-secondary">#</span>
                      {section.title}
                    </h3>
                    {section.content}
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Section */}
        <ScrollReveal delay={sections.length * 50}>
          <div className="mt-12 p-8 rounded-lg border border-secondary/30 bg-secondary/5">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-secondary">#</span>Contact
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              If you have questions, requests, or concerns about this Privacy Policy or our data practices, contact:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-primary border border-gray-700 hover:border-secondary/50 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Name</p>
                <p className="text-white font-semibold">Ashish Chanchal</p>
              </div>
              <div className="p-4 rounded-lg bg-primary border border-gray-700 hover:border-secondary/50 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:akchanchal2002@gmail.com"
                  className="text-secondary font-semibold hover:underline break-all"
                >
                  akchanchal2002@gmail.com
                </a>
              </div>
              <div className="p-4 rounded-lg bg-primary border border-gray-700 hover:border-secondary/50 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                <a
                  href="tel:+919410600011"
                  className="text-secondary font-semibold hover:underline"
                >
                  +91 94106 00011
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Effective Date */}
        <ScrollReveal delay={(sections.length + 1) * 50}>
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Effective date</p>
            <p className="text-sm text-gray-400 mt-1">December 28, 2025</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
