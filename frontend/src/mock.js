// Mock data untuk BIN Bimbel Website

export const programs = [
  {
    id: 1,
    title: 'Kelas Reguler SD',
    description: 'Matematika, IPA, IPS, PKN, B. Indonesia, B. Inggris',
    price: 'Rp 200.000',
    period: '/bulan',
    frequency: '3x Pertemuan/minggu',
    maxStudents: 'Max. 10 Orang',
    level: 'SD',
    features: [
      'Materi lengkap sesuai kurikulum',
      'Pembahasan soal PTS & PAS',
      'Bimbingan PR',
      'Laporan perkembangan belajar'
    ]
  },
  {
    id: 2,
    title: 'Kelas Reguler SMP',
    description: 'Matematika, IPA, B. Indonesia',
    price: 'Rp 250.000',
    period: '/bulan',
    frequency: '3x Pertemuan/minggu',
    maxStudents: 'Max. 10 Orang',
    level: 'SMP',
    features: [
      'Fokus pada mata pelajaran inti',
      'Persiapan ujian sekolah',
      'Drilling soal',
      'Konsultasi belajar'
    ]
  },
  {
    id: 3,
    title: 'Kelas Reguler SMA',
    description: 'Matematika, IPA, B. Indonesia, B. Inggris',
    price: 'Rp 250.000',
    period: '/bulan',
    frequency: '3x Pertemuan/minggu',
    maxStudents: 'Max. 10 Orang',
    level: 'SMA',
    features: [
      'Materi peminatan IPA/IPS',
      'Persiapan UTBK',
      'Try out berkala',
      'Bimbingan jurusan kuliah'
    ]
  },
  {
    id: 4,
    title: 'Kelas Privat',
    description: 'Belajar personal sesuai kebutuhan siswa',
    price: 'Rp 250.000',
    period: '/bulan',
    frequency: '2x Pertemuan/minggu',
    maxStudents: 'Max. 3 Orang',
    level: 'Semua Jenjang',
    features: [
      'Jadwal fleksibel',
      'Materi custom sesuai kebutuhan',
      'Perhatian lebih fokus',
      'Pilihan mata pelajaran tertentu'
    ]
  },
  {
    id: 5,
    title: 'Program Intensif UTBK',
    description: 'Fokus kebut soal dan strategi lolos ujian',
    price: 'Hubungi Admin',
    period: '',
    frequency: 'Jadwal Intensif',
    maxStudents: 'Kelas Khusus',
    level: 'SMA',
    features: [
      'Drilling soal UTBK',
      'Strategi mengerjakan soal',
      'Try out simulasi UTBK',
      'Analisis hasil TO',
      'Bimbingan pemilihan PTN'
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Siti Nurhaliza',
    role: 'Orang Tua Siswa SD',
    photo: null,
    rating: 5,
    text: 'Alhamdulillah, anak saya sangat terbantu dengan bimbingan dari BIN. Nilai matematika meningkat drastis dari 65 menjadi 90. Tentor sangat sabar dan komunikatif!',
    program: 'Kelas Reguler SD'
  },
  {
    id: 2,
    name: 'Ahmad Fauzi',
    role: 'Siswa SMP Kelas 9',
    photo: null,
    rating: 5,
    text: 'Metode belajar di BIN bikin aku lebih paham konsep, bukan cuma hafalan. Tentor juga asyik dan bisa jadi teman curhat soal pelajaran.',
    program: 'Kelas Reguler SMP'
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    role: 'Orang Tua Siswa SMA',
    photo: null,
    rating: 5,
    text: 'Program intensif UTBK sangat membantu anak saya. Alhamdulillah lulus SNBT dan diterima di PTN favorit. Terima kasih BIN Bimbel!',
    program: 'Program Intensif UTBK'
  },
  {
    id: 4,
    name: 'Rizky Ramadhan',
    role: 'Siswa SMA Kelas 12',
    photo: null,
    rating: 5,
    text: 'Les privat di BIN fleksibel banget jadwalnya. Materi juga bisa disesuaikan sama kebutuhan aku. Worth it!',
    program: 'Kelas Privat'
  },
  {
    id: 5,
    name: 'Ibu Ratna',
    role: 'Orang Tua Siswa SD',
    photo: null,
    rating: 5,
    text: 'Harga terjangkau, kualitas bagus. Anak saya jadi lebih semangat belajar dan PR sekolah jadi lancar dikerjakan.',
    program: 'Kelas Reguler SD'
  },
  {
    id: 6,
    name: 'Fahmi Hakim',
    role: 'Siswa SMP Kelas 8',
    photo: null,
    rating: 5,
    text: 'Belajar di BIN seru! Bukan cuma fokus soal, tapi juga diajarin cara berpikir kritis. Terima kasih kak tentor!',
    program: 'Kelas Reguler SMP'
  }
];

export const whyChooseUs = [
  {
    id: 1,
    title: 'Smart Learning',
    description: 'Paham konsep dasar, bukan sekadar menghafal',
    icon: 'Brain'
  },
  {
    id: 2,
    title: 'Fokus Target',
    description: 'Siap PTS, PAS, Ujian Sekolah & UTBK',
    icon: 'Target'
  },
  {
    id: 3,
    title: 'Tentor Asyik',
    description: 'Pengajar muda berkualitas & komunikatif',
    icon: 'Users'
  },
  {
    id: 4,
    title: 'Jadwal Fleksibel',
    description: 'Belajar nyaman, waktu istirahat aman',
    icon: 'Clock'
  }
];

export const galleryImages = [
  {
    id: 1,
    url: '/gallery/img1.jpg',
    caption: 'Suasana Belajar di Kelas',
    category: 'classroom'
  },
  {
    id: 2,
    url: '/gallery/img2.jpg',
    caption: 'Foto Bersama Siswa',
    category: 'activity'
  },
  {
    id: 3,
    url: '/gallery/img3.jpg',
    caption: 'Kegiatan Bimbingan',
    category: 'classroom'
  },
  {
    id: 4,
    url: '/gallery/img4.jpg',
    caption: 'Prestasi Siswa',
    category: 'intensive'
  },
  {
    id: 5,
    url: '/gallery/img5.jpg',
    caption: 'Outing Class',
    category: 'activity'
  }
];

export const contactInfo = {
  phone: [
    { name: 'Nia Kurniawati', number: '087871079085' },
    { name: 'Slamet Irawan', number: '08954 028 47670' }
  ],
  locations: [
    {
      id: 1,
      type: 'Kantor Pusat',
      address: 'JL. Cisalam Kubang Rt.01 RW.05 Rancamacan Kulon - Karikil - Mangkubumi, Kota Tasikmalaya',
      mapUrl: 'https://maps.google.com/?q=JL.+Cisalam+Kubang+Rt.01+RW.05+Rancamacan+Kulon'
    },
    {
      id: 2,
      type: 'Cabang',
      address: 'JL. Raya Panumbangan Kp. Sidangharja RT.005/RW.005 Ds. Tanjungmulya Kec. Panumbangan Kabupaten Ciamis (Masuk sebelah Bakso Aqila, 30 meter dari Jl. Raya)',
      mapUrl: 'https://maps.google.com/?q=Panumbangan+Ciamis'
    }
  ],
  social: {
    instagram: '@binbimbel_official',
    website: 'www.binbimbel.com'
  }
};

export const registrationFee = 100000;
export const earlyBirdDiscount = 0.2; // 20%
export const earlyBirdSlots = 30;
