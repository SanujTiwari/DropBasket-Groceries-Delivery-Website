import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gradient-to-b from-green-50 to-green-100 border-t-2 border-green-200">
      {/* Main Footer Content */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <div className="bg-primary p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-primary group-hover:translate-x-1 transition-transform duration-300">Drop<span className="text-gray-800">Basket</span></h2>
            </div>
            <p className="text-gray-600 text-sm leading-6 max-w-sm">
              🌿 Fresh groceries delivered to your doorstep in minutes. Quality products, convenient shopping, and reliable service.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.slice(0, 2).map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary hover:translate-x-1 transition-all transform"
                    >
                      → {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Resources */}
          {footerLinks.slice(2).map((section, index) => (
            <div key={index}>
              <h3 className="text-gray-800 font-bold text-lg mb-4 flex items-center gap-2">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary hover:translate-x-1 transition-all transform"
                    >
                      → {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


        {/* Divider */}
        <div className="border-t-2 border-green-200"></div>
      </div>

      {/* Bottom Copyright */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-6 text-center text-sm text-gray-600">
        <p>© {currentYear} <span className="font-bold text-primary">DropBasket</span> - Fresh Groceries, Fast Delivery. Made with 💚 By Sanuj</p>
        <p className="text-xs text-gray-500 mt-2">
          <a href="#" className="hover:text-primary transition">Privacy Policy</a> •
          <a href="#" className="hover:text-primary transition"> Terms & Conditions</a> •
          <a href="#" className="hover:text-primary transition"> Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
