import { motion } from 'motion/react';
import { siteConfig } from '../config';

export function Details() {
  return (
    <section id="details" className="py-24 md:py-32 lg:py-40 bg-stone-100 text-stone-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32"
        >
          <p className="uppercase tracking-[0.2em] text-xs text-stone-500 mb-4 font-semibold">When & Where</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-stone-900">The Details</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 text-center relative">
          <div className="hidden md:block absolute top-[40px] left-1/4 right-1/4 h-[1px] bg-stone-300 z-0" />
          
          {siteConfig.events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center bg-stone-100 px-4 md:px-6"
            >
              <div className="w-3 h-3 bg-stone-800 rounded-full mb-8 hidden md:block ring-4 ring-stone-100" />
              <p className="font-serif italic text-xl md:text-2xl text-stone-500 mb-3">{event.time}</p>
              <h3 className="text-2xl md:text-3xl mb-4 text-stone-900">{event.title}</h3>
              <p className="font-medium mb-1 tracking-wide uppercase text-sm">{event.location}</p>
              <p className="text-stone-500 text-sm mb-6">{event.address}</p>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
