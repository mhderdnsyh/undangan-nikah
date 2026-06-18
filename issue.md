# DOKUMEN ISSUE: Implementasi Nama Tamu Dinamis via Parameter URL

## Deskripsi Singkat
Saat ini, aplikasi mengandalkan panggilan API ke *backend* (`/api/guests/`) untuk mendapatkan nama tamu undangan. Namun, karena aplikasi kita sudah menjadi 100% statis (tanpa *database*), kita perlu menyederhanakan fitur ini. Kita bisa langsung menggunakan parameter URL (misalnya `?to=Nama+Tamu`) untuk menampilkan nama tamu undangan secara dinamis, sehingga Anda atau rekan Anda cukup mengubah _link_ yang dibagikan tanpa perlu melakukan _input_ data satu per satu ke dalam sistem.

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI)

Ikuti langkah-langkah di bawah ini untuk mengubah alur kode menjadi murni statis berbasis URL.

### Langkah 1: Buka File Komponen Hero
1. Buka file `client/src/components/Hero.tsx`. File ini mengatur halaman pembuka di mana nama tamu (sebelum tombol "Buka Undangan") ditampilkan.

### Langkah 2: Hapus Panggilan API (*Fetch*) dan Sederhanakan Logika
1. Cari blok `useEffect` yang membaca `window.location.search`.
2. Saat ini, kode tersebut mencoba melakukan `fetch('/api/guests/${to}')` dan hanya menggunakan nilai parameter URL jika `fetch` tersebut gagal (*fallback*).
3. Hapus seluruh logika `fetch` tersebut.
4. Ganti isi `useEffect` tersebut menjadi logika murni URL. Ubah seluruh kode `useEffect` tersebut menjadi seperti ini:

```tsx
  useEffect(() => {
    // Mengambil parameter URL
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    
    if (to) {
      // Decode karakter (seperti spasi %20) dan hilangkan tanda hubung jika ada
      // Contoh: ?to=Budi+Santoso atau ?to=Budi-Santoso
      const decodedName = decodeURIComponent(to).replace(/-/g, ' ');
      setGuestName(decodedName);
    }
  }, []);
```

### Langkah 3: Pengujian (*Testing*)
1. Jalankan server pengembangan (`bun run dev`).
2. Buka browser dan kunjungi `http://localhost:5173/`. Nama tamu seharusnya menampilkan tulisan default "Tamu Undangan".
3. Tambahkan parameter di URL, misalnya: `http://localhost:5173/?to=Budi+Santoso` atau `http://localhost:5173/?to=Budi%20Santoso`.
4. Pastikan teks di halaman pembuka langsung berubah menjadi nama "Budi Santoso" tanpa adanya _loading_ atau *error* di konsol (*Inspect Element*).

### Langkah 4: Cara Membagikan Undangan
Setelah fitur ini selesai dan di-deploy ke produksi, rekan kerja hanya perlu menambahkan `?to=Nama+Tamu` di akhir domain undangan saat membagikannya.
* Contoh: `https://surya-juni-wedding.vercel.app/?to=Bapak+Andi`
* Contoh: `https://surya-juni-wedding.vercel.app/?to=Keluarga+Besar+Budi`

### Langkah 5: Publikasikan (Deploy)
1. *Commit* perubahan dengan pesan: `fix: ubah logika nama tamu agar 100% statis berbasis URL parameter`
2. Lakukan push dan buat Pull Request agar Vercel otomatis me-deploy perubahan tersebut.
