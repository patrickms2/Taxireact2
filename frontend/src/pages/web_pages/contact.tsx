import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FaqDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Taxi';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },
  ];

  const faqs = [
    {
      question: 'How do I contact ${projectName} support?',
      answer:
        'You can reach our support team through the contact form on this page. We are available to assist you with any inquiries or issues you may have.',
    },
    {
      question: 'What services does ${projectName} offer?',
      answer:
        '${projectName} offers a range of services for taxi management, including real-time tracking, dispatching, payment processing, and detailed reporting.',
    },
    {
      question: 'Can I customize the features of ${projectName}?',
      answer:
        'Yes, ${projectName} provides customizable solutions to fit your business needs. Contact us to discuss your specific requirements.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a free trial for new users to explore the features and benefits of ${projectName}. Sign up to start your trial today.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize data security and use advanced encryption to protect your information. Your data is safe with ${projectName}.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with ${projectName} for any inquiries or support. Learn more about our mission and how we can assist you.`}
        />
      </Head>
      <WebSiteHeader projectName={'Taxi'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Taxi'}
          image={['Customer service team']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to assist you with any questions or support you need. Reach out to ${projectName} and let us help you enhance your taxi operations.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Taxi'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <AboutUsSection
          projectName={'Taxi'}
          image={['Team brainstorming session']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are committed to revolutionizing taxi management with innovative solutions. Our mission is to enhance efficiency and customer satisfaction through cutting-edge technology.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'Taxi'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Contact us anytime for inquiries or support. Our team at ${projectName} is ready to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Taxi'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
