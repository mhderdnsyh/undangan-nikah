# DOKUMEN ISSUE: Mengganti Favicon dengan Foto Prewedding

## Deskripsi Singkat
Favicon (ikon kecil yang muncul di tab *browser* sebelah judul halaman) saat ini masih menggunakan ikon bawaan dari *framework* Vite. Kita perlu menggantinya dengan foto *prewedding* dari mempelai agar undangan pernikahan terasa lebih personal, profesional, dan unik.

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI)

Tahapan ini harus diikuti langkah demi langkah agar perubahan favicon berhasil:

### Langkah 1: Siapkan Foto Prewedding
1. Pilih satu foto *prewedding* yang paling bagus (disarankan foto yang memperlihatkan wajah kedua mempelai dari dekat / *close-up*, karena ukuran *favicon* sangatlah kecil).
2. Potong (*crop*) foto tersebut menjadi bentuk persegi sempurna (rasio 1:1) agar tidak lonjong saat dijadikan ikon.
3. Anda bisa menggunakan file foto yang sudah ada (misalnya yang ada di dalam folder `client/public/gallery/`).

### Langkah 2: Buat File Favicon
Meskipun *browser* modern mendukung berbagai format, untuk foto sangat disarankan menggunakan format `.png` atau `.ico`.
1. Simpan foto persegi tadi dengan nama `favicon.png`.
2. Pastikan ukurannya tidak terlalu besar (disarankan maksimal 256x256 pixel agar proses *loading* website tetap cepat).
3. Pindahkan/simpan file `favicon.png` tersebut ke dalam folder `client/public/`.
4. (Opsional) Hapus file `vite.svg` bawaan yang lama agar folder `public` lebih bersih.

### Langkah 3: Perbarui Referensi di `index.html`
1. Buka file utama HTML yaitu `client/index.html`.
2. Cari baris kode di bagian dalam tag `<head>` yang mengatur *icon* lama, biasanya terlihat seperti ini:
   ```html
   <link rel="icon" type="image/svg+xml" href="/vite.svg" />
   ```
3. Ubah nilai `href` dan `type`-nya agar mengarah ke file gambar foto *prewedding* yang baru. Ubah menjadi seperti ini:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

### Langkah 4: Publikasikan (Deploy) Perubahan
1. Uji coba terlebih dahulu di komputer lokal dengan me-*refresh* tab browser. Pastikan *favicon* baru (foto mempelai) sudah muncul di tab atas browser.
2. Jika sudah benar, lakukan *commit* perubahan tersebut ke GitHub:
   ```bash
   git add client/public/favicon.png client/index.html
   git commit -m "style: ganti favicon dengan foto prewedding"
   git push origin main
   ```
3. Vercel akan secara otomatis melakukan *deploy* ulang (jika auto-deploy menyala), atau Anda bisa menjalankan perintah manual `npx vercel --prod` di dalam folder `client`.
