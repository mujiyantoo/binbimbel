import urllib.request

try:
    response = urllib.request.urlopen('http://localhost:8000/api/registrations')
    data = response.read().decode('utf-8')
    print(f"✅ Status: {response.status}")
    print(f"Response: {data[:300]}")
    print("\n✅ Database connection successful!")
except Exception as e:
    print(f"❌ Error: {e}")
