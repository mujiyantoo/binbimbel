import httpx
import time
import os

BASE_URL = "http://localhost:8000"

def wait_for_server():
    print("Waiting for server...")
    for _ in range(10):
        try:
            r = httpx.get(f"{BASE_URL}/")
            if r.status_code == 200:
                print("Server is up!")
                return True
        except:
            pass
        time.sleep(1)
    return False

def test_registration():
    print("Testing Registration...")
    payload = {
      "nama_lengkap": "Budi Santoso",
      "nama_panggilan": "Budi",
      "jenis_kelamin": "L",
      "tempat_lahir": "Jakarta",
      "tanggal_lahir": "2010-01-01",
      "asal_sekolah": "SDN 01 Pagi",
      "kelas": "sd6",
      "alamat": "Jl. Merpati No 1",
      "telepon": "081234567890",
      "email": "budi@example.com",
      "nama_ayah": "Santoso",
      "pekerjaan_ayah": "Wiraswasta",
      "telepon_ayah": "081234567891",
      "nama_ibu": "Siti",
      "pekerjaan_ibu": "Ibu Rumah Tangga",
      "telepon_ibu": "081234567892",
      "alamat_ortu": "Jl. Merpati No 1",
      "program": "reguler",
      "mata_pelajaran": ["Matematika", "IPA"],
      "hari": "senin",
      "waktu": "sore",
      "referensi": "Teman",
      "persetujuan": True,
      "tanggal_daftar": "2023-10-27"
    }
    
    try:
        r = httpx.post(f"{BASE_URL}/api/registrations", json=payload)
        if r.status_code == 201:
            print("Registration SUCCESS")
            return True
        else:
            print(f"Registration FAILED: {r.status_code} {r.text}")
            return False
    except Exception as e:
        print(f"Registration Error: {e}")
        return False

def test_get_registrations():
    print("Testing Get Registrations...")
    try:
        r = httpx.get(f"{BASE_URL}/api/registrations")
        if r.status_code == 200:
            data = r.json()
            print(f"Get Registrations SUCCESS. Count: {data.get('count')}")
            return True
        else:
            print(f"Get Registrations FAILED: {r.status_code}")
            return False
    except Exception as e:
        print(f"Get Error: {e}")
        return False

def test_export_excel():
    print("Testing Export Excel...")
    try:
        r = httpx.get(f"{BASE_URL}/api/registrations/export/excel")
        if r.status_code == 200:
            content_type = r.headers.get('content-type')
            if "spreadsheetml" in content_type:
                print("Export Excel SUCCESS (Content-Type correct)")
                with open("test_export.xlsx", "wb") as f:
                    f.write(r.content)
                print("Saved to test_export.xlsx")
                return True
            else:
                print(f"Export Excel FAILED: Wrong content type {content_type}")
                return False
        else:
            print(f"Export Excel FAILED: {r.status_code} {r.text}")
            return False
    except Exception as e:
        print(f"Export Error: {e}")
        return False

if __name__ == "__main__":
    if wait_for_server():
        if test_registration():
            test_get_registrations()
            test_export_excel()
