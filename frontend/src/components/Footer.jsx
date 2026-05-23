import { Link } from "react-router-dom";
import { footerLinks } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-slate-900 text-slate-100 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-primary p-2 rounded-xl shadow-lg hover:bg-primary-dark transition-colors border border-green-600/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-black tracking-tighter uppercase text-white">
                Drop<span className="text-primary italic font-serif">Basket</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs opacity-90">
              🌿 Fresh groceries delivered to your doorstep in minutes. Quality products, convenient shopping, and reliable service. Your daily needs, sorted.
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://facebook.com" platform="facebook" />
              <SocialLink href="https://twitter.com" platform="twitter" />
              <SocialLink href="https://instagram.com" platform="instagram" />
            </div>
          </div>

          {/* Quick Links Mapping */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-slate-200 font-extrabold text-sm uppercase tracking-[0.2em] mb-8 opacity-80">
                {section.title}
              </h3>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.url.startsWith("http") ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-primary transition-colors"></span>
                        {link.text}
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-primary transition-colors"></span>
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-10"></div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
          <p>© {currentYear} <span className="text-primary">DropBasket</span>. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/faq" className="hover:text-primary transition text-slate-400">Privacy</Link>
            <Link to="/faq" className="hover:text-primary transition text-slate-400">Terms</Link>
            <Link to="/faq" className="hover:text-primary transition text-slate-400">Sitemap</Link>
          </div>
          <p className="opacity-55">Made with 💚 By Sanuj Tiwari</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, platform }) => {
  const getIcon = () => {
    switch (platform) {
      case "facebook":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        );
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.315 2.185c1.554.002 1.899.01 2.742.048 1.106.05 1.882.228 2.508.471a4.872 4.872 0 012.24 2.24c.243.626.42 1.402.47 2.508.037.843.046 1.188.048 2.742v.006c-.002 1.554-.01 1.899-.048 2.742-.05 1.106-.228 1.882-.47 2.508a4.87 4.87 0 01-2.24 2.24c-.626.243-1.402.42-2.508.47-.843.037-1.188.046-2.742.048h-.006c-1.554-.002-1.899-.01-2.742-.048-1.106-.05-1.882-.228-2.508-.47a4.872 4.872 0 01-2.24-2.24c-.243-.626-.42-1.402-.47-2.508-.037-.843-.046-1.188-.048-2.742v-.006c.002-1.554.01-1.899.048-2.742.05-1.106.228-1.882.47-2.508a4.872 4.872 0 012.24-2.24c.626-.243 1.402-.42 2.508-.47.843-.037 1.188-.046 2.742-.048h.006zm-1.047 1.777c-1.542.003-1.802.01-2.404.038-.857.039-1.32.182-1.63.303a3.09 3.09 0 00-1.745 1.745c-.12.31-.264.773-.303 1.63-.028.602-.035.862-.038 2.404v.006c.003 1.542.01 1.802.038 2.404.039.857.182 1.32.303 1.63a3.09 3.09 0 001.745 1.745c.31.12.773.264 1.63.303.602.028.862.035 2.404.038h.006c1.542-.003 1.802-.01 2.404-.038.857-.039 1.32-.182 1.63-.303a3.09 3.09 0 001.745-1.745c.12-.31.264-.773.303-1.63.028-.602.035-.862.038-2.404v-.006c-.038-1.542-.045-1.802-.038-2.404-.039-.857-.182-1.32-.303-1.63a3.09 3.09 0 00-1.745-1.745c-.31-.12-.773-.264-1.63-.303-.602-.028-.862-.035-2.404-.038h-.006zm-1.268 4.29a3.75 3.75 0 105.25 5.25 3.75 3.75 0 00-5.25-5.25zm1.503 4.225a2.25 2.25 0 113.181-3.183 2.25 2.25 0 01-3.181 3.183zm5.702-6.19a.9.9 0 100 1.8.9.9 0 000-1.8z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-md"
    >
      {getIcon()}
    </a>
  );
};

export default Footer;
