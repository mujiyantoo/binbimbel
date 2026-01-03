import React from 'react';
import { MapPin, Phone, Instagram, Globe } from 'lucide-react';
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
                    <h3 className="text-xl font-bold text-gray-900">Media Sosial</h3>
                  </div>

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
          <a
            href="https://wa.me/6287871079085"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-10 py-4 text-lg rounded-full shadow-lg hover:scale-105 transition-all flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="mr-2 h-6 w-6">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
              Hubungi via WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default KontakPage;