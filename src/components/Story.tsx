import { motion } from 'motion/react';
import { siteConfig } from '../config';
import { Image } from './Image';

export function Story() {
  return (
    <section id="story" className="py-24 md:py-32 lg:py-40 bg-stone-50 text-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="order-2 md:order-1"
        >
          <div className="aspect-[3/4] md:aspect-[4/5] relative overflow-hidden group">
            <Image 
              src={siteConfig.images.story}
              alt="Our Story"
              className="transition-transform duration-[20s] group-hover:scale-110 ease-out"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 z-10 pointer-events-none" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col justify-center order-1 md:order-2"
        >
          <p className="uppercase tracking-[0.2em] text-xs text-stone-400 mb-4 font-semibold">The Beginning</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-stone-900">{siteConfig.story.title}</h2>
          <p className="text-stone-600 leading-loose md:text-lg mb-10 font-light">
            {siteConfig.story.content}
          </p>
          <div className="pt-8 border-t border-stone-200 inline-block w-full">
            <p className="font-serif text-2xl md:text-3xl italic text-stone-500">
              {siteConfig.couple.firstName1} & {siteConfig.couple.firstName2}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
