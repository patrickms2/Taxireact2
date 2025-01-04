import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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

  const features_points = [
    {
      name: 'Real-Time Localization',
      description:
        'Track your taxi fleet in real-time, ensuring efficient dispatch and improved customer satisfaction. Stay informed with live updates.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Seamless Communication',
      description:
        'Facilitate smooth communication between drivers, employees, and clients. Enhance coordination and service delivery with integrated chat features.',
      icon: 'mdiChat',
    },
    {
      name: 'Comprehensive Service Management',
      description:
        'Manage all aspects of taxi services, from bookings to payments, with ease. Streamline operations and boost productivity.',
      icon: 'mdiTaxi',
    },
  ];

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is a comprehensive platform designed to manage taxi cooperative operations. It offers tools for real-time localization, service management, and communication between drivers, employees, and clients.',
    },
    {
      question: 'How can I track my taxi fleet in real-time?',
      answer:
        'With ${projectName}, you can view the real-time location of your taxis on a map. This feature helps in efficient dispatching and ensures timely service delivery.',
    },
    {
      question: 'Can I manage bookings and payments through ${projectName}?',
      answer:
        'Yes, ${projectName} allows you to handle all aspects of taxi services, including bookings and payments, through a user-friendly interface.',
    },
    {
      question: 'Is there a communication feature for drivers and clients?',
      answer:
        'Absolutely! ${projectName} includes integrated chat features that facilitate seamless communication between drivers, employees, and clients, enhancing coordination and service quality.',
    },
    {
      question: 'What pricing plans are available for ${projectName}?',
      answer:
        'We offer flexible pricing plans tailored to the needs of different taxi cooperatives. Please visit our pricing page for detailed information on each plan.',
    },
    {
      question: 'How secure is the data on ${projectName}?',
      answer:
        'Data security is a top priority for us. ${projectName} employs advanced encryption and security protocols to ensure that all user data is protected and confidential.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`TAXILANZ - Comprehensive Taxi Cooperative Management`}</title>
        <meta
          name='description'
          content={`Discover TAXILANZ, the ultimate platform for managing taxi cooperative operations, including services, communication, and real-time localization.`}
        />
      </Head>
      <WebSiteHeader projectName={'Taxi'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Taxi'}
          image={['Taxi fleet in action']}
          mainText={`Streamline Your Taxi Operations with ${projectName}`}
          subTitle={`${projectName} revolutionizes taxi cooperative management with real-time localization, seamless communication, and efficient service handling.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'Taxi'}
          image={['Taxi management dashboard view']}
          withBg={1}
          features={features_points}
          mainText={`Discover the Power of ${projectName}`}
          subTitle={`Explore how ${projectName} enhances taxi operations with cutting-edge features designed for efficiency and growth.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'Taxi'}
          image={['Team collaborating on project']}
          mainText={`Empowering Taxi Cooperatives with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming taxi operations through innovative solutions. Our platform bridges communication, enhances service management, and ensures real-time efficiency.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'Taxi'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Taxi'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a smartphone']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Taxi'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
