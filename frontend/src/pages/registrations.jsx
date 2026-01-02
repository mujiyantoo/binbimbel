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
import { CheckCircle, User, Users, GraduationCap, Info } from 'lucide-react';
{/* Form Section */ }
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
          </div>


          <div className="space-y-6 mt-6 border-t pt-6">
            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
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
