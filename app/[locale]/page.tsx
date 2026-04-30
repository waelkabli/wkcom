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

export default function HomePage() {
  return (
    <>
      <VisitorTracker />
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
