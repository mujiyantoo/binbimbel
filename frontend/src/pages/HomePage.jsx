import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Target, Users, Clock, Star, CheckCircle, Sparkles, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { programs, testimonials, whyChooseUs, registrationFee, earlyBirdDiscount } from '../mock';

const HomePage = () => {
  const iconMap = {
    Brain,
    Target,
    Users,
    Clock
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#5A9C9B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F89E3C]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeInUp">
            {/* Badge */}
            <Badge className="bg-[#F89E3C] hover:bg-[#e68d2b] text-white px-6 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Diskon 20% untuk 30 Pendaftar Pertama!
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              BELAJAR JADI SERU<br />
              <span className="text-[#5A9C9B]">PRESTASI SEMAKIN MAJU!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Metode Cerdas, Hasil Tuntas<br />
              Siap Hadapi Ujian Bersama BIN Bimbel
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/pendaftaran">
                <Button className="bg-[#5A9C9B] hover:bg-[#4a8584] text-white font-semibold px-8 py-6 text-lg rounded-full transition-all hover:scale-105 shadow-lg">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/program">
                <Button variant="outline" className="border-2 border-[#5A9C9B] text-[#5A9C9B] hover:bg-[#5A9C9B] hover:text-white font-semibold px-8 py-6 text-lg rounded-full transition-all">
                  Lihat Program
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#5A9C9B]">10+</p>
                <p className="text-sm text-gray-600">Tahun Pengalaman</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#F89E3C]">500+</p>
                <p className="text-sm text-gray-600">Alumni Sukses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#5A9C9B]">95%</p>
                <p className="text-sm text-gray-600">Tingkat Kepuasan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              KENAPA PILIH KAMI?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BIN Bimbel menawarkan pendekatan pembelajaran yang berbeda dan terbukti efektif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <Card
                  key={item.id}
                  className="border-2 border-gray-100 hover:border-[#5A9C9B] transition-all hover:shadow-xl group cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#FFF9F2] to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              PILIH PROGRAM & HARGA SUKSESMU!
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Program belajar yang dirancang sesuai dengan kebutuhan dan target Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 3).map((program, index) => (
              <Card
                key={program.id}
                className="border-2 hover:border-[#F89E3C] transition-all hover:shadow-2xl group overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-2 bg-gradient-to-r from-[#5A9C9B] to-[#F89E3C]"></div>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Badge className="mb-3 bg-[#5A9C9B]/10 text-[#5A9C9B] hover:bg-[#5A9C9B]/20">
                      {program.level}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-600">{program.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#F89E3C]">{program.price}</span>
                      <span className="text-gray-600 ml-1">{program.period}</span>
                    </div>
                    <p className="text-sm text-gray-600">{program.frequency}</p>
                    <p className="text-sm font-medium text-[#5A9C9B]">{program.maxStudents}</p>
                  </div>

                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#5A9C9B] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/pendaftaran" className="block">
                    <Button className="w-full bg-[#F89E3C] hover:bg-[#e68d2b] text-white font-semibold rounded-full group-hover:scale-105 transition-all">
                      Daftar Program Ini
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/program">
              <Button variant="outline" className="border-2 border-[#5A9C9B] text-[#5A9C9B] hover:bg-[#5A9C9B] hover:text-white font-semibold px-8 py-3 rounded-full">
                Lihat Semua Program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#F89E3C] to-[#e68d2b]">
        <div className="container mx-auto">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-4">
                  <Badge className="bg-red-500 text-white hover:bg-red-600">
                    <Sparkles className="h-4 w-4 mr-1" />
                    PROMO TERBATAS
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Diskon Spesial 'Early Bird' 20%!
                  </h2>
                  <p className="text-lg text-gray-700">
                    Hanya untuk 30 pendaftar pertama bulan ini!<br />
                    <span className="font-semibold text-[#5A9C9B]">+ Bonus Kakak Adik & Referral Teman!</span>
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Trophy className="h-5 w-5 text-[#F89E3C]" />
                    <span>Biaya Pendaftaran: Rp {registrationFee.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link to="/pendaftaran">
                    <Button className="bg-[#5A9C9B] hover:bg-[#4a8584] text-white font-bold px-10 py-6 text-lg rounded-full shadow-lg hover:scale-105 transition-all">
                      Daftar & Dapatkan Diskon!
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              APA KATA MEREKA?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Testimoni dari siswa dan orang tua yang telah merasakan manfaat belajar di BIN Bimbel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="border-2 border-gray-100 hover:border-[#F89E3C] transition-all hover:shadow-xl animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] flex items-center justify-center border-2 border-[#5A9C9B]">
                      <span className="text-white text-2xl font-bold">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F89E3C] text-[#F89E3C]" />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  <Badge className="bg-[#5A9C9B]/10 text-[#5A9C9B] hover:bg-[#5A9C9B]/20 text-xs">
                    {testimonial.program}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] text-white">
        <div className="container mx-auto text-center space-y-8 animate-fadeInUp">
          <h2 className="text-3xl md:text-5xl font-bold">
            JANGAN TUNDA PRESTASIMU
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Bergabunglah dengan ratusan siswa yang telah merasakan metode belajar efektif kami
          </p>
          <Link to="/pendaftaran">
            <Button className="bg-[#F89E3C] hover:bg-[#e68d2b] text-white font-bold px-12 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-all">
              Daftar Sekarang!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
