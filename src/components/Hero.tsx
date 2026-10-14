import { motion } from 'motion/react';
import { siteConfig } from '../config';
import { Image } from './Image';

export function Hero() {
  return (
    <section className="relative h-[calc(var(--sh,1vh)*100)] w-full flex items-center justify-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={siteConfig.images.hero} 
          alt={`${siteConfig.couple.firstName1} and ${siteConfig.couple.firstName2}`} 
          className="object-cover w-full h-full brightness-[0.5]"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-stone-50 px-4 text-center mt-12 md:mt-0">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4.2 }}
          className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-6 md:mb-8"
        >
          We are getting married
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4.5 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 md:mb-10 font-serif leading-none"
        >
          {siteConfig.couple.firstName1} & {siteConfig.couple.firstName2}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 4.8 }}
          className="text-lg sm:text-xl md:text-3xl font-serif italic text-stone-200"
        >
          {siteConfig.date.full}
        </motion.p>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 5.6 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-stone-300 text-[10px] md:text-xs uppercase tracking-widest mb-3">Scroll</span>
        <div className="w-[1px] h-12 md:h-16 bg-stone-50/30 relative overflow-hidden">
          <motion.div 
            className="w-full h-full bg-stone-50 absolute top-0"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
