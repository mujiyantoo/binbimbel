import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Users, GraduationCap, TrendingUp, Eye, RefreshCw, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const AdminPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In Netlify, the API will be available at the same domain under /api
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
      console.log('Fetching registrations from:', `${BACKEND_URL}/api/registrations`);

      // Fetch registrations
      const regResponse = await fetch(`${BACKEND_URL}/api/registrations`);
      console.log('Reg Response Status:', regResponse.status);

      if (!regResponse.ok) {
        const errorText = await regResponse.text();
        console.error('API Error Response:', errorText.substring(0, 500));
        throw new Error(`API returned ${regResponse.status}`);
      }

      const regData = await regResponse.json();
      console.log('Reg Data:', regData);
      if (regData.success) {
        setRegistrations(regData.data);
      }

      // Fetch stats
      const statsResponse = await fetch(`${BACKEND_URL}/api/registrations/stats/summary`);
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrationDetail = async (id) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${BACKEND_URL}/api/registrations/${id}`);
      const data = await response.json();

      if (data.success) {
        setSelectedRegistration(data.data);
        setIsDetailOpen(true);
      }
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${BACKEND_URL}/api/registrations/export/excel`);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = `Data_Pendaftaran_BIN_Bimbel_${new Date().toISOString().split('T')[0]}.xlsx`;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Export failed');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const programBadgeColor = (program) => {
    switch (program) {
      case 'reguler': return 'bg-blue-100 text-blue-700';
      case 'intensif': return 'bg-red-100 text-red-700';
      case 'privat': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const kelasBadgeColor = (kelas) => {
    if (kelas.startsWith('sd')) return 'bg-yellow-100 text-yellow-700';
    if (kelas.startsWith('smp')) return 'bg-purple-100 text-purple-700';
    if (kelas.startsWith('sma')) return 'bg-pink-100 text-pink-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2]">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-[#5A9C9B]/10 via-[#FFF9F2] to-[#F89E3C]/10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Data Pendaftaran Siswa BIN Bimbel
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={handleExportExcel}
                disabled={isExporting}
                variant="outline"
                className="border-[#F89E3C] text-[#F89E3C] hover:bg-[#F89E3C] hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export ke Excel'}
              </Button>
              <Button
                onClick={fetchData}
                className="bg-[#5A9C9B] hover:bg-[#4a8584] text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      {stats && (
        <section className="py-8 px-4 -mt-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-[#5A9C9B]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Pendaftaran</p>
                      <p className="text-3xl font-bold text-[#5A9C9B]">
                        {stats.total_registrations}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#5A9C9B] rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#F89E3C]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Program Aktif</p>
                      <p className="text-3xl font-bold text-[#F89E3C]">
                        {Object.keys(stats.by_program || {}).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#F89E3C] rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#5A9C9B]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Jenjang</p>
                      <p className="text-3xl font-bold text-[#5A9C9B]">
                        {Object.keys(stats.by_level || {}).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-[#5A9C9B] rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Registrations Table */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Daftar Pendaftaran
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Loading...</p>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">Belum ada data pendaftaran</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Program</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Kelas</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Telepon</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg.registration_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {reg.nama_lengkap}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={programBadgeColor(reg.program)}>
                              {reg.program}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={kelasBadgeColor(reg.kelas)}>
                              {reg.kelas.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{reg.telepon}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">
                            {new Date(reg.created_at).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => fetchRegistrationDetail(reg.registration_id)}
                              className="text-[#5A9C9B] border-[#5A9C9B] hover:bg-[#5A9C9B] hover:text-white"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pendaftaran</DialogTitle>
          </DialogHeader>

          {selectedRegistration && (
            <div className="space-y-6">
              {/* Data Siswa */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-[#5A9C9B]">Data Siswa</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nama Lengkap</p>
                    <p className="font-medium">{selectedRegistration.nama_lengkap}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nama Panggilan</p>
                    <p className="font-medium">{selectedRegistration.nama_panggilan || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Jenis Kelamin</p>
                    <p className="font-medium">{selectedRegistration.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tempat, Tanggal Lahir</p>
                    <p className="font-medium">{selectedRegistration.tempat_lahir}, {selectedRegistration.tanggal_lahir}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Asal Sekolah</p>
                    <p className="font-medium">{selectedRegistration.asal_sekolah}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kelas</p>
                    <p className="font-medium">{selectedRegistration.kelas.toUpperCase()}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Alamat</p>
                    <p className="font-medium">{selectedRegistration.alamat}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Telepon</p>
                    <p className="font-medium">{selectedRegistration.telepon}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{selectedRegistration.email || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-[#5A9C9B]">Data Orang Tua</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nama Ayah</p>
                    <p className="font-medium">{selectedRegistration.nama_ayah}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pekerjaan Ayah</p>
                    <p className="font-medium">{selectedRegistration.pekerjaan_ayah || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Telepon Ayah</p>
                    <p className="font-medium">{selectedRegistration.telepon_ayah}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nama Ibu</p>
                    <p className="font-medium">{selectedRegistration.nama_ibu}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pekerjaan Ibu</p>
                    <p className="font-medium">{selectedRegistration.pekerjaan_ibu || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Telepon Ibu</p>
                    <p className="font-medium">{selectedRegistration.telepon_ibu}</p>
                  </div>
                </div>
              </div>

              {/* Program */}
              <div>
                <h3 className="font-bold text-lg mb-3 text-[#5A9C9B]">Program Bimbel</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Program</p>
                    <Badge className={`${programBadgeColor(selectedRegistration.program)} mt-1`}>
                      {selectedRegistration.program}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-600">Jadwal</p>
                    <p className="font-medium">{selectedRegistration.hari} - {selectedRegistration.waktu}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-2">Mata Pelajaran</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegistration.mata_pelajaran?.map((mapel, idx) => (
                        <Badge key={idx} className="bg-[#F89E3C]/10 text-[#F89E3C]">
                          {mapel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Referensi</p>
                    <p className="font-medium">{selectedRegistration.referensi}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
