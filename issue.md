# Fitur Wedding Gift (Kado Pernikahan / Amplop Digital)

## Deskripsi Singkat
Fitur ini bertujuan untuk menyediakan informasi nomor rekening bank atau e-wallet (seperti DANA, OVO, atau GoPay) agar tamu undangan dapat memberikan kado pernikahan berupa transfer dana secara digital. Fitur ini akan ditampilkan sebagai salah satu *section* (bagian) mandiri di halaman utama undangan pernikahan.

## Target Pengguna (Implementator)
Panduan ini disusun secara langkah-demi-langkah agar mudah diimplementasikan oleh Junior Programmer atau AI pendamping.

---

## Tahapan Implementasi

### 1. Persiapan Aset (Opsional namun disarankan)
* Siapkan ikon atau logo bank (BCA, Mandiri, BNI, dll.) dan DANA berformat `.png` atau `.svg`.
* Letakkan logo-logo tersebut ke dalam folder `client/public/` atau `client/src/assets/`.

### 2. Membuat Komponen React Baru (`Gift.tsx`)
* Buat file baru di direktori `client/src/components/Gift.tsx`.
* Buat file stylesheet pendamping di `client/src/components/Gift.module.css`.

**Instruksi Kode untuk `Gift.tsx`:**
1. Lakukan import library animasi: `import { motion, Variants } from 'framer-motion';`
2. Lakukan import style: `import styles from './Gift.module.css';`
3. Lakukan import ikon copy dari library Lucide-react: `import { Copy, Check, Gift as GiftIcon } from 'lucide-react';`
4. Buat komponen fungsional `Gift`.
5. Di dalam komponen, deklarasikan *state* lokal `const [copiedId, setCopiedId] = useState<string | null>(null);` untuk melacak status rekening mana yang sedang disalin.
6. Buat fungsi `handleCopy` yang menerima argumen `text` dan `id`, lalu menggunakan `navigator.clipboard.writeText(text)`. Set nilai `copiedId` menjadi `id` selama 2 detik lalu kembalikan ke `null`.
7. Susun tampilan antarmuka (UI) menggunakan tag `motion.section` framer-motion (bisa meniru setup di komponen `Acara.tsx` atau `Mempelai.tsx`).
8. Di dalam *section*, buat susunan tata letak berupa *card* atau *box* rekening yang setidaknya berisi:
   * Nama Bank / E-Wallet (misal: "BCA" atau "DANA")
   * Atas Nama Penerima (misal: "Surya" atau "Juni")
   * Nomor Rekening / Nomor HP
   * Tombol interaktif "Salin Nomor" yang ketika diklik akan memanggil `handleCopy`.

### 3. Menyusun Styling (`Gift.module.css`)
* Tambahkan kelas-kelas styling untuk merapikan desain kartu (card) rekening.
* Pastikan gaya visual tetap konsisten dengan palet warna (*glassmorphism*, *shadow*, dan kelengkungan `border-radius`) yang ada di file komponen lain (misalnya `Acara.module.css`).
* Sediakan efek *hover* yang halus pada tombol salin.

### 4. Mengintegrasikan Komponen ke Halaman Utama (`App.tsx`)
1. Buka file utama di `client/src/App.tsx`.
2. Lakukan import komponen yang baru dibuat:
   `import Gift from './components/Gift';`
3. Sisipkan komponen `<Gift />` di dalam `<main className="container">`, tempatkan di antara komponen `<Acara />` dan `<Rsvp />` agar tamu dapat melihat opsi *gift* sebelum mengisi form konfirmasi kehadiran.

### 5. Mengupdate Halaman Statis / Versi HTML Lanjut (`public/index.html`) *(Jika Diperlukan)*
Bila HTML mentah di folder `public/` perlu tetap setara fiturnya dengan versi React:
1. Buka `public/index.html`.
2. Tambahkan `<section class="section gift-section" id="gift">` di antara *section event* dan *rsvp*.
3. Susun struktur `div` berisikan tampilan antarmuka kotak rekening bank beserta tombol "Salin".
4. Buka `public/js/app.js` dan buat *event listener* pada tombol-tombol salin (mengeksekusi logika `navigator.clipboard.writeText`) beserta *feedback visual* "Tersalin".

---

## Kriteria Penerimaan (Acceptance Criteria / QA Checklist)
- [ ] *Section Wedding Gift* dapat muncul mulus dengan efek animasi ketika halaman undangan digulir ke bawah.
- [ ] Tersedia setidaknya 2 rekening / e-wallet yang ditampilkan (misalnya: 1 Rekening Bank, 1 Akun DANA).
- [ ] Terdapat tombol "Salin" pada masing-masing nomor tujuan.
- [ ] Ketika tombol disalin ditekan, teks nomor rekening harus berhasil masuk ke *clipboard* sistem. Teks atau ikon tombol harus berubah sementara (contoh: jadi "Tersalin!" atau memunculkan centang hijau).
- [ ] Tampilan antarmuka *responsive*: tetap rapi jika dilihat melalui browser HP (mobile) maupun desktop komputer.
- [ ] Animasi muncul *(fade in / slide up)* harus seirama *(consistent)* dengan desain komponen lain yang ada pada proyek ini.
