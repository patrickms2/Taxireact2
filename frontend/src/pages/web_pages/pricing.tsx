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
  FeaturesDesigns,
  ContactFormDesigns,
  PricingDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'Real-Time Fleet Tracking',
      description:
        'Monitor your entire fleet in real-time, ensuring efficient dispatch and improved service delivery. Stay informed with live updates and location data.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Advanced Dispatch System',
      description:
        'Optimize your dispatch operations with intelligent algorithms that match drivers with passengers quickly and efficiently, reducing wait times and increasing satisfaction.',
      icon: 'mdiTaxi',
    },
    {
      name: 'Comprehensive Analytics',
      description:
        'Gain insights into your operations with detailed analytics and reporting. Make informed decisions to drive growth and improve service quality.',
      icon: 'mdiChartLine',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Real-time tracking',
        'Basic support',
        'Access to service management',
      ],
      limited_features: ['Limited reporting', 'Basic payment options'],
    },
    premium: {
      features: [
        'Advanced dispatching',
        'Priority support',
        'Comprehensive reporting',
      ],
      also_included: [
        'Multiple payment gateways',
        'Enhanced security features',
      ],
    },
    business: {
      features: [
        'Custom integrations',
        'Dedicated account manager',
        'Full analytics suite',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual drivers or small operators looking to manage their taxi services efficiently with essential features.',
    premium:
      'Perfect for small startups or agencies seeking advanced tools and support to enhance their taxi operations and customer service.',
    business:
      'Designed for large enterprises requiring custom solutions, dedicated support, and comprehensive analytics to drive business success.',
  };

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        "The Standard plan includes real-time tracking, basic support, and access to service management. It's ideal for individual drivers or small operators.",
    },
    {
      question: 'Can I upgrade my plan at any time?',
      answer:
        'Yes, you can upgrade your plan at any time through your account settings. Choose the plan that best fits your needs and follow the prompts to complete the upgrade.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, ${projectName} offers a free trial for new users to explore the features and benefits of the platform. Sign up to start your trial today.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        '${projectName} accepts various payment methods, including credit cards, PayPal, and other popular payment gateways, ensuring a seamless transaction process.',
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
        <title>{`Pricing Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore the flexible pricing plans offered by ${projectName}. Choose the plan that best fits your taxi business needs and enhance your operations.`}
        />
      </Head>
      <WebSiteHeader projectName={'Taxi'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Taxi'}
          image={['Pricing plans comparison chart']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Discover the flexible pricing options available with ${projectName}. Select the plan that aligns with your business goals and start optimizing your taxi operations today.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <FeaturesSection
          projectName={'Taxi'}
          image={['Taxi management software interface']}
          withBg={0}
          features={features_points}
          mainText={`Unlock the Full Potential of ${projectName}`}
          subTitle={`Explore the powerful features of ${projectName} that enhance your taxi operations, ensuring efficiency and customer satisfaction.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Taxi'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <FaqSection
          projectName={'Taxi'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} Pricing `}
        />

        <ContactFormSection
          projectName={'Taxi'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support interaction']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Have questions about our pricing plans? Contact us anytime for assistance. Our team at ${projectName} is ready to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Taxi'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
