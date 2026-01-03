import React from 'react';
import { Award, Target, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const TentangPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Visi',
      description: 'Menjadi lembaga bimbingan belajar terpercaya yang menghasilkan siswa berprestasi dan berakhlak mulia'
    },
    {
      icon: Heart,
      title: 'Misi',
      description: 'Memberikan pendidikan berkualitas dengan metode pembelajaran yang efektif dan menyenangkan'
    },
    {
      icon: Award,
      title: 'Kualitas',
      description: 'Tentor berpengalaman dan berkompeten di bidangnya dengan track record mengajar yang baik'
    },
    {
      icon: Users,
      title: 'Komunitas',
      description: 'Membangun lingkungan belajar yang supportif dan kondusif untuk perkembangan akademik siswa'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        <div className="container mx-auto text-center space-y-4 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Tentang BIN Bimbel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bina Insan Nusantara - Bright Excellence
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 animate-fadeInUp">
            <Card className="border-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Belajar Jadi Seru, Prestasi Semakin Maju!
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong className="text-[#5A9C9B]">Bina Insan Nusantara (BIN)</strong> adalah lembaga bimbingan belajar yang berkomitmen untuk membantu siswa mencapai prestasi akademik terbaik mereka. Dengan tagline "Bright Excellence", kami percaya bahwa setiap siswa memiliki potensi cemerlang yang perlu dikembangkan melalui metode pembelajaran yang tepat.
                  </p>
                  <p>
                    Kami menawarkan berbagai program bimbingan belajar mulai dari tingkat SD, SMP, hingga SMA, termasuk persiapan UTBK untuk masuk perguruan tinggi. Dengan tentor yang berpengalaman dan berkualitas, kami menggunakan pendekatan pembelajaran yang tidak hanya fokus pada penguasaan materi, tetapi juga pemahaman konsep yang mendalam.
                  </p>
                  <p>
                    Di BIN Bimbel, kami menciptakan suasana belajar yang menyenangkan dan kondusif. Kami percaya bahwa belajar tidak harus membosankan - dengan metode yang tepat, belajar bisa jadi seru dan hasilnya maksimal!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-2 hover:border-[#5A9C9B] transition-all hover:shadow-lg animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5A9C9B] to-[#4a8584] rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Why Choose Us */}
            <Card className="border-2 border-[#F89E3C] mt-12">
              <div className="h-2 bg-gradient-to-r from-[#5A9C9B] to-[#F89E3C]"></div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Keunggulan BIN Bimbel
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Tentor Berkualitas</h4>
                    <p className="text-sm text-gray-600">Pengajar muda, komunikatif, dan berpengalaman</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Metode Smart Learning</h4>
                    <p className="text-sm text-gray-600">Fokus pada pemahaman konsep, bukan hafalan</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Jadwal Fleksibel</h4>
                    <p className="text-sm text-gray-600">Sesuaikan dengan waktu luang Anda</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Harga Terjangkau</h4>
                    <p className="text-sm text-gray-600">Kualitas premium dengan harga bersahabat</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Fokus pada Target</h4>
                    <p className="text-sm text-gray-600">Persiapan PTS, PAS, dan UTBK yang matang</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-[#5A9C9B]">✓ Bimbingan PR</h4>
                    <p className="text-sm text-gray-600">Bantuan mengerjakan tugas sekolah</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangPage;