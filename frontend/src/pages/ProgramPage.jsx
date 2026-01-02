import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { programs } from '../mock';

const ProgramPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        <div className="container mx-auto text-center space-y-4 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Program Bimbingan Belajar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih program yang sesuai dengan kebutuhan dan target belajar Anda
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] text-white">
        <div className="container mx-auto text-center space-y-6 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold">
            Masih Bingung Pilih Program?
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi gratis dan dapatkan rekomendasi program terbaik
          </p>
          <Link to="/kontak">
            <Button className="bg-[#F89E3C] hover:bg-[#e68d2b] text-white font-bold px-10 py-4 text-lg rounded-full shadow-lg hover:scale-105 transition-all">
              Hubungi Kami
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProgramPage;