# PABW — Pertemuan 8

## JavaScript Modern ES6+, Struktur Data, dan Array Methods

Pertemuan 8 melanjutkan halaman profil dari Pertemuan 6. Fokus pekerjaan adalah memindahkan data halaman dari HTML ke JavaScript, menggunakan object dan array, membuat fungsi murni, serta mengolah data dengan `map()`, `filter()`, dan `find()`.

### Struktur folder

```text
worksheet-p8/
├── profil.html
├── css/
│   ├── base.css
│   ├── komponen.css
│   ├── layout.css
│   ├── responsif.css
│   ├── tema.css
│   └── tokens.css
├── img/
│   ├── avanger.jpg
│   ├── infinity.jpg
│   └── ironman3.jpg
└── js/
    └── app.js
```

### Data JavaScript

File `js/app.js` menyimpan data halaman sebagai:

- `profil` — object identitas.
- `profil.keahlian` — array daftar keahlian.
- `daftarProyek` — array of object untuk proyek.
- `daftarFilm` — array of object untuk film favorit.
- `jumlahProyek` — nilai angka dari jumlah proyek.
- `filterAktif` — contoh variabel `let` yang dapat berubah.

### Sintaks ES6+ yang digunakan

- `const` untuk nilai yang tidak ditunjuk ulang.
- `let` untuk nilai yang dapat berubah.
- Template literal dengan backtick dan `${}`.
- Operator `??` untuk nilai bawaan saat nilai `null` atau `undefined`.
- Optional chaining `?.` untuk akses property yang aman.
- Perbandingan ketat menggunakan `===`.
- Spread `...` sebelum `sort()` agar array asli tidak berubah.

### Dua fungsi murni

```js
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");
```

`buatPerkenalan()` menyusun kalimat perkenalan, sedangkan `formatKeahlian()` mengubah array keahlian menjadi satu baris teks.

### Array methods

```js
const proyekSelesai = daftarProyek.filter(
  (proyek) => proyek.selesai === true
);

const proyekKosManage = daftarProyek.find(
  (proyek) => proyek.judul === "KosManage Web"
);

const judulProyek = daftarProyek.map(
  (proyek) => proyek.judul
);

const proyekTerbaru = [...daftarProyek].sort(
  (a, b) => b.tahun - a.tahun
);
```

Hasil data juga diperiksa menggunakan `console.log()` dan `console.table()`.

### Menjalankan halaman

Halaman harus dijalankan melalui server lokal karena `app.js` dimuat sebagai JavaScript module.

Dengan VS Code, gunakan **Live Server**, kemudian buka:

```text
http://127.0.0.1:5500/worksheet-p8/profil.html
```

Alternatifnya dapat menggunakan Python:

```bash
python -m http.server 8000
```

Kemudian buka halaman melalui alamat `http://`, bukan `file://`.

### Debugging

Salah satu galat yang diuji pada P8 adalah:

```text
Uncaught TypeError: Cannot read properties of null (reading 'kota')
```

Galat tersebut terjadi ketika `profil.alamat` bernilai `null` tetapi property `kota` diakses secara langsung. Perbaikannya menggunakan optional chaining:

```js
const lokasiProfil = profil.alamat?.kota ?? "Belum diisi";
```

### Deklarasi penggunaan AI

AI digunakan sebagai bantuan dalam implementasi Pertemuan 8, terutama untuk:

- membantu memindahkan data halaman dari HTML ke JavaScript;
- menyusun contoh object, array of object, dan fungsi murni;
- membantu penerapan `map()`, `filter()`, `find()`, `??`, `?.`, dan spread;
- membantu pemeriksaan struktur dan sintaks kode.

Topik halaman, identitas, data proyek, pilihan film, dan aset halaman berasal dari pekerjaan saya pada pertemuan sebelumnya. Saya tetap bertanggung jawab memahami kode dan menjelaskan cara kerjanya.

### Bukti pengerjaan

Bukti yang diperiksa pada P8 meliputi:

- JavaScript berhasil terhubung ke HTML.
- Console dapat menampilkan data menggunakan `console.table()`.
- Dua fungsi murni menghasilkan nilai.
- `map()`, `filter()`, dan `find()` menghasilkan data sesuai kebutuhan.
- Galat dapat dibaca dari Console dan diperbaiki berdasarkan penyebabnya.
- Perubahan disimpan menggunakan beberapa commit Git.

