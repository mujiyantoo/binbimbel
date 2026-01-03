import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/use-toast';
import { User, GraduationCap } from 'lucide-react';

const PendaftaranPage = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        nama_panggilan: '',
        jenis_kelamin: 'L',
        tempat_lahir: '',
        tanggal_lahir: '',
        asal_sekolah: '',
        kelas: '',
        alamat: '',
        telepon: '',
        email: '',
        // Data Orang Tua dihapus sesuai permintaan
        program: '',
        mata_pelajaran: [],
        hari: '',
        waktu: '',
        referensi: '',
        persetujuan: false
    });

    const mataPelajaran = [
        'Matematika', 'IPA', 'IPS', 'PKN', 'B. Indonesia', 'B. Inggris'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (mapel) => {
        setFormData(prev => {
            const currentMapel = prev.mata_pelajaran;
            if (currentMapel.includes(mapel)) {
                return { ...prev, mata_pelajaran: currentMapel.filter(m => m !== mapel) };
            } else {
                return { ...prev, mata_pelajaran: [...currentMapel, mapel] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyPAEpAkssdOO1YjLq7R1sfg6Hye7iibni0ZqhkDO41ss_UAICjrDS28XqZxk-gWMbKmw/exec';

        try {
            const formDataToSend = new FormData();

            // Append all fields to FormData
            Object.keys(formData).forEach(key => {
                if (key === 'mata_pelajaran' && Array.isArray(formData[key])) {
                    formDataToSend.append(key, formData[key].join(', '));
                } else if (key === 'persetujuan') {
                    // Skip persetujuan or send as string
                    formDataToSend.append(key, formData[key] ? 'Ya' : 'Tidak');
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Google Apps Script usually requires no-cors for simple POSTs from client-side
            // unless configured with specific CORS headers.
            // We'll try 'no-cors' mode which means we won't get a readable JSON response 
            // but the request will go through.
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formDataToSend,
                mode: 'no-cors'
            });

            // Since we can't read the response in no-cors, we assume success if no error was thrown.
            toast({
                title: "Pendaftaran Berhasil!",
                description: "Data Anda telah kami kirim.",
                variant: "success",
            });

            // Reset form
            setFormData({
                nama_lengkap: '',
                nama_panggilan: '',
                jenis_kelamin: 'L',
                tempat_lahir: '',
                tanggal_lahir: '',
                asal_sekolah: '',
                kelas: '',
                alamat: '',
                telepon: '',
                email: '',
                program: '',
                mata_pelajaran: [],
                hari: '',
                waktu: '',
                referensi: '',
                persetujuan: false
            });

        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: "Gagal Mendaftar",
                description: "Mohon periksa kembali koneksi internet anda.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const kelasOptions = [
        { value: 'tk-a', label: 'TK A' },
        { value: 'tk-b', label: 'TK B' },
        { value: 'sd-1', label: '1 SD' },
        { value: 'sd-2', label: '2 SD' },
        { value: 'sd-3', label: '3 SD' },
        { value: 'sd-4', label: '4 SD' },
        { value: 'sd-5', label: '5 SD' },
        { value: 'sd-6', label: '6 SD' },
        { value: 'smp-7', label: '7 SMP' },
        { value: 'smp-8', label: '8 SMP' },
        { value: 'smp-9', label: '9 SMP' },
        { value: 'sma-10', label: '10 SMA' },
        { value: 'sma-11', label: '11 SMA' },
        { value: 'sma-12', label: '12 SMA' },
        { value: 'alumni', label: 'Alumni/Gap Year' },
    ];

    return (
        <div className="min-h-screen bg-[#FFF9F2]">
            {/* Header */}
            <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Formulir Pendaftaran Siswa Baru
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Bergabunglah bersama BIN Bimbel untuk meraih prestasi terbaikmu. Silakan lengkapi data diri di bawah ini dengan benar.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 px-4 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Data Calon Siswa */}
                        <Card className="border-2 border-gray-200">
                            <div className="h-2 bg-gradient-to-r from-[#5A9C9B] to-[#F89E3C]"></div>
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-[#5A9C9B] rounded-lg flex items-center justify-center">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900"><span>Data Siswa</span></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
                                        <Input
                                            id="nama_lengkap"
                                            name="nama_lengkap"
                                            value={formData.nama_lengkap}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nama_panggilan">Nama Panggilan</Label>
                                        <Input
                                            id="nama_panggilan"
                                            name="nama_panggilan"
                                            value={formData.nama_panggilan}
                                            onChange={handleInputChange}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label>Jenis Kelamin *</Label>
                                        <RadioGroup
                                            defaultValue="L"
                                            value={formData.jenis_kelamin}
                                            onValueChange={(value) => handleSelectChange('jenis_kelamin', value)}
                                            className="flex space-x-4 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="L" id="r1" />
                                                <Label htmlFor="r1">Laki-laki</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="P" id="r2" />
                                                <Label htmlFor="r2">Perempuan</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div>
                                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                        <Input
                                            id="tempat_lahir"
                                            name="tempat_lahir"
                                            value={formData.tempat_lahir}
                                            onChange={handleInputChange}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                        <Input
                                            id="tanggal_lahir"
                                            name="tanggal_lahir"
                                            type="date"
                                            value={formData.tanggal_lahir}
                                            onChange={handleInputChange}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="asal_sekolah">Asal Sekolah</Label>
                                        <Input
                                            id="asal_sekolah"
                                            name="asal_sekolah"
                                            value={formData.asal_sekolah}
                                            onChange={handleInputChange}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="kelas">Kelas yang akan ditempuh *</Label>
                                        <Select value={formData.kelas} onValueChange={(value) => handleSelectChange('kelas', value)}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {kelasOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="telepon">No. Telepon/HP *</Label>
                                        <Input
                                            id="telepon"
                                            name="telepon"
                                            type="tel"
                                            value={formData.telepon}
                                            onChange={handleInputChange}
                                            required
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="alamat">Alamat Lengkap</Label>
                                        <Textarea
                                            id="alamat"
                                            name="alamat"
                                            value={formData.alamat}
                                            onChange={handleInputChange}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pilihan Program */}
                        <Card className="border-2 border-gray-200">
                            <div className="h-2 bg-gradient-to-r from-[#5A9C9B] to-[#F89E3C]"></div>
                            <CardContent className="p-6 md:p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-[#5A9C9B] rounded-lg flex items-center justify-center">
                                        <GraduationCap className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900"><span>Program Bimbel</span></h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="program">Program yang diambil *</Label>
                                        <Select value={formData.program} onValueChange={(value) => handleSelectChange('program', value)}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Pilih Program" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="reguler">Reguler</SelectItem>
                                                <SelectItem value="intensif">Intensif</SelectItem>
                                                <SelectItem value="privat">Privat</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label className="mb-3 block">Mata Pelajaran (pilih yang sesuai) *</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {mataPelajaran.map((mapel) => (
                                                <div key={mapel} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={mapel}
                                                        checked={formData.mata_pelajaran.includes(mapel)}
                                                        onCheckedChange={() => handleCheckboxChange(mapel)}
                                                    />
                                                    <Label htmlFor={mapel} className="text-sm cursor-pointer">
                                                        {mapel}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="hari">Jadwal Hari *</Label>
                                            <Select value={formData.hari} onValueChange={(value) => handleSelectChange('hari', value)}>
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue placeholder="Pilih Hari" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="senin">Senin</SelectItem>
                                                    <SelectItem value="selasa">Selasa</SelectItem>
                                                    <SelectItem value="rabu">Rabu</SelectItem>
                                                    <SelectItem value="kamis">Kamis</SelectItem>
                                                    <SelectItem value="jumat">Jumat</SelectItem>
                                                    <SelectItem value="sabtu">Sabtu</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="waktu">Jadwal Waktu *</Label>
                                            <Select value={formData.waktu} onValueChange={(value) => handleSelectChange('waktu', value)}>
                                                <SelectTrigger className="mt-2">
                                                    <SelectValue placeholder="Pilih Waktu" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sore">Sore (16.00-20.00)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="referensi">Tahu BIN Bimbel dari mana?</Label>
                                        <Input
                                            id="referensi"
                                            name="referensi"
                                            value={formData.referensi}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: Teman, Instagram, Brosur"
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6 mt-6 border-t pt-6">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            id="persetujuan"
                                            checked={formData.persetujuan}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, persetujuan: checked }))}
                                        />
                                        <Label htmlFor="persetujuan" className="text-sm leading-relaxed">
                                            Saya menyatakan bahwa data yang diisi adalah benar dan menyetujui ketentuan yang berlaku di BIN Bimbel.
                                        </Label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || !formData.persetujuan}
                                            className="w-full bg-[#5A9C9B] hover:bg-[#4a8584] text-white font-bold py-6 text-lg rounded-full shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form >
                </div >
            </section >
        </div >
    );
};

export default PendaftaranPage;
