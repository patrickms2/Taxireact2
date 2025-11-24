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
  PricingDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const features_points = [
    {
      name: 'Dynamic Dispatching',
      description:
        'Automatically assign the nearest available taxi to a customer, reducing wait times and improving service efficiency. Enhance your dispatch operations with smart algorithms.',
      icon: 'mdiTaxi',
    },
    {
      name: 'Integrated Payment Solutions',
      description:
        'Offer customers multiple payment options, including PayPal, Stripe, and Apple Pay. Simplify transactions and ensure secure, hassle-free payments.',
      icon: 'mdiCreditCard',
    },
    {
      name: 'Comprehensive Reporting',
      description:
        'Generate detailed reports on service performance, customer feedback, and financial metrics. Use insights to make informed decisions and drive business growth.',
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
      question: 'What services does ${projectName} offer?',
      answer:
        '${projectName} provides a comprehensive suite of services for taxi management, including real-time tracking, dispatching, payment processing, and detailed reporting.',
    },
    {
      question: 'How can I upgrade my plan?',
      answer:
        'You can upgrade your plan at any time through your account settings. Simply choose the plan that best fits your needs and follow the prompts to complete the upgrade.',
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
      question: 'Can I customize the services to fit my business needs?',
      answer:
        'Absolutely! ${projectName} offers customizable solutions to meet the unique requirements of your business. Contact our support team to discuss your specific needs.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Services - ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the comprehensive services offered by ${projectName}, designed to enhance taxi operations with efficiency and innovation.`}
        />
      </Head>
      <WebSiteHeader projectName={'Taxi'} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Taxi'}
          image={['Taxi service in action']}
          mainText={`Transform Your Taxi Services with ${projectName}`}
          subTitle={`Explore the innovative services offered by ${projectName} to streamline your taxi operations, enhance customer satisfaction, and boost efficiency.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Discover Services`}
        />

        <FeaturesSection
          projectName={'Taxi'}
          image={['Efficient taxi service management']}
          withBg={0}
          features={features_points}
          mainText={`Unleash the Full Potential of ${projectName}`}
          subTitle={`Discover the key features of ${projectName} that revolutionize taxi service management, ensuring seamless operations and enhanced customer experiences.`}
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
          mainText={`Common Questions about ${projectName} Services `}
        />

        <ContactFormSection
          projectName={'Taxi'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Customer support representative']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're here to help! Contact us anytime for assistance or inquiries. Our team at ${projectName} is ready to respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'Taxi'} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
