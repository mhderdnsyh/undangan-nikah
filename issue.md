# Fitur Galeri Foto Prewedding

## Deskripsi Singkat
Fitur ini bertujuan untuk menambahkan sebuah *section* (bagian) baru di halaman undangan yang berfungsi sebagai galeri foto prewedding. Galeri ini akan menampilkan sekumpulan foto mempelai dengan tata letak (*layout*) grid atau masonry yang estetik, responsif di semua perangkat, serta dilengkapi dengan animasi muncul yang halus saat pengguna menggulir (*scroll*) halaman.

## Target Pengguna (Implementator)
Panduan ini disusun secara rinci dan terstruktur agar mudah dieksekusi oleh Junior Programmer atau AI pendamping.

---

## Tahapan Implementasi

### 1. Persiapan Aset (File Foto)
* Kumpulkan foto-foto prewedding yang akan ditampilkan (disarankan 6 hingga 9 foto yang sudah dioptimasi ukurannya agar *loading* website tetap cepat).
* Buat direktori baru bernama `gallery` di dalam folder `client/public/` (menjadi `client/public/gallery/`).
* Simpan semua foto tersebut di dalam folder `gallery` (misalnya: `foto1.jpg`, `foto2.jpg`, dst.).

### 2. Membuat Komponen React Baru (`Gallery.tsx`)
* Buat file baru di direktori `client/src/components/Gallery.tsx`.
* Buat file stylesheet pendamping di `client/src/components/Gallery.module.css`.

**Instruksi Kode untuk `Gallery.tsx`:**
1. Lakukan import library animasi: `import { motion, Variants } from 'framer-motion';`
2. Lakukan import style: `import styles from './Gallery.module.css';`
3. Lakukan import ikon yang relevan dari Lucide-react (misalnya ikon kamera atau gambar): `import { Camera } from 'lucide-react';`
4. Deklarasikan *array of strings* yang berisi *path* ke gambar-gambar di folder public (contoh: `const photos = ['/gallery/foto1.jpg', '/gallery/foto2.jpg', ...];`).
5. Opsional (Nilai Tambah): Buat *state* lokal untuk fitur *Lightbox* (tampilan layar penuh saat foto diklik). `const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);`.
6. Susun UI menggunakan `motion.section` dengan `id="gallery"`. Atur *variants* animasi agar foto muncul secara berurutan (*staggerChildren*).
7. Lakukan iterasi (map) pada *array* `photos` untuk me-render elemen `img` yang dibungkus oleh `motion.div`.

### 3. Menyusun Styling (`Gallery.module.css`)
* Buat styling untuk *container* utama menggunakan `display: grid` atau `columns` (untuk gaya masonry). Atur `gap` agar ada jarak antarfoto.
* Atur *responsive design* menggunakan `@media query`:
  - Desktop: 3 atau 4 kolom (`grid-template-columns: repeat(3, 1fr)`).
  - Tablet: 2 kolom.
  - Mobile: 1 atau 2 kolom.
* Berikan gaya pada elemen foto: `width: 100%`, `height: auto`, `object-fit: cover`, dan `border-radius` agar sudutnya melengkung selaras dengan gaya *glassmorphism* pada komponen lain.
* Tambahkan transisi halus (`transition: transform 0.3s ease`) dan efek *hover* (`transform: scale(1.05)`) agar interaktif saat di-hover pengguna PC.
* *(Jika mengimplementasikan Lightbox)*: Buat CSS untuk `modal` atau `overlay` layar penuh berlatar hitam transparan dengan posisi `fixed`, *z-index* tinggi, serta gambar dan tombol "Tutup" di tengahnya.

### 4. Mengintegrasikan Komponen ke Halaman Utama (`App.tsx`)
1. Buka file utama di `client/src/App.tsx`.
2. Lakukan import komponen yang baru dibuat:
   `import Gallery from './components/Gallery';`
3. Sisipkan komponen `<Gallery />` di dalam `<main className="container">`. Tempatkan pada urutan yang logis, misalnya tepat di bawah `<Mempelai />` dan di atas `<Acara />`.

---

## Kriteria Penerimaan (Acceptance Criteria / QA Checklist)
- [ ] *Section* Galeri muncul dengan mulus (animasi *fade-in/slide-up*) ketika halaman digulir ke bawah.
- [ ] Tata letak foto tidak tumpang tindih dan terlihat rapi membentuk formasi *grid* atau *masonry*.
- [ ] Terdapat efek perbesaran (*zoom-in*) kecil ketika gambar dikenai kursor (*hover*) di perangkat *desktop*.
- [ ] Tampilan antarmuka *responsive*: jumlah kolom menyesuaikan ukuran layar secara otomatis (tidak terpotong di HP).
- [ ] Opsional: Mengklik foto akan menampilkannya dalam mode perbesaran layar penuh (*Lightbox*).
- [ ] Gambar berhasil dimuat tanpa kendala / *broken link*.
