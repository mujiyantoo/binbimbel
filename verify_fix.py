import urllib.request
import json
import urllib.error

# URL of the registration endpoint
url = 'http://localhost:8000/api/registrations'

# Invalid payload (missing nama_lengkap)
payload = {
    # "nama_lengkap": "Test Siswa Verification",
    "kelas": "SMA Kelas 10",
    "telepon": "081234567890",
    "program": "reguler",
    "mata_pelajaran": ["Matematika", "Fisika"],
    "hari": "senin",
    "waktu": "sore",
    "persetujuan": True,
    "tanggal_daftar": "2025-01-01"
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        print("Response Body:")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print("Error Body:")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"An error occurred: {e}")
