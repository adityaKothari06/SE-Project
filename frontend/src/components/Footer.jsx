const Footer = () => {
  return (
    <footer className="bg-blue-100 text-gray-800 px-6 py-12 border-t border-blue-200">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">

        {/* About */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Zero Waste Pantry</h2>
          <p className="text-gray-600 leading-relaxed">
            Turning surplus food into hope by connecting those who have extra 
            with those who need it most.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Quick Links</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-blue-600 transition cursor-pointer">Browse Food</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Donate</li>
            <li className="hover:text-blue-600 transition cursor-pointer">How it Works</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Resources</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-blue-600 transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-blue-600 transition cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Contact</h2>
          <p className="text-gray-600">support@zerowaste.com</p>
          <p className="text-gray-600">+91 9876543210</p>

          {/* Mini tagline */}
          <p className="text-xs text-gray-500 mt-2">
            Every meal shared matters ❤️
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-blue-200 mt-10 pt-5 text-center text-gray-500 text-sm">
        © 2026 Zero Waste Pantry • Made with purpose 🌱
      </div>

    </footer>
  );
};

export default Footer;