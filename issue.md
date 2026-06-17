# DOKUMEN ISSUE: PERSIAPAN HOSTING & FITUR LIVE STREAMING

Dokumen ini memuat dua buah rencana implementasi (issue) yang terpisah, yaitu Panduan Hosting Gratis dan Pembuatan Fitur Live Streaming.

---

# ISSUE 1: Rencana Hosting Undangan Pernikahan (Gratis)

## Deskripsi Singkat
Mendokumentasikan rencana dan tahapan untuk meng-hosting aplikasi undangan pernikahan secara online menggunakan layanan gratis. Karena aplikasi menggunakan **Vite (React)** di frontend, **Vercel** adalah opsi terbaik, tercepat, dan 100% gratis. 

## Opsi Tempat Hosting

### Opsi 1: Frontend Saja di Vercel (Sangat Direkomendasikan & Mudah)
Aplikasi ini bisa berjalan hampir sempurna hanya dengan *Frontend*.
- **Kelebihan**: 100% Gratis, sangat cepat, deploy otomatis dari GitHub.
- **Kekurangan**: Fitur unggah bukti transfer (`Gift.tsx`) membutuhkan backend (tapi bisa diatasi dengan mengubah konfirmasi kado menjadi via WhatsApp, sama seperti RSVP).
- **Platform**: [Vercel](https://vercel.com).

### Opsi 2: Fullstack (Frontend + Backend)
Jika backend (Elysia) tetap ingin dipertahankan.
- **Frontend**: Vercel (Gratis).
- **Backend (Bun + API)**: [Render.com](https://render.com) atau [Railway.app](https://railway.app).

## Tahapan Implementasi (Panduan Vercel untuk Junior Programmer / AI)

1. **Konfigurasi Vercel & GitHub**
   - Buat akun di [Vercel](https://vercel.com/) menggunakan GitHub.
   - Klik **"Add New Project"** dan *Import* repositori `undangan-nikah`.
2. **Pengaturan Build (PENTING)**
   - **Framework Preset**: Pilih `Vite`.
   - **Root Directory**: Klik edit dan ubah menjadi `client` (KARENA kode frontend kita ada di folder client).
   - **Build Settings**: Biarkan *default*.
3. **Deployment**
   - Klik **"Deploy"**. Vercel akan memproses otomatis.
4. **Penyesuaian Komponen (Tugas Lanjutan)**
   - Ubah komponen `Gift.tsx` agar konfirmasi transfer diarahkan ke URL WhatsApp (`wa.me`) alih-alih melakukan `fetch` ke backend. Hal ini memungkinkan undangan menjadi 100% statis.

---

# ISSUE 2: Penambahan Fitur Live Streaming Akad Nikah

## Deskripsi Singkat
Menambahkan *section* baru untuk menampilkan siaran langsung (Live Streaming) acara akad nikah. Fitur ini memungkinkan tamu yang berhalangan hadir secara fisik untuk tetap mengikuti prosesi sakral secara online melalui sematan (embed) video YouTube atau Instagram.

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI)

### 1. Membuat Komponen React (`LiveStreaming.tsx`)
* Buat file baru di `client/src/components/LiveStreaming.tsx`.
* Impor *Lucide icon* yang relevan, misalnya ikon `Youtube` atau `Video`.
* Buat kerangka elemen dengan judul (misal: "Siaran Langsung Akad Nikah").
* Tambahkan elemen iframe HTML standar untuk menyematkan (embed) video YouTube Live.
  *Contoh iframe:*
  ```html
  <iframe 
    src="https://www.youtube.com/embed/ID_VIDEO_YOUTUBE" 
    title="Live Streaming Akad Nikah" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
  ```

### 2. Membuat Styling (`LiveStreaming.module.css`)
* Buat file stylesheet pendamping di `client/src/components/LiveStreaming.module.css`.
* Berikan *padding* dan *margin* agar selaras dengan komponen lain.
* **PENTING (Responsive Iframe)**: Buat wadah (*wrapper*) untuk iframe agar rasio videonya tetap 16:9 di semua layar (HP maupun laptop). 
  *Panduan CSS:*
  ```css
  .videoWrapper {
    position: relative;
    padding-bottom: 56.25%; /* Aspect ratio 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 12px; /* Sesuai tema elegan */
  }
  .videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  ```

### 3. Mengintegrasikan ke Halaman Utama (`App.tsx`)
* Buka `client/src/App.tsx`.
* Lakukan `import LiveStreaming from './components/LiveStreaming';`.
* Sisipkan komponen `<LiveStreaming />` ke dalam layout utama. Posisi terbaik biasanya diletakkan tepat di bawah komponen `<Acara />` atau tepat sebelum komponen `<Gift />`.

## Kriteria Penerimaan (Acceptance Criteria / QA Checklist)
- [ ] Tersedia section khusus "Live Streaming" dengan desain yang menyatu dengan tema (font, warna).
- [ ] Video YouTube dapat diputar langsung di dalam halaman undangan (tidak berpindah tab).
- [ ] Tampilan video responsif dan tidak terpotong saat diakses dari HP berlayar kecil.
