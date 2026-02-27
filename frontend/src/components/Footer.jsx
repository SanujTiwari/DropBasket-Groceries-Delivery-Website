import { footerLinks } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gray-50 border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-2 rounded-xl shadow-lg group-hover:bg-primary-dark transition-colors border border-green-600/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">Drop<span className="text-primary italic">Basket</span></h2>
            </div>
            <p className="text-gray-500 text-sm font-bold leading-relaxed max-w-xs opacity-80">
              🌿 Fresh groceries delivered to your doorstep in minutes. Quality products, convenient shopping, and reliable service. Your daily needs, sorted.
            </p>
            <div className="flex gap-4">
              <SocialLink icon="f" />
              <SocialLink icon="t" />
              <SocialLink icon="i" />
            </div>
          </div>

          {/* Quick Links Mapping */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-900 font-black text-sm uppercase tracking-[0.2em] mb-8 opacity-40">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm text-gray-600 font-bold">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></span>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-10"></div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400 font-black uppercase tracking-widest">
          <p>© {currentYear} <span className="text-primary">DropBasket</span>. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition">Privacy</a>
            <a href="#" className="hover:text-primary transition">Terms</a>
            <a href="#" className="hover:text-primary transition">Sitemap</a>
          </div>
          <p className="opacity-40">Made with 💚 By Sanuj Tiwari</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }) => (
  <a href="#" className="w-12 h-12 bg-white border border-gray-100 shadow-sm text-gray-600 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
    <span className="font-black text-lg">{icon}</span>
  </a>
)

export default Footer;
