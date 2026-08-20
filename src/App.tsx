import { Navigation } from './components/Navigation';
import { IntroAnimation } from './components/IntroAnimation';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Details } from './components/Details';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-200 selection:text-stone-900">
      <IntroAnimation />
      <Navigation />
      <Hero />
      <Story />
      <Details />
      <Footer />
    </div>
  );
}
