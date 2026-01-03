import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Instagram, Globe } from 'lucide-react';
import { contactInfo } from '../mock';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#232323] to-[#3a3a3a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="BIN Bimbel"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-sm text-gray-300">
              Bimbingan Intensif Nusantara<br />
              Bright Excellence
            </p>
            <p className="text-sm text-gray-400">
              Belajar Jadi Seru, Prestasi Semakin Maju!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#F89E3C] transition-colors text-sm">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-gray-300 hover:text-[#F89E3C] transition-colors text-sm">
                  Program
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-gray-300 hover:text-[#F89E3C] transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-gray-300 hover:text-[#F89E3C] transition-colors text-sm">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-300 hover:text-[#F89E3C] transition-colors text-sm">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              {contactInfo.phone.map((contact, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#F89E3C]" />
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <a
                      href={`https://wa.me/${contact.number.replace(/\s/g, '')}`}
                      className="text-sm text-gray-300 hover:text-[#F89E3C] transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.number}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lokasi</h3>
            <div className="space-y-4">
              {contactInfo.locations.map((location) => (
                <div key={location.id} className="space-y-1">
                  <p className="text-sm font-semibold text-[#F89E3C]">{location.type}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{location.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a
                href="https://tiktok.com/@bunia_bin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#F89E3C] transition-colors"
              >
                <span className="text-xl">🎵</span>
                <span className="text-sm">@bunia_bin</span>
              </a>
              <a
                href="https://www.youtube.com/@binbimbel8284"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#F89E3C] transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm">BIN Bimbel</span>
              </a>
              <a
                href="https://www.instagram.com/bin.familynew?igsh=MWFqdjhndGU5bWIzZg=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#F89E3C] transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="text-sm">@bin.familynew</span>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} BIN Bimbel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
