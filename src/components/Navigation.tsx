import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { siteConfig } from '../config';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const still = useReducedMotion();

  // Escape closes the phone menu
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Our Story', href: '#story' },
    { name: 'Details', href: '#details' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.9 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-stone-900' : 'bg-transparent py-6 text-stone-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl md:text-3xl tracking-widest hover:opacity-70 transition-opacity">
            {siteConfig.couple.firstName1[0]} <span className="font-sans font-light italic text-xl px-1">&amp;</span> {siteConfig.couple.firstName2[0]}
          </a>
          
          <div className="hidden md:flex gap-10">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className={`uppercase tracking-[0.15em] text-[11px] font-semibold transition-all duration-300 hover:text-stone-400 ${
                  scrolled ? 'text-stone-600' : 'text-stone-200'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            className={`md:hidden relative flex justify-center items-center w-10 h-10 z-50 rounded-full bg-stone-900/10 backdrop-blur-sm transition-colors duration-300 ${scrolled || isOpen ? 'text-stone-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {/* three centered bars that turn into an X */}
            <span className={`absolute w-5 h-[1.5px] bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'rotate-45' : '-translate-y-[5px]'}`} />
            <span className={`absolute w-5 h-[1.5px] bg-current transition-opacity duration-200 motion-reduce:transition-none ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute w-5 h-[1.5px] bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? '-rotate-45' : 'translate-y-[5px]'}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: still ? 0 : 0.3 } }}
            transition={{ duration: still ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-stone-50 z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={still ? { duration: 0 } : { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-stone-900 font-serif text-4xl hover:text-stone-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={still ? { duration: 0 } : { delay: 0.8 }}
              className="absolute bottom-12 uppercase tracking-widest text-xs text-stone-400"
            >
              {siteConfig.date.full}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
