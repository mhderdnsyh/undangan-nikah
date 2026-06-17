# DOKUMEN ISSUE: Rencana Hosting Undangan Pernikahan (Gratis)

## Deskripsi Singkat
Undangan pernikahan ini perlu di-hosting agar dapat diakses secara online oleh tamu undangan. Karena keterbatasan biaya, kita akan menggunakan opsi layanan *hosting* yang 100% gratis namun tetap andal.

## Pertanyaan Terkait Hosting

**1. Apa saja opsi tempat hosting yang mendukung dan gratis? Apakah Vercel termasuk?**
Ya, **Vercel** adalah opsi yang **sangat disarankan** dan 100% gratis untuk proyek *frontend*. Selain Vercel, opsi gratis lainnya yang mendukung adalah:
- **Netlify** (Sangat mirip dengan Vercel, mudah digunakan)
- **Cloudflare Pages** (Sangat cepat, unlimited bandwidth, dan gratis)
- **GitHub Pages** (Gratis, tapi konfigurasinya sedikit lebih rumit untuk Vite/React)

Mengingat proyek kita dibangun menggunakan **Vite + React**, maka **Vercel** adalah pilihan paling praktis karena proses konfigurasinya berjalan hampir otomatis (*zero-config*).

**2. Apa saja yang perlu disiapkan?**
- **Akun GitHub**: Pastikan kode undangan (branch `main`) sudah ter-push ke GitHub.
- **Akun Vercel**: Daftar akun di [vercel.com](https://vercel.com/) menggunakan akun GitHub Anda untuk mempermudah integrasi.
- **Pemisahan Frontend & Backend**: Aplikasi kita harus bisa berjalan secara mandiri (*standalone*) hanya dengan sisi Frontend. Karena fitur RSVP dan konfirmasi kehadiran (Gift) sudah dialihkan mekanismenya langsung menuju WhatsApp (tidak lagi ke *database* via *backend* API), maka aplikasi ini kini berstatus **100% Static Site** dan sangat sempurna untuk di-deploy di Vercel secara gratis. Tidak perlu mencari hosting untuk backend (Elysia/Bun) lagi!

---

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI)

Tahapan ini harus diikuti langkah demi langkah untuk melakukan *deployment* (hosting) ke Vercel:

### Langkah 1: Persiapan Repositori
1. Pastikan semua perubahan kode lokal (terutama yang berada di dalam folder `client`) sudah di-commit dan di-push ke branch `main` di GitHub.
2. Pastikan proyek Frontend dapat berjalan normal tanpa *error*.

### Langkah 2: Menghubungkan GitHub ke Vercel
1. Buka *browser* dan login ke [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pada bagian *Import Git Repository*, cari repositori `undangan-nikah` milik Anda, lalu klik tombol **"Import"**.

### Langkah 3: Konfigurasi Deployment di Vercel (PENTING!)
Pada halaman konfigurasi proyek di Vercel, pastikan Anda menyesuaikan pengaturan berikut sebelum melakukan deploy:
1. **Project Name**: Biarkan bawaan atau ubah sesuai selera (contoh: `undangan-surya-juni`).
2. **Framework Preset**: Vercel biasanya akan mendeteksinya secara otomatis. Pastikan yang terpilih adalah **Vite**.
3. **Root Directory (Sangat Krusial)**: 
   - Secara bawaan, Vercel akan mencoba membangun proyek dari folder paling luar (*root*).
   - Karena kode React kita berada di dalam folder `client`, klik tombol **Edit** pada bagian "Root Directory", lalu pilih sub-folder `client`. Jika ini terlewat, proses *build* akan gagal.
4. **Build and Output Settings**: 
   - Karena *Framework Preset* sudah diset ke Vite, Vercel akan otomatis mengisi *Build Command* dengan `npm run build` dan *Output Directory* dengan `dist`. Biarkan saja pengaturan ini (*default*).

### Langkah 4: Proses Deploy
1. Klik tombol **"Deploy"**.
2. Tunggu proses instalasi dependensi dan *Building* selesai (biasanya memakan waktu 1-2 menit saja).
3. Jika berhasil, Vercel akan menampilkan layar perayaan beserta tautan *domain* gratis yang sudah langsung bisa diakses publik (contoh url: `undangan-nikah.vercel.app`).

### Langkah 5: Pengecekan Akhir (QA / Testing)
- [ ] Buka tautan publik yang diberikan oleh Vercel di komputer dan di HP.
- [ ] Pastikan halaman undangan termuat dengan sempurna (cek semua gambar galeri, pastikan tidak ada gambar yang hilang / *broken link*).
- [ ] Lakukan tes fitur RSVP: Isi form dan klik tombol kirim, pastikan berhasil diarahkan langsung ke WhatsApp.
- [ ] Lakukan tes fitur Gift: Pastikan tombol konfirmasi transfer/kado juga berhasil diarahkan ke WhatsApp yang benar.
- [ ] Lakukan pengecekan audio/musik: Pastikan *background music* berputar dengan normal saat tombol buka undangan diklik.
