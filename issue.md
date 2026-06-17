# Fitur Footer dan Credit Link Profesional

## Deskripsi Singkat
Fitur ini bertujuan untuk menyempurnakan bagian paling bawah (footer) dari halaman undangan pernikahan. Footer yang saat ini mungkin masih bersifat *hardcoded* dan sederhana di dalam file utama, akan dipisahkan menjadi komponen tersendiri. Footer ini harus berisi ucapan terima kasih penutup dan sebuah *credit link* (tautan kredit) yang terlihat elegan dan profesional (contoh: "Exclusive Wedding Invitation by [Nama/Brand]").

## Target Pengguna (Implementator)
Panduan ini disusun secara rinci dan terstruktur agar mudah dieksekusi oleh Junior Programmer atau AI pendamping.

---

## Tahapan Implementasi

### 1. Membuat Komponen React Baru (`Footer.tsx`)
* Buat file baru di dalam direktori `client/src/components/Footer.tsx`.
* Buat file *stylesheet* pendamping di `client/src/components/Footer.module.css`.

**Instruksi Kode untuk `Footer.tsx`:**
1. Lakukan import *style*: `import styles from './Footer.module.css';`
2. Deklarasikan komponen fungsional `Footer`.
3. Kembalikan (return) elemen `<footer>` yang diberi *className* dari module CSS (misalnya `styles.footer`).
4. Di dalam footer, tambahkan elemen teks (misal `<p>`) yang berisi: "Terima kasih atas doa restu Anda."
5. Di bawahnya, tambahkan elemen `<p>` lain yang berisi *credit link*. Gunakan tag `<a>` untuk bagian tautan.
   Contoh struktur:
   ```tsx
   <p className={styles.credit}>
     Exclusive Wedding Invitation by <a href="https://github.com/mhderdnsyh" target="_blank" rel="noopener noreferrer" className={styles.link}>Nama Anda / Vendor</a>
   </p>
   ```

### 2. Menyusun Styling (`Footer.module.css`)
* Buat *styling* untuk *container* utama (`.footer`):
  - Berikan ruang bernapas yang cukup: `padding: 60px 20px 40px;`
  - Posisi teks berada di tengah: `text-align: center;`
  - Warna teks menggunakan warna pudar yang selaras: `color: var(--text-muted);`
  - Ukuran huruf yang lebih kecil agar tidak mendominasi: `font-size: 0.9rem;`
* Buat *styling* untuk teks kredit (`.credit`):
  - Berikan sedikit jarak dari teks di atasnya: `margin-top: 15px;`
  - Tambahkan efek transparansi (opsional): `opacity: 0.8;`
* Buat *styling* untuk tautan/link (`.link`):
  - Hilangkan garis bawah bawaan: `text-decoration: none;`
  - Berikan warna *bold* atau senada dengan teks (hindari warna biru bawaan *browser*): `color: inherit;` atau `color: var(--accent-color);`
  - Berikan transisi halus: `transition: color 0.3s ease;`
  - Buat efek saat *kursor* mengarah ke link (*hover*): ubah warna menjadi warna utama aplikasi (`var(--accent-hover)`) atau kembalikan opacity menjadi 1.

### 3. Mengintegrasikan Komponen ke Halaman Utama (`App.tsx`)
1. Buka file utama di `client/src/App.tsx`.
2. Lakukan import komponen yang baru dibuat:
   `import Footer from './components/Footer';`
3. Cari elemen `<footer>...</footer>` bawaan (HTML biasa) yang berada di bagian paling bawah di dalam `<main className="container">`.
4. Hapus elemen `<footer>` bawaan tersebut.
5. Gantikan posisinya dengan memanggil komponen baru: `<Footer />`.

---

## Kriteria Penerimaan (Acceptance Criteria / QA Checklist)
- [ ] Komponen `Footer` berhasil dipisahkan ke filenya sendiri dan membuat kode `App.tsx` menjadi lebih bersih.
- [ ] Terdapat ucapan terima kasih di bagian paling bawah halaman.
- [ ] Terdapat *credit link* yang bertuliskan "Exclusive Wedding Invitation by ..." yang terlihat rapi dan tidak kebesaran.
- [ ] *Credit link* dapat diklik dan berhasil mengarahkan pengguna ke tab baru (portofolio/kontak/GitHub pembuat).
- [ ] Efek *hover* pada tautan berjalan mulus, mengubah warna tautan untuk memberi *feedback* visual yang profesional.
- [ ] Secara keseluruhan tampilan footer tetap elegan dan selaras dengan nuansa undangan.
