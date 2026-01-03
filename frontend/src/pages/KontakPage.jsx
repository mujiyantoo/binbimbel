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
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F89E3C] to-[#e68d2b] rounded-lg flex items-center justify-center">
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Media Sosial</h3>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`https://instagram.com/${contactInfo.social.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium">
                        <Instagram className="h-4 w-4 mr-2" />
                        {contactInfo.social.instagram}
                      </Button>
                    </a>
                    <a
                      href={`https://${contactInfo.social.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-[#5A9C9B] hover:bg-[#4a8584] text-white font-medium">
                        <Globe className="h-4 w-4 mr-2" />
                        {contactInfo.social.website}
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