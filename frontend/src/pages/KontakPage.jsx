import React from 'react';
import { MapPin, Phone, Instagram, Globe, Mail } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { contactInfo } from '../mock';

const KontakPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        <div className="container mx-auto text-center space-y-4 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Hubungi Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi kami melalui kontak di bawah ini
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone Numbers */}
              <Card className="border-2 hover:border-[#5A9C9B] transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Telepon / WhatsApp</h3>
                  </div>
                  <div className="space-y-3">
                    {contactInfo.phone.map((contact, index) => (
                      <div key={index} className="space-y-1">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <a
                          href={`https://wa.me/${contact.number.replace(/\D/g, '').replace(/^0/, '62')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium">
                            <Phone className="h-4 w-4 mr-2" />
                            {contact.number}
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-2 hover:border-[#F89E3C] transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F89E3C] to-[#e68d2b] rounded-lg flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Media Sosial & Lokasi</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Social Buttons (Left) */}
                    <div className="space-y-3">
                      <a
                        href="https://www.instagram.com/bin.familynew?igsh=MWFqdjhndGU5bWIzZg=="
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full border-2 border-pink-500 text-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white font-bold flex items-center justify-center space-x-2 transition-all">
                          <img src="/icons/instagram.png" alt="Instagram" className="w-5 h-5" />
                          <span>@bin.familynew</span>
                        </Button>
                      </a>
                      <a
                        href="https://tiktok.com/@bunia_bin"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full border-2 border-black text-black hover:bg-black hover:text-white font-bold flex items-center justify-center space-x-2 transition-all">
                          <img src="/icons/tiktok.png" alt="TikTok" className="w-5 h-5 rounded-full" />
                          <span>@bunia_bin</span>
                        </Button>
                      </a>
                      <a
                        href="https://www.youtube.com/@binbimbel8284"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full border-2 border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white font-bold flex items-center justify-center space-x-2 transition-all">
                          <img src="/icons/youtube.png" alt="YouTube" className="w-5 h-5 rounded-full" />
                          <span>BIN Bimbel</span>
                        </Button>
                      </a>
                    </div>

                    {/* Barcode Section (Right) */}
                    <div className="flex flex-col items-center justify-center space-y-2 pt-4 lg:pt-0 lg:border-l lg:border-gray-100 h-full">
                      <h3 className="font-bold text-sm text-gray-900 uppercase tracking-widest text-center">LOKASI BIN BIMBEL</h3>
                      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.open('https://maps.google.com/?q=JL.+Cisalam+Kubang+Rt.01+RW.05+Rancamacan+Kulon', '_blank')}>
                        <img src="/images/barcode.png" alt="Scan QR Location" className="w-32 h-32 object-contain" />
                      </div>
                      <p className="text-xs text-gray-400 text-center">Scan untuk petunjuk arah</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Locations */}
            <div className="space-y-6">
              {contactInfo.locations.map((location) => (
                <Card
                  key={location.id}
                  className="border-2 hover:border-[#5A9C9B] transition-all hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{location.type}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{location.address}</p>
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="w-full border-2 border-[#5A9C9B] text-[#5A9C9B] hover:bg-[#5A9C9B] hover:text-white font-medium">
                        <MapPin className="h-4 w-4 mr-2" />
                        Lihat di Google Maps
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] text-white">
        <div className="container mx-auto text-center space-y-6 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold">
            Siap Bergabung dengan BIN Bimbel?
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami kapan saja. Tim kami siap membantu Anda!
          </p>
          <Button className="bg-[#F89E3C] hover:bg-[#e68d2b] text-white font-bold px-10 py-4 text-lg rounded-full shadow-lg hover:scale-105 transition-all">
            <Mail className="mr-2 h-5 w-5" />
            Hubungi via WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default KontakPage;