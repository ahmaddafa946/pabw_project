# PABW — Pertemuan 9

## DOM, Event, dan Interaktivitas

Folder ini dibuat dari hasil Pertemuan 8 sebagai dasar latihan DOM pada Pertemuan 9.

### Bagian A — Memilih elemen DOM

Elemen yang disiapkan untuk diakses menggunakan `document.querySelector()`:

| Bagian halaman | Pemilih | Diisi apa | Nama variabel |
| --- | --- | --- | --- |
| Daftar proyek | `#daftar-proyek` | Kartu proyek dari array JavaScript | `wadah` |
| Baris tombol filter | `#filter` | Tombol filter kategori proyek | `barisFilter` |
| Pesan daftar kosong | `#pesan-kosong` | Pesan ketika tidak ada proyek yang cocok | `kosong` |
| Form film | `#form-film` | Form untuk menambahkan film | `form` |
| Kolom judul | `#judul-kolom` | Judul film | `judulInput` |
| Kolom tahun | `#tahun-kolom` | Tahun rilis film | `tahunInput` |
| Kolom rating | `#rating-kolom` | Rating film | `ratingInput` |

### Struktur folder

```text
worksheet-p9/
├── profil.html
├── README.md
├── css/
├── img/
└── js/
    ├── app.js
    └── dom.js
```

### Tata letak yang diteruskan dari P8

CSS Grid pada `css/layout.css` memakai named areas untuk menjaga susunan konten setelah interaksi DOM ditambahkan.

- Pada layar kecil, profil, proyek, daftar film, dan form ditumpuk satu kolom.
- Pada layar desktop, susunan dua kolom meneruskan pola P6: profil dan proyek berada di baris pertama, lalu form di sidebar kiri dan daftar film di kolom utama kanan.
- Galeri mengikuti breakpoint pada `css/responsif.css` dan menggunakan kolom `minmax(0, 1fr)` agar isi tidak meluber.
- Selector dan ID untuk DOM tetap dipertahankan; perubahan layout hanya mengatur posisi bagian halaman.

### Pemeriksaan di DevTools

Buka halaman melalui Live Server, lalu jalankan di Console:

```js
document.querySelector("#daftar-proyek");
document.querySelector("#filter");
document.querySelector("#pesan-kosong");
document.querySelector("#form-film");
document.querySelector("#judul-kolom");
document.querySelector("#tahun-kolom");
document.querySelector("#rating-kolom");
```

Setiap perintah seharusnya mengembalikan elemen HTML, bukan `null`.

### Menjalankan halaman

Jalankan `profil.html` menggunakan Live Server atau server lokal karena JavaScript dimuat sebagai module.

### Bagian B — Render dari data

Daftar proyek dibentuk dari `daftarProyek` di `js/app.js`. Fungsi `buatKartu()` membuat setiap kartu menggunakan `createElement()` dan `textContent`, lalu `render()` mengosongkan wadah sebelum memasukkan kartu baru. `DocumentFragment` dipakai untuk merangkai kartu sebelum ditambahkan ke halaman.

### Bagian C — Filter dan event delegation

Tombol filter menggunakan atribut `data-kategori`. Satu pendengar klik ditempatkan pada `#filter`, lalu tombol aktual ditemukan melalui `event.target.closest("button[data-kategori]")`. Tombol aktif ditandai menggunakan kelas `aktif` dan atribut `aria-pressed`. Ketika kategori tidak memiliki proyek, pesan `#pesan-kosong` ditampilkan.

### Bagian D — Validasi form

Form memakai `preventDefault()` agar halaman tidak dimuat ulang. Judul, tahun, dan rating divalidasi masing-masing berdasarkan isi serta batas atribut HTML. Pesan galat muncul di kolom terkait, input ditandai dengan `aria-invalid`, dan tombol kirim menunggu sampai seluruh kolom valid setelah pengiriman pertama. Saat data valid, film baru ditampilkan di daftar menggunakan elemen DOM dan `textContent`.

### Bagian E — Pemeriksaan kasus sulit

Uji di Chrome DevTools setelah menjalankan halaman lewat Live Server:

1. Jalankan selector pada lembar A di Console dan pastikan setiap hasil bukan `null`.
2. Klik filter Semua, Selesai, dan Dalam Proses. Jumlah kartu tidak boleh bertambah berlipat. Karena seluruh data proyek saat ini berstatus selesai, filter Dalam Proses menampilkan pesan kosong.
3. Kirim form kosong. Halaman tidak dimuat ulang dan pesan galat tampil. Isi nilai yang benar sampai tombol aktif, lalu kirim lagi.
4. Periksa panel Event Listeners pada `#filter`; handler klik untuk filter dipasang sekali pada induk.
5. Ambil tangkapan layar keadaan daftar proyek, panel Event Listeners, dan hasil filter. Tangkapan layar perlu disimpan setelah pengujian manual di peramban.

### Bahan tiket keluar

1. `#daftar-proyek` dipilih melalui `document.querySelector()` dan disimpan pada variabel `wadah`.
2. `querySelector()` mengembalikan satu elemen pertama yang cocok atau `null`; `querySelectorAll()` mengembalikan `NodeList`. `NodeList` bukan array biasa, sehingga perlu diubah dengan `Array.from()` sebelum memakai `map()` atau `filter()`.
3. Satu pendengar pada `#filter` menangani tombol melalui `event.target.closest()`, termasuk tombol yang sudah ada sejak halaman dimuat.
4. Jika baris pengosongan di `render()` dihapus, kartu hasil render sebelumnya tetap ada dan kartu baru ditambahkan di bawahnya sehingga daftar berlipat.
5. `innerHTML` memproses isi sebagai markup HTML. Kode ini menggunakan `textContent` supaya judul atau teks ditampilkan sebagai teks biasa.

### Deklarasi penggunaan AI

AI digunakan sebagai bantuan dalam pengembangan dan pemeriksaan implementasi DOM, render daftar proyek, event delegation, validasi form, dan dokumentasi. Data profil, identitas, proyek, film, serta struktur halaman melanjutkan pekerjaan pribadi dari pertemuan sebelumnya. Saya bertanggung jawab memeriksa, memahami, dan mampu menjelaskan kode yang disimpan. Hasil Console dan tangkapan layar perlu saya verifikasi sendiri melalui peramban sebelum penyerahan.

### Pemeriksaan akhir

- [x] `profil.html`, seluruh CSS, `js/app.js`, dan `js/dom.js` tersedia.
- [x] Selector yang dipakai cocok dengan ID pada HTML.
- [x] Daftar proyek dirender dari array dengan `createElement()` dan `textContent`.
- [x] Wadah dikosongkan sebelum render ulang.
- [x] Filter menggunakan satu pendengar klik pada induknya.
- [x] Keadaan daftar kosong ditangani.
- [x] Form mencegah pemuatan ulang dan memvalidasi setiap kolom.
- [x] Deklarasi AI tersedia di README.
- [ ] Tangkapan layar hasil pengujian browser ditambahkan setelah pengujian manual.
