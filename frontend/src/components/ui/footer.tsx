import Link from "next/link";
import { GraduationCap, Github, X, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#030303] border-t border-white/10 text-white">
      <div className="w-full px-6 md:px-12 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">SkillHub</span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              Empowering the next generation of tech leaders through expert-led mentorship and collaborative learning experiences.
            </p>
            <div className="flex space-x-5">
              {[X, Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-violet-600/20 transition-all border border-white/10">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-violet-400 mb-6">Product</h3>
            <ul className="space-y-4">
              <li><Link href="/explore" className="text-gray-400 hover:text-white transition-colors">Find Mentors</Link></li>
              <li><Link href="/become-mentor" className="text-gray-400 hover:text-white transition-colors">Become a Mentor</Link></li>
              <li><Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-violet-400 mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors">API Docs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-violet-400 mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">
            © 2024 SkillHub. Crafted with passion for the tech community.
          </div>
          <div className="flex space-x-8 text-xs font-medium uppercase tracking-widest">
            <Link href="/terms" className="text-gray-500 hover:text-violet-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-violet-400 transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-gray-500 hover:text-violet-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
