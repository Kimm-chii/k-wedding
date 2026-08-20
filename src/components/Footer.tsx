import { siteConfig } from '../config';

export function Footer() {
  return (
    <footer className="py-16 md:py-24 bg-stone-950 text-stone-400 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-serif text-2xl md:text-4xl text-stone-300 tracking-wider mb-4">
          {siteConfig.couple.firstName1} <span className="font-sans font-light italic opacity-50 px-2">&</span> {siteConfig.couple.firstName2}
        </p>
        <p className="uppercase tracking-[0.2em] text-sm text-stone-500 mb-12">
          {siteConfig.date.full}
        </p>
        <div className="w-12 h-[1px] bg-stone-800 mx-auto mb-12" />
        <p className="text-xs text-stone-600 tracking-wider uppercase">
          &copy; {new Date().getFullYear()} {siteConfig.couple.firstName1} and {siteConfig.couple.firstName2}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
