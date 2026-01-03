import React from 'react';
import { Card, CardContent } from '../components/ui/card';

const PendaftaranPage = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F2]">
            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Formulir Pendaftaran Siswa Baru
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Bergabunglah bersama BIN Bimbel untuk meraih prestasi terbaikmu. Silakan isi formulir di bawah ini.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <Card className="border-2 border-gray-200 shadow-xl">
                        <div className="h-2 bg-gradient-to-r from-[#5A9C9B] to-[#F89E3C]"></div>
                        <CardContent className="p-0">
                            {/* 
                                PETUNJUK PENGGUNAAN:
                                1. Buat Google Form baru di https://forms.google.com
                                2. Sesuai permintaan, jangan sertakan pertanyaan data Orang Tua/Wali.
                                3. Klik tombol "Kirim" (Send) > pilih tab "Embed HTML" (< >).
                                4. Salin URL dari atribut 'src' pada kode embed tersebut.
                                5. Ganti URL di bawah ini dengan URL Google Form Anda.
                            */}
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform?embedded=true"
                                width="100%"
                                height="800"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="Formulir Pendaftaran"
                                className="w-full min-h-[800px]"
                            >
                                Memuat formulir...
                            </iframe>
                        </CardContent>
                    </Card>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        <p>Jika formulir tidak muncul, silakan akses melalui <a href="https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder/viewform" target="_blank" rel="noopener noreferrer" className="text-[#5A9C9B] underline hover:text-[#4a8584]">tautan ini</a>.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PendaftaranPage;
