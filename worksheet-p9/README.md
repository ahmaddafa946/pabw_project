# PABW — Pertemuan 9

## DOM, Event, dan Interactivity — Bagian A

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
- Pada layar desktop, profil berada di sidebar, proyek di sampingnya, lalu daftar film dan form masing-masing menempati lebar penuh.
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

### Catatan

Bagian ini baru menyiapkan elemen dan selector DOM. Perilaku filter, event, validasi, dan interaktivitas dikerjakan pada bagian berikutnya.
