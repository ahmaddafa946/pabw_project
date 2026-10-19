# Worksheet P11 — Catatan Jawaban dan Pemeriksaan

**Nama:** Ahmad Dafa Ardevanda  
**NIM:** 25523179 · **Kelas:** D  
**Tanggal:** 19 Oktober 2026  
**Repository:** [pabw_project](https://github.com/ahmaddafa946/pabw_project)  
**Branch pekerjaan:** `feature/worksheet-p11`

> Catatan kejujuran pengujian: bagian struktur berkas dan jawaban teknis di bawah dicocokkan dengan kode P10/P11 di repository. Uji visual browser, uji Console, tangkapan layar, dan tanda tangan tetap harus dilakukan/diisi sendiri sebelum pengumpulan. Jangan menandai uji manual selesai sebelum benar-benar dijalankan.

## Lembar A — Berkas dan rencana modul

### A.1 Berkas yang dibawa dari P10

| Berkas | Ada? | Jumlah baris P10 |
|---|---:|---:|
| `profil.html` | Ada | 113 |
| Enam CSS: `base.css`, `komponen.css`, `layout.css`, `responsif.css`, `tema.css`, `tokens.css` | Ada | 373 total |
| `js/app.js` | Ada | 76 |
| `js/dom.js` | Ada | 254 |
| `js/api.js` | Ada | 16 |

Jumlah baris dihitung dari berkas pada branch `main` P10 sebelum pemecahan modul.

### A.2 Pemeriksaan nama berkas

| Berkas P10 | Bertabrakan? | Tindakan |
|---|---|---|
| `app.js` | Nama sama dengan berkas perakit P11, tetapi berkas lama memang dipakai kembali | Isi lama diubah menjadi perakit; tidak membuat salinan kedua |
| `dom.js` | Nama sama dengan modul tampilan P11, tetapi berkas lama memang dipakai kembali | Fungsi tampilan dipertahankan; pemasangan pendengar dipindah ke `events.js` |
| `api.js` | Tidak dengan tiga berkas baru (`data.js`, `state.js`, `events.js`) | Dipertahankan dari P10 tanpa perubahan |
| `data.js`, `state.js`, `events.js` | Belum ada pada awal P10 | Dibuat sebagai modul baru |

### A.3 Baris yang menyentuh halaman di P10

Baris “menyentuh halaman” dihitung bila memakai `querySelector`, `createElement`, `append`, `classList`, atau `textContent`. Satu baris dihitung satu kali walaupun cocok dengan lebih dari satu pola.

| Berkas | Jumlah baris | Baris yang menyentuh halaman |
|---|---:|---:|
| `js/app.js` | 76 | 0 |
| `js/dom.js` | 254 | 80 |

### A.4 Rencana modul dan implementasi

| Berkas | Tanggung jawab | Asal/pemindahan |
|---|---|---|
| `js/data.js` | Data profil dan data awal film; fungsi murni `buatPerkenalan`, `formatKeahlian`, `saring`, serta filter film | Data dan fungsi yang sebelumnya berada di `app.js`; daftar proyek tetap di JSON |
| `js/state.js` | Objek `state`, fungsi pengubah state, serta simpan/muat localStorage | Keadaan pilihan, favorit, dan perubahan data yang sebelumnya tersebar di modul P10 |
| `js/dom.js` | Selector elemen, pembuatan kartu, `render(state)`, kelas tombol, pesan muat/galat, dan helper DOM form | Fungsi DOM dari P10, disesuaikan agar render membaca state |
| `js/events.js` | Semua pemasangan pendengar klik/filter/favorit/reset dan submit/input form | Pendengar peristiwa yang sebelumnya berada di modul DOM |
| `js/app.js` | Perakit dan titik masuk: impor modul, pulihkan pilihan, pasang pendengar, ambil proyek, tangani loading/galat | Alur pemuatan dari P10 disederhanakan menjadi entry point |

## Lembar B — Pemecahan modul

Lima modul wajib ada di `worksheet-p11/js/`: `data.js`, `state.js`, `dom.js`, `events.js`, dan `app.js`. `api.js` adalah modul keenam yang tetap dipakai dari P10.

- Jalur impor menggunakan bentuk relatif seperti `./state.js`, dengan awalan `./` dan akhiran `.js`.
- `profil.html` memanggil satu entry point saja: `<script type="module" src="./js/app.js"></script>`.
- `app.js` mengatur pemulihan state, event listener, loading, pemanggilan `ambilProyek()`, serta `try/catch/finally`.
- Data proyek masuk ke state melalui `isiProyek()`, bukan dengan penulisan langsung dari `app.js`.

**Hasil inspeksi kode:** enam modul ditemukan pada branch P11 dan jalur impor relatif eksplisit. **Hasil Console/browser:** isi sendiri setelah membuka halaman dengan Live Server.

## Lembar C — State dan render

### C.1–C.4 Catatan implementasi

Sumber state utama berada pada objek `state` di `js/state.js), yang memuat daftar proyek, daftar film, kategori aktif proyek/film, daftar favorit, pesan form, dan status percobaan validasi. `render(state)` di `js/dom.js` mengosongkan wadah daftar kemudian menggambar kartu dan tombol filter dari state. Kelas tombol aktif disesuaikan dengan kategori di state, bukan dibaca untuk menentukan kategori.

Perubahan state dilakukan melalui fungsi di `state.js`, antara lain `isiProyek()`, `pilihKategori()`, `pilihKategoriFilm()`, `tambahFavorit()`, `tambahFilm()`, `aturPesanForm()`, `mulaiValidasi()`, dan `aturUlang()`. Fungsi-fungsi yang mengubah tampilan memanggil `render(state)`.

### C.5 Checklist uji

- [ ] Klik kategori yang sama dua kali; kartu tidak boleh berlipat.
- [ ] Klik kategori berbeda; hanya hasil filter yang sesuai ditampilkan.
- [ ] Klik favorit; tombol berubah dari ☆ menjadi ★ dan pilihan ada pada `state.favorit`.
- [ ] Periksa Console browser dan pastikan tidak ada galat impor.
- [ ] Bila sementara mengekspos state untuk inspeksi, hapus lagi baris debug sebelum penyerahan.

## Lembar D — localStorage

### D.2 Nilai bawaan

| Keadaan | Nilai bawaan | Alasan |
|---|---|---|
| Kategori proyek aktif | `"semua"` | Menampilkan semua proyek pada kunjungan pertama |
| Daftar favorit | `[]` | Belum ada proyek yang ditandai favorit |

### D.4 Apa yang disimpan

| Keadaan/data | Disimpan? | Alasan |
|---|---|---|
| Kategori proyek aktif | Ya | Pilihan filter pengguna perlu dipulihkan |
| Daftar ID favorit | Ya | Penanda favorit perlu bertahan setelah tab ditutup |
| Data proyek dari server | Tidak | Data diambil kembali melalui `api.js` saat halaman dibuka |
| Token, kata sandi, atau data pribadi | Tidak | localStorage tidak terenkripsi dan dapat dibaca pengguna browser yang sama |
| Nilai sementara form tambah film | Tidak | Data input bersifat sementara; tidak perlu bertahan setelah tab ditutup |

Penyimpanan menggunakan kunci `pabw-p11`, JSON, dan nomor versi skema 2. Tombol “Atur ulang pilihan” menghapus kunci simpanan dan mengembalikan kategori proyek/film ke `"semua"` serta favorit ke `[]`.

## Lembar E — Pemulihan simpanan rusak

Implementasi `muat()` memeriksa hasil `getItem`, memanggil `JSON.parse` di dalam `try/catch`, memvalidasi versi dan bentuk data, lalu menghapus isi simpanan yang rusak/tidak sesuai. Jika pemulihan gagal, halaman tetap menggunakan nilai state bawaan.

### E.3 Hasil pengujian manual — isi sesudah benar-benar menjalankan

| Langkah Console | Hasil yang diharapkan | Hasil aktual |
|---|---|---|
| `localStorage.setItem("pabw-p11", "bukan-json")`, lalu muat ulang | Halaman tetap terbuka, simpanan dibuang, state kembali ke bawaan | **Belum diuji pada browser — isi setelah uji** |
| `localStorage.setItem("pabw-p11", "{}")`, lalu muat ulang | Versi tidak cocok, simpanan dibuang, state kembali ke bawaan | **Belum diuji pada browser — isi setelah uji** |
| `localStorage.getItem("pabw-p11")` setelah pemulihan | Menghasilkan `null` | **Belum diuji pada browser — isi setelah uji** |

### E.4 Catatan data yang sengaja tidak disimpan

Token, kata sandi, data pribadi, data proyek dari server, dan nilai input form tidak disimpan. Yang disimpan hanya preferensi tampilan: kategori proyek yang dipilih dan daftar ID favorit.

**Bukti yang masih harus dilampirkan:** tangkapan layar Console saat simpanan rusak dimasukkan, dan tangkapan layar sesudah halaman pulih.

## Lembar F — Tiket keluar dan refleksi

### Jawaban tiket keluar

1. **Sebutkan satu berkas, tanggung jawabnya, dan dua berkas yang mengimpornya.**  
   `state.js` menampung state serta fungsi pengubah dan simpan/muat. Berkas ini diimpor oleh `app.js` dan `events.js`.

2. **Mengapa jalur impor harus diawali `./` dan diakhiri `.js`?**  
   `./` menandakan modul relatif terhadap berkas saat ini, sedangkan `.js` menyebutkan ekstensi modul secara eksplisit. Jika salah, browser dapat menampilkan galat resolusi modul atau gagal memuat berkas.

3. **Sebelumnya kategori aktif disimpan di mana, dan mengapa itu bermasalah saat render ulang?**  
   Keadaan aktif tersirat dari kelas `aktif` pada tombol DOM. Setelah elemen digambar ulang, kelas lama ikut hilang sehingga tampilan dapat lupa pilihan sebelumnya atau tidak cocok dengan pilihan pengguna.

4. **Apa yang dilakukan ketika `getItem` menghasilkan `null`?**  
   Gunakan nilai bawaan state (`kategoriAktif: "semua"` dan `favorit: []`) dan jangan menganggap sudah ada simpanan untuk dipulihkan.

5. **Bagaimana agar simpanan rusak tidak menutup halaman?**  
   Bungkus parsing dan pembacaan dengan `try/catch`; jika gagal atau versi/bentuk tidak valid, hapus kunci simpanan dan kembalikan `null` agar nilai bawaan tetap digunakan.

6. **Sebutkan satu data yang boleh disimpan dan satu yang tidak boleh.**  
   Kategori filter proyek boleh disimpan sebagai preferensi tampilan. Token atau kata sandi tidak boleh disimpan karena localStorage tidak terenkripsi.

### F.2 Pekerjaan rumah Node.js

Versi yang terakhir tercatat pada lingkungan pengembangan sebelumnya adalah:

| Perintah | Versi terakhir tercatat | Tindakan sebelum dikumpulkan |
|---|---|---|
| `node -v` | `v24.21.0` | Jalankan ulang di PowerShell laptop dan pastikan hasilnya sama |
| `npm -v` | `11.19.0` | Jalankan ulang di PowerShell laptop dan pastikan hasilnya sama |

Angka di atas bukan bukti hasil eksekusi pada sesi ini. Simpan hasil terminal sendiri, terutama bila versi di laptop sudah berubah.

### F.3 Satu baris untuk diingat — draf

“State adalah sumber kebenaran; DOM hanya hasil render, jadi perubahan pilihan harus lewat fungsi pengubah lalu digambar ulang.”

Silakan ubah kalimat ini agar sesuai dengan pelajaran yang paling kamu rasakan sendiri.

### F.4 Penilaian mandiri dan bukti kode

Nilai mandiri sebaiknya diisi setelah semua uji manual selesai. Bukti kode yang bisa diperiksa:

| Aspek | Bukti yang dapat dibuka | Nilai pribadi |
|---|---|---|
| Pemecahan modul dan impor | `js/data.js`, `js/state.js`, `js/dom.js`, `js/events.js`, `js/app.js`, `js/api.js` | Isi sendiri |
| Pemisahan state dari tampilan | `js/state.js` dan `js/dom.js` | Isi sendiri |
| localStorage | Fungsi `simpan()`, `muat()`, `pulihkan()`, `aturUlang()` di `js/state.js` | Isi sendiri |
| Simpanan rusak | Validasi versi dan blok `try/catch` pada `muat()` | Isi sendiri |
| Kebersihan kode, deklarasi AI, dan bukti | Bagian P11 di README utama, commit dan screenshot hasil uji | Isi sendiri |

### F.5 Catatan untuk pengampu — draf yang dapat disesuaikan

- **Bagian tersulit:** menjaga agar perubahan kategori dan favorit selalu memperbarui state lalu memanggil render, tanpa menggandakan kartu.
- **Yang ingin dibahas berikutnya:** cara menguji skema localStorage dan menjaga state tetap konsisten setelah data proyek selesai dimuat.
- **Berkas tambahan dari P10:** `profil.html`, enam CSS, `js/app.js`, `js/dom.js`, `js/api.js`, gambar, dan `data/proyek.json`.
- **Tanda tangan/tanggal/jam selesai:** isi sendiri.

## Checklist terakhir sebelum mengumpulkan

- [ ] Buka `worksheet-p11/profil.html` melalui Live Server.
- [ ] Uji filter proyek, favorit, reset, film, tema, dan form tambah film.
- [ ] Jalankan dua kasus simpanan rusak di atas dan simpan tangkapan layar.
- [ ] Pastikan Console bersih dan tidak ada galat impor.
- [ ] Jalankan `node -v` dan `npm -v` pada PowerShell laptop.
- [ ] Perbarui hasil pengujian aktual, refleksi pribadi, penilaian mandiri, dan tanda tangan sebelum pengumpulan.
