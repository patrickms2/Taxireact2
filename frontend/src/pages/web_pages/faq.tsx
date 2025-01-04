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
  FaqDesigns,
  ContactFormDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'What is ${projectName} and how can it help my taxi business?',
      answer:
        '${projectName} is a comprehensive platform designed to streamline taxi operations, offering features like real-time tracking, dispatching, and payment processing to enhance efficiency and customer satisfaction.',
    },
    {
      question: 'How do I get started with ${projectName}?',
      answer:
        'Getting started is easy. Simply sign up for an account, choose the plan that suits your needs, and follow the setup instructions to integrate ${projectName} into your operations.',
    },
    {
      question:
        'Can I customize the features of ${projectName} to fit my business?',
      answer:
        'Yes, ${projectName} offers customizable solutions to meet the unique needs of your business. Contact our support team to discuss your specific requirements.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        'We provide comprehensive support through various channels, including email, chat, and phone. Our team is dedicated to helping you resolve any issues and maximize the benefits of ${projectName}.',
    },
    {
      question: 'Is my data secure with ${projectName}?',
      answer:
        'Absolutely. We prioritize data security and use advanced encryption methods to protect your information, ensuring that your data is safe and confidential.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how we can help your taxi operations.`}
        />
      </Head>
      <WebSiteHeader projectName={'Taxi'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'Taxi'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. We're here to help you make the most of our platform.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Taxi'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Explore ${projectName} FAQs `}
        />

        <AboutUsSection
          projectName={'Taxi'}
          image={['Team collaborating on ideas']}
          mainText={`The Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming taxi operations with innovative solutions. Our mission is to enhance efficiency and customer satisfaction through cutting-edge technology.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Discover More`}
        />

        <ContactFormSection
          projectName={'Taxi'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Person using a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have more questions? Contact us anytime for assistance. Our team at ${projectName} is ready to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Taxi'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
