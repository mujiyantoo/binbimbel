import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { galleryImages } from '../mock';

const GaleriPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'classroom', label: 'Kelas Reguler' },
    { id: 'intensive', label: 'Program Intensif' },
    { id: 'private', label: 'Kelas Privat' },
    { id: 'activity', label: 'Aktivitas' }
  ];

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        <div className="container mx-auto text-center space-y-4 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Galeri Kegiatan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dokumentasi suasana belajar dan kegiatan di BIN Bimbel
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer px-6 py-2 text-sm font-medium transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-[#5A9C9B] text-white hover:bg-[#4a8584]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4 bg-[#FFF9F2]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover:shadow-2xl transition-all group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-semibold">{image.caption}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GaleriPage;