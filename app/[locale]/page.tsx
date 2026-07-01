import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Roles from '@/components/Roles';
import Experience from '@/components/Experience';
import Expertise from '@/components/Expertise';
import Services from '@/components/Services';
import Education from '@/components/Education';
import Speaking from '@/components/Speaking';
import Media from '@/components/Media';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VisitorTracker from '@/components/VisitorTracker';
import AnalyticsTracker from '@/components/AnalyticsTracker';

// JSON-LD structured data for AI and search engines
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Wael A. Kabli',
  alternateName: 'وائل كابلي',
  url: 'https://waelkabli.com',
  image: 'https://waelkabli.com/images/wael-profile.jpg',
  description:
    'Saudi serial tech entrepreneur, digital health pioneer, and venture builder with 20+ years at the intersection of technology, healthcare, and strategy. Founder & CEO of Cura — KSA\'s first virtual hospital.',
  jobTitle: 'Serial Entrepreneur & Digital Health Pioneer',
  worksFor: {
    '@type': 'Organization',
    name: 'Cura Healthcare',
    url: 'https://company.cura.healthcare',
  },
  nationality: { '@type': 'Country', name: 'Saudi Arabia' },
  address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
  sameAs: [
    'https://linkedin.com/in/waelkablli',
    'https://waelkabli.com/en',
    'https://waelkabli.com/ar',
  ],
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'Columbia University' },
    { '@type': 'EducationalOrganization', name: 'Stanford University' },
    { '@type': 'EducationalOrganization', name: 'INSEAD' },
    { '@type': 'EducationalOrganization', name: 'ESADE Business School' },
    { '@type': 'EducationalOrganization', name: 'Babson College' },
    { '@type': 'EducationalOrganization', name: 'KFUPM' },
  ],
  knowsAbout: [
    'Digital Health',
    'Telehealth',
    'Entrepreneurship',
    'Venture Building',
    'AI in Healthcare',
    'Vision 2030',
    'Saudi Startup Ecosystem',
    'Strategic Consulting',
    'Product Management',
    'Cloud Architecture',
  ],
  hasOccupation: [
    { '@type': 'Occupation', name: 'Serial Entrepreneur' },
    { '@type': 'Occupation', name: 'Strategic Advisor' },
    { '@type': 'Occupation', name: 'Keynote Speaker' },
    { '@type': 'Occupation', name: 'Executive Coach' },
  ],
  award: [
    'Forbes Middle East Healthcare Innovation Circle',
    'Misk 2030 Leader',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wael Kabli',
  url: 'https://waelkabli.com',
  inLanguage: ['ar', 'en'],
  author: {
    '@type': 'Person',
    name: 'Wael A. Kabli',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://waelkabli.com/en/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <VisitorTracker />
      <AnalyticsTracker />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Roles />
        <Experience />
        <Expertise />
        <Services />
        <Education />
        <Speaking />
        <Media />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
