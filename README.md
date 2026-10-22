# pabw_project
# Ahmad Dafa Ardevanda - 25523179
Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.
## Pertemuan 3 — Halaman profil saya
Topik halaman saya: Playlist Film Favorite.
- Judul halaman: Daftar Film
- Deskripsi: daftar film favorite saya
- Tautan navigasi: List film, Tambah Film, Tentang Saya
- Dua bagian utama: Daftar Buku, Tambah Buku
- Kolom tabel: judul, penulis, tahun terbit, status baca
- Kolom form: judul, Tahun Rilis, Rating
- Gambar: avenger.jpg, infinity.jpg, ironman.jpg
## Catatan penggunaan AI
- Meminta bantuan AI pada bagian DevTool 

# PABW — Worksheet Pertemuan 4

## Pertemuan 4 — Design token halaman profil

- Berkas gaya: `tokens.css`, `base.css`, `layout.css`, `komponen.css`, `tema.css`
- Warna utama tema terang: `#1D3A8C` (biru), dipilih agar tombol, tautan, judul, dan garis fokus memiliki kontras yang jelas.
- Warna utama tema gelap: `#3B82F6` dengan teks tombol `#0F172A`, sehingga teks tombol dan judul tetap memenuhi kontras AA.

### Token yang saya tetapkan

| Token | Nilai | Untuk apa |
|---|---|---|
| `--color-primary` | `var(--blue-700)` | tombol, tautan, judul, garis fokus |
| `--color-on-primary` | `var(--white)` | teks di atas warna utama pada tema terang |
| `--color-fg` | `var(--gray-800)` | warna teks utama |
| `--color-bg` | `var(--gray-50)` | latar halaman |
| `--color-surface` | `var(--white)` | latar kartu, form, panel |
| `--color-border` | `var(--gray-500)` | garis pemisah dan tepi |
| `--radius-md` | `0.5rem` | sudut tombol, kartu, dan isian |
| `--space-4` | `1rem` | jarak standar |
| `--text-md` | `1rem` | ukuran teks isi |
| `--text-xl` | `1.5rem` | judul bagian |
| `--text-3xl` | `2.25rem` | judul halaman |

### F.3 — Uji kontras kedua tema

| Pasangan yang diuji | Tema terang | Tema gelap | Ambang |
|---|---:|---:|---:|
| Teks isi di atas latar halaman | 12.57:1 | 14.48:1 | 4.5:1 |
| Teks tombol di atas warna utama | 10.31:1 | 4.85:1 | 4.5:1 |
| Judul bagian di atas latar | 8.76:1 | 4.85:1 | 4.5:1 |
| Garis fokus terhadap latar sekitarnya | 8.76:1 | 10.87:1 | 3:1 |
| Tepi kartu terhadap latar halaman | 4.03:1 | 3.75:1 | 3:1 |

Seluruh pasangan yang diuji memenuhi ambang kontras yang ditetapkan pada worksheet.

Kriteria selesai saya: mengubah `--blue-700` di satu baris harus mengubah warna tombol, tautan, judul, garis fokus, dan warna utama pada tema terang. Tema gelap memiliki override semantik di `tema.css` agar kontras tetap memenuhi ambang.

Bantuan AI digunakan untuk menyesuaikan struktur CSS dan HTML dengan kriteria Worksheet Pertemuan 4, terutama design token, flexbox, form validation state, pengujian kontras, dan tema gelap. Rancangan konten halaman dan pilihan tampilan tetap disusun sendiri.


# PABW — Worksheet Pertemuan 5

## Layout Modern: Flexbox dan Grid

Folder P5 saat ini memakai struktur berikut:

`worksheet-p5/`
- `profil.html`
- `css/base.css`
- `css/komponen.css`
- `css/layout.css`
- `css/tema.css`
- `css/tokens.css`
- `img/avanger.jpg`
- `img/ironman3.jpg`
- `img/infinity.jpg`

Konten, warna, design token, dan tema dari Pertemuan 4 tetap digunakan. Perubahan P5 berfokus pada tata letak dengan Grid dan Flexbox.

### A — Kerangka halaman

**A.1 Kerangka halaman**
- Baris pertama: `auto`
- Baris kedua: `1fr`
- Baris ketiga: `auto`
- Kolom area isi: `16rem 1fr`

**A.2 Sumbu dan arah**
- Navbar: horizontal; sumbu utama horizontal, sumbu silang vertikal.
- Bagian bawah kartu: horizontal; sumbu utama horizontal, sumbu silang vertikal.
- Daftar menu: vertikal; sumbu utama vertikal, sumbu silang horizontal.

**A.3 Kapan flex, kapan grid**
- Kepala halaman: Flexbox, karena judul dan navbar disusun dalam satu arah.
- Isi dua kolom: Grid, karena membagi area dalam baris dan kolom.
- Galeri kartu: Grid, karena kartu disusun dalam beberapa kolom adaptif.
- Isi satu kartu: Flexbox, karena elemen kartu dapat disusun dalam satu arah.

### B — layout.css

**B.1 Kerangka halaman**

Di `profil.html`, class `.page` membungkus `header`, `main`, dan `footer`.

```css
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}
```

**B.2 Navbar dan isi**

Navbar menggunakan Flexbox. Area isi menggunakan named grid areas agar form berada di sidebar pada layar lebar, sedangkan daftar film mengisi ruang utama.

```css
.isi {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "film"
    "form";
  gap: var(--space-6);
}

@media (min-width: 48rem) {
  .isi {
    grid-template-columns: 16rem minmax(0, 1fr);
    grid-template-areas: "form film";
  }
}

#list-film { grid-area: film; }
#tambah-film { grid-area: form; }
```

Pada layar kecil, isi bertumpuk menjadi satu kolom. Pada layar lebar, form menjadi sidebar selebar `16rem` dan galeri menggunakan ruang yang tersisa. Galeri tetap adaptif tanpa media query pada aturan `.galeri`.

Tidak ada `float` pada `layout.css`.

### C — komponen.css

**C.1 Galeri adaptif**

Class `.galeri` berada pada container daftar film. CSS-nya:

```css
.galeri {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-4);
}
```

Galeri tidak memakai media query untuk mengubah jumlah kolom.

**C.2 Isi kartu**

Struktur kartu sekarang:

```text
.kartu
├── .kartu__isi
│   └── figure
│       ├── img
│       └── .kartu__judul
└── .kartu__kaki
    ├── Tahun Rilis
    └── Rating
```

Class `.kartu__kaki` memakai Flexbox:

```css
.kartu__kaki {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  flex-wrap: wrap;
  min-width: 0;
}
```

### D — Penempatan dengan named grid areas

Dua bagian utama ditempatkan dengan nama area, bukan `grid-column: span 2`. Ini membuat tujuan setiap kolom jelas dan menghindari kedua bagian mengambil lebar penuh pada desktop.

```css
.isi {
  grid-template-areas:
    "film"
    "form";
}

@media (min-width: 48rem) {
  .isi {
    grid-template-areas: "form film";
  }
}

#list-film { grid-area: film; }
#tambah-film { grid-area: form; }
```

### E — Tiga kasus sulit

**E.1 Tinggi kartu tidak seragam**

Pada galeri:

```css
.galeri .kartu {
  display: grid;
  align-content: start;
  min-height: 14rem;
}
```

**E.2 Isi panjang mendorong kolom**

Class yang dipakai sesuai kebutuhan worksheet:

```css
.kartu__isi {
  min-width: 0;
}

.kartu__judul {
  overflow-wrap: anywhere;
}
```

**E.3 Item meluber keluar kotak**

Item utama menggunakan `min-width: 0`, input juga menggunakan `min-width: 0`, dan teks panjang menggunakan `overflow-wrap: anywhere`. Galeri menggunakan `minmax(16rem, 1fr)` agar kartu menyesuaikan ruang yang tersedia.

### F — Pemeriksaan

F.1 memeriksa enam hal sesuai worksheet:
- Kerangka halaman menggunakan Grid tiga baris.
- Jarak layout menggunakan `gap`.
- Lebar kolom memakai `rem`, `fr`, atau `minmax()`.
- Galeri berubah jumlah kolom tanpa media query.
- Tidak ada overflow horizontal pada viewport 360 px dan 1.280 px.
- Pengalih tema gelap dari Pertemuan 4 tetap berfungsi.

Status implementasi kode saat ini:
- [x] Wrapper `.page` dan Grid `auto 1fr auto`
- [x] Navbar Flexbox dengan `gap`
- [x] Area isi Grid dengan named areas; form menjadi sidebar pada layar lebar
- [x] Galeri Grid `auto-fit` dan `minmax()`
- [x] `.kartu__kaki` Flexbox
- [x] Penempatan memakai `grid-template-areas` dan `grid-area`
- [x] Perbaikan `min-width: 0` dan `overflow-wrap: anywhere`
- [x] Tidak memakai `float` atau `!important`
- [x] Uji visual 360 px
- [x] Uji visual 1.280 px

**F.2 Potongan kode untuk diingat**

`grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));`

Dipakai pada `.galeri` di `worksheet-p5/css/komponen.css`.

### F.3 Penilaian mandiri

| Bagian | Bobot |
|---|---:|
| Kerangka halaman: baris dan kolom | 30 |
| Flexbox: navbar dan isi kartu | 25 |
| Grid: galeri adaptif dan penempatan | 30 |
| Kerapian: nol luberan, nol `!important` | 15 |
| **TOTAL** | **100** |

Nilai akhir diisi setelah pemeriksaan visual pada 360 px dan 1.280 px.

### F.4 Tiket keluar

| Pertanyaan | Jawaban |
|---|---|
| Bagian halaman mana yang memakai flex, dan mengapa flex yang cocok? | Navbar, bagian bawah kartu, dan form memakai Flexbox karena elemen anak terutama disusun dalam satu arah. |
| Bagian halaman mana yang memakai grid, dan mengapa grid yang cocok? | Kerangka halaman, area isi, dan galeri memakai Grid karena membutuhkan pengaturan baris dan kolom. |
| Satu kasus meluber yang ditemui dan perbaikannya | Isi panjang dapat mendorong item melebar; diperbaiki dengan `min-width: 0` dan `overflow-wrap: anywhere`. |

### F.5 Catatan untuk pengampu

**Bagian yang paling sulit:** menyesuaikan Grid dan Flexbox dengan struktur halaman Pertemuan 4 tanpa mengubah konten dan design token.

# PABW — Worksheet Pertemuan 6

## Responsif Mobile-First

Pertemuan 6 melanjutkan halaman profil dari Pertemuan 5 dengan fokus pada desain responsif menggunakan pendekatan mobile-first. Struktur HTML, konten, design token, dan tema tetap dipertahankan.

### A — Persiapan responsif

Di `worksheet-p6/profil.html` sudah digunakan viewport meta agar ukuran halaman mengikuti lebar perangkat:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Class responsif diterapkan pada elemen layout yang sudah ada:

```html
<main class="isi content">
```

dan container galeri:

```html
<div class="galeri grid">
```

Class lama `.isi` dan `.galeri` tetap dipertahankan agar CSS dari Pertemuan 5 tetap berjalan.

### B — Mobile-first

File `worksheet-p6/css/responsif.css` memulai area isi dengan satu kolom. Karena class `.isi` dan `.content` tetap dipakai, named areas menentukan posisi daftar film dan form tanpa menghapus struktur P5.

```css
.content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "film"
    "form";
  gap: var(--space-4);
}
```

Pada layar kecil, daftar film tampil lebih dulu dan form di bawahnya.

### C — Breakpoint

Breakpoint memperluas galeri pada tablet, lalu menempatkan form di sidebar pada desktop:

```css
@media (min-width: 48rem) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 60rem) {
  .content {
    grid-template-columns: 16rem minmax(0, 1fr);
    grid-template-areas: "form film";
  }

  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

Mulai 48rem, galeri dapat memakai dua kolom. Mulai 60rem, form menjadi sidebar selebar `16rem`, daftar film berada di kolom konten, dan galeri dapat memakai tiga kolom. Batas bawah `minmax(0, 1fr)` membantu item menyusut agar tidak memaksa halaman melebar.

### D — Gambar, tabel, dan teks

Untuk menjaga isi tetap berada di dalam viewport:

```css
img {
  max-width: 100%;
  height: auto;
}

.table-wrap {
  overflow-x: auto;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}
```

Teks panjang juga ditangani menggunakan `min-width: 0` dan `overflow-wrap: anywhere` pada bagian yang membutuhkan.

Pada halaman P6 saat ini tidak terdapat tabel, sehingga class `.table-wrap` belum dipasang pada elemen HTML.

### E — Pemeriksaan responsif

Ukuran viewport yang menjadi acuan pemeriksaan:
- 360 px — layout mobile satu kolom.
- 768 px — layout tablet dengan grid dua kolom.
- 1.280 px — layout desktop dengan grid tiga kolom.

Hal yang diperiksa:
- Tidak ada horizontal scroll pada halaman.
- Gambar tidak keluar dari container.
- Teks panjang tidak mendorong layout melebar.
- Grid berubah jumlah kolom sesuai breakpoint.
- Tema gelap dari Pertemuan 4 tetap dapat digunakan.

### Status implementasi P6

- [x] Viewport meta tersedia.
- [x] Class `.content` ditambahkan ke `main` tanpa menghapus class `.isi`.
- [x] Class `.grid` ditambahkan ke galeri tanpa menghapus class `.galeri`.
- [x] Mobile-first satu kolom.
- [x] Breakpoint 48rem untuk dua kolom.
- [x] Breakpoint 60rem untuk sidebar form dan galeri tiga kolom.
- [x] Gambar responsif.
- [x] Aturan wrapper tabel tersedia pada `responsif.css`.
- [x] Ukuran paragraf dan line-height ditetapkan.
- [x] Penanganan teks panjang menggunakan `min-width: 0` dan `overflow-wrap: anywhere`.

### Catatan untuk pengampu

**Bagian yang paling penting:** responsivitas ditambahkan tanpa menghapus struktur dan class dari Pertemuan 5. Pendekatan mobile-first dimulai dari satu kolom, kemudian diperluas melalui breakpoint `48rem` dan `60rem`.


# PABW — Worksheet Pertemuan 8

## JavaScript Modern ES6+, Struktur Data, dan Array Methods

### Tata letak lanjutan setelah P5

Layout di `worksheet-p8/css/layout.css` dan `worksheet-p9/css/layout.css` menggunakan named grid areas. Di ponsel, profil, proyek, daftar film, dan form tersusun satu kolom. Di desktop, susunan dua kolom meneruskan pola P6: profil dan proyek berada di baris pertama, lalu form mempertahankan sidebar di kolom kiri dan daftar film mengisi kolom utama di kanan. `responsif.css` mengatur galeri menjadi satu, dua, atau tiga kolom; `minmax(0, 1fr)` dan `min-width: 0` membantu mencegah konten panjang memaksa halaman melebar.

Folder `worksheet-p8/` melanjutkan halaman dari P6. Pada P8, isi halaman yang sebelumnya ditulis langsung di HTML dipindahkan menjadi data JavaScript pada `js/app.js`.

### Implementasi P8

- `profil` menyimpan identitas sebagai object: nama, peran, NIM, tahun, dan alamat opsional.
- `profil.keahlian` menyimpan daftar kemampuan sebagai array.
- `daftarProyek` menyimpan proyek sebagai array of object dengan judul, tahun, status selesai, dan deskripsi.
- `jumlahProyek` menyimpan nilai angka yang berasal dari panjang array proyek.
- `daftarFilm` juga disimpan sebagai array of object agar daftar film tidak lagi ditulis satu per satu di HTML.
- Template literal dipakai untuk menyusun judul dan informasi profil.
- `??` dipakai untuk nilai bawaan ketika data `null` atau `undefined`.
- `?.` dipakai saat mengakses `profil.alamat` yang belum diisi agar tidak melempar galat.
- Perbandingan pada filter memakai `===`.

### Dua fungsi murni

```js
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");
```

Kedua fungsi hanya bergantung pada argumennya dan tidak mengubah data di luar fungsi.

### Array methods yang dipakai

- `map()` membuat array baru berisi judul proyek.
- `filter()` mengambil proyek yang selesai dan film dengan rating minimal 8.
- `find()` mengambil proyek `KosManage Web` dan film `Avengers Endgame`.
- `[...]` dipakai sebelum `sort()` agar pengurutan tidak mengubah `daftarProyek` asli.
- `console.table()` dipakai untuk memeriksa isi object dan array di Console.

### Struktur halaman

`profil.html` memuat struktur dan elemen target. Pada P8, data proyek disimpan sebagai array of objects dan ditampilkan sebagai ringkasan jumlah; kartu proyek belum dibuat di DOM. `app.js` mengisi data profil dan film serta memperlihatkan data proyek lewat Console. Pada P9, `dom.js` membentuk kartu proyek dari array P8, sedangkan filter event delegation diterapkan pada daftar film. Nilai halaman dimuat melalui:

```html
<script type="module" src="./js/app.js"></script>
```

### Deklarasi AI

AI membantu implementasi P8, terutama untuk menyusun pemindahan data dari HTML ke JavaScript, pembuatan dua fungsi murni, penggunaan `map`, `filter`, `find`, `??`, `?.`, spread sebelum `sort`, serta pengecekan sintaks dan struktur kode. Topik halaman, identitas pribadi, proyek yang dicantumkan, serta aset film berasal dari pekerjaan saya pada pertemuan sebelumnya. Saya tetap bertanggung jawab memahami dan menjelaskan kode yang digunakan.

# PABW — Worksheet Pertemuan 9

## DOM, Event, dan Interaktivitas

Pertemuan 9 melanjutkan halaman profil dari P8 dengan memanfaatkan DOM untuk menampilkan data, menangani interaksi pengguna, memfilter daftar film, dan memvalidasi form. Dokumentasi pertemuan ini disimpan di **README utama repository**; implementasi kodenya berada di folder `worksheet-p9/`.

### Struktur berkas P9

- [`profil.html`](worksheet-p9/profil.html) — struktur halaman dan elemen yang diakses melalui DOM.
- [`js/app.js`](worksheet-p9/js/app.js) — data profil, daftar proyek, daftar film, dan fungsi pendukung.
- [`js/dom.js`](worksheet-p9/js/dom.js) — pemilihan elemen, render proyek dan film, event listener, filter, serta validasi form.
- Folder [`css/`](worksheet-p9/css/) — gaya halaman yang diteruskan dan disesuaikan dari pertemuan sebelumnya.
- Folder [`img/`](worksheet-p9/img/) — aset gambar yang digunakan pada halaman.

### A — Memilih elemen DOM

Elemen halaman diambil menggunakan `document.querySelector()` dan disimpan ke dalam variabel berikut.

| Elemen | Pemilih | Variabel |
|---|---|---|
| Wadah daftar proyek | `#daftar-proyek` | `wadah` |
| Tombol filter film | `#filter` | `barisFilter` |
| Pesan ketika hasil filter kosong | `#pesan-kosong` | `kosong` |
| Wadah daftar film | `#daftar-film` | `wadahFilm` |
| Form tambah film | `#form-film` | `form` |
| Input judul | `#judul-kolom` | `judulInput` |
| Input tahun rilis | `#tahun-kolom` | `tahunInput` |
| Input rating | `#rating-kolom` | `ratingInput` |

### B — Menampilkan data proyek

Fungsi `buatKartuProyek()` membentuk kartu dari data `daftarProyek` menggunakan `createElement()`. Teks judul, deskripsi, tahun, dan status ditambahkan melalui `textContent`, bukan dengan menyusun HTML dari string.

Fungsi `renderProyek()` mengosongkan wadah proyek melalui `wadah.replaceChildren()`, menyusun kartu menggunakan `DocumentFragment`, lalu menambahkannya ke `#daftar-proyek`. Dengan demikian, kartu proyek berasal dari data pada `app.js`.

### C — Filter film dan event delegation

Filter diterapkan pada daftar film, bukan pada daftar proyek. Tombol filter memiliki atribut `data-kategori` dengan pilihan:

- `semua` — menampilkan semua film.
- `tinggi` — menampilkan film dengan rating minimal 8.
- `rendah` — menampilkan film dengan rating di bawah 8.
- `tanpa-rating` — menampilkan film yang belum memiliki rating.

Satu `click` event listener dipasang pada elemen induk `#filter`. Kode `event.target.closest("button[data-kategori]")` digunakan untuk menemukan tombol yang diklik. Pola ini disebut event delegation dan menghindari kebutuhan memasang listener secara terpisah pada setiap tombol.

Setiap kali filter dirender, `wadahFilm.replaceChildren()` mengosongkan daftar film sebelumnya. Jika tidak ada film yang cocok, elemen `#pesan-kosong` ditampilkan. Tombol filter aktif juga ditandai dengan kelas `aktif` dan atribut `aria-pressed`.

### D — Validasi form tambah film

Form memakai `preventDefault()` agar pengiriman tidak memuat ulang halaman. Input judul, tahun, dan rating diperiksa melalui nilai input serta `checkValidity()`. Pesan kesalahan ditampilkan pada kolom terkait dan atribut `aria-invalid` diperbarui untuk menunjukkan status validasi.

Jika semua input valid, data film baru ditambahkan ke `daftarFilm`, kemudian daftar dirender ulang sesuai filter yang sedang aktif. Judul film ditampilkan menggunakan elemen DOM dan `textContent` agar teks tidak diproses sebagai markup HTML.

### E — Pengujian di browser

Jalankan `worksheet-p9/profil.html` menggunakan Live Server. Di DevTools Console, periksa bahwa selector yang digunakan mengembalikan elemen HTML, bukan `null`. Selanjutnya, uji semua tombol filter dan form tambah film, termasuk pengiriman form kosong serta input yang valid.

Untuk memahami dampak pengosongan wadah, hapus **sementara** `wadahFilm.replaceChildren()` yang berada di awal fungsi `render()` pada `worksheet-p9/js/dom.js`, simpan berkas, lalu muat ulang halaman yang berasal dari folder P9. Ketika tombol filter diklik berurutan, kartu dari hasil render sebelumnya seharusnya tetap ada sehingga jumlah kartu bertambah. Pulihkan baris tersebut setelah pengujian. Jika tampilan tidak berubah, periksa bahwa Live Server membuka folder dan berkas yang sedang diedit, lalu lakukan hard refresh pada browser.

Tangkapan layar hasil pengujian perlu diambil setelah pengujian manual benar-benar dilakukan; dokumentasi ini tidak menganggap pengujian atau tangkapan layar sudah selesai hanya berdasarkan kode.

### Deklarasi penggunaan AI

AI digunakan sebagai bantuan untuk memeriksa dan menyusun implementasi DOM



# PABW — Worksheet Pertemuan 10

## JavaScript Asinkron: fetch, Promise, dan JSON

Pertemuan 10 melanjutkan halaman profil dan playlist film dari folder `worksheet-p9/`. Implementasi P10 berada di folder `worksheet-p10/`.

### Struktur P10

- `profil.html` — mempertahankan profil, daftar proyek, filter film, dan form tambah film; menambahkan pesan memuat, gagal, dan kosong untuk daftar proyek.
- `data/proyek.json` — menyimpan data proyek sebagai JSON dengan `id` unik.
- `js/api.js` — satu tempat untuk alamat data; menjalankan `fetch`, memeriksa `respons.ok`, membaca JSON, dan mengekspor `ambilProyek()`.
- `js/app.js` — mengatur pemanggilan data dan menangani galat dengan `try/catch/finally`.
- `js/dom.js` — mempertahankan render kartu dan interaksi film, serta mengekspor `render()`, `tampilkanGalat()`, dan `aturMemuat()` untuk daftar proyek.
- CSS dan gambar memakai aset dari folder P9 agar tampilan sebelumnya tetap terjaga.

### Cara menjalankan dan memeriksa

Buka folder repository di VS Code, jalankan `worksheet-p10/profil.html` dengan Live Server, lalu periksa tab Network. Permintaan proyek diarahkan ke alamat raw GitHub dan seharusnya berstatus 200. Uji juga keadaan kosong dengan isi JSON `[]`, dan keadaan gagal dengan alamat yang tidak valid; pulihkan data setelah pengujian.

### Arah konversi JSON

- `respons.json()` membaca badan respons menjadi nilai JavaScript.
- `JSON.parse(teks)` mengubah teks JSON menjadi nilai JavaScript.
- `JSON.stringify(nilai)` mengubah nilai JavaScript menjadi teks JSON.

### Deklarasi penggunaan AI

AI membantu menyusun pemisahan pengambilan data di `js/api.js`, penanganan status HTTP dan Promise, serta pesan keadaan antarmuka. Topik profil, data proyek, pilihan film, dan struktur halaman berasal dari proyek saya pada pertemuan sebelumnya. Saya tetap bertanggung jawab menguji hasilnya dan memahami fungsi setiap bagian kode.


# PABW — Worksheet Pertemuan 11

Pertemuan 11 melanjutkan halaman worksheet-p10/ ke folder [worksheet-p11/](worksheet-p11/). Halaman ini tetap memakai topik profil dan playlist film, sekaligus memecah JavaScript menjadi modul dengan satu tanggung jawab per berkas.

## Struktur berkas

- [profil.html](worksheet-p11/profil.html) — struktur halaman dan pemanggil modul utama.
- [js/data.js](worksheet-p11/js/data.js) — data profil, data awal film, serta fungsi murni buatPerkenalan(), formatKeahlian(), saring(), dan saringFilm().
- [js/state.js](worksheet-p11/js/state.js) — satu objek state dan fungsi pengubahnya; pilihan kategori proyek dan daftar favorit disimpan menggunakan localStorage.
- [js/dom.js](worksheet-p11/js/dom.js) — pemilihan elemen, pembuatan kartu, render(state), perubahan kelas tombol, dan validasi form.
- [js/events.js](worksheet-p11/js/events.js) — pemasangan pendengar klik filter, favorit, reset, serta form.
- [js/app.js](worksheet-p11/js/app.js) — perakit modul dan alur memuat data proyek.
- [js/api.js](worksheet-p11/js/api.js) — modul pengambilan JSON dari P10, dipakai tanpa perubahan.
- [data/proyek.json](worksheet-p11/data/proyek.json) — salinan data proyek yang disediakan bersama worksheet.
- css/ dan img/ — salinan CSS dan aset yang digunakan halaman P10.

## Keadaan dan penyimpanan

- Kategori proyek aktif dan daftar ID proyek favorit adalah keadaan yang disimpan.
- Penyimpanan memakai kunci pabw-p11, JSON.stringify(), dan JSON.parse(), dengan versi skema 2.
- Jika JSON rusak atau nomor versi/bentuk datanya tidak sesuai, simpanan dibuang dan halaman memakai nilai bawaan.
- Tombol Atur ulang pilihan menghapus simpanan dan mengembalikan kategori proyek serta favorit ke nilai awal.
- Data proyek dari server, daftar film, input form, token, kata sandi, dan data pribadi tidak disimpan ke localStorage.

## Pemeriksaan sebelum penyerahan

Jalankan halaman melalui server lokal (misalnya Live Server di VS Code), bukan dengan membuka HTML sebagai file://. Lakukan pemeriksaan di browser berikut dan isi hasilnya sendiri sebelum menyerahkan:

1. Filter Semua Proyek, Web, dan Mobile menampilkan kategori yang sesuai; mengklik filter yang sama dua kali tidak menggandakan kartu.
2. Klik ☆ pada proyek, lalu tutup tab dan buka kembali halaman menggunakan alamat/port server yang sama. Kategori terakhir dan tanda favorit tetap dipulihkan.
3. Klik Atur ulang pilihan. Kategori kembali ke semua proyek dan favorit kosong.
4. Di DevTools Console, jalankan localStorage.setItem("pabw-p11", "bukan-json"), lalu muat ulang. Halaman harus tetap terbuka dan simpanan rusak terhapus. Periksa dengan localStorage.getItem("pabw-p11") yang seharusnya menghasilkan null.
5. Ulangi dengan localStorage.setItem("pabw-p11", "{}"). Setelah dimuat ulang, simpanan dengan versi yang tidak cocok juga harus terhapus.
6. Pastikan filter film, tema, validasi form tambah film, pemuatan data proyek, dan penanganan pesan gagal tetap berfungsi; Console tidak menunjukkan galat impor.

Simpan dua tangkapan layar untuk bukti penanganan simpanan rusak: keadaan sebelum pemulihan dan halaman setelah kembali memakai nilai bawaan.

## Deklarasi penggunaan AI

AI membantu menyusun rancangan pemisahan modul, alur perubahan state dan render, rancangan penyimpanan/pemulihan localStorage, serta penanganan JSON rusak dan versi skema. Topik profil/film, data proyek, CSS, dan aset halaman diteruskan dari pekerjaan P10. Sebelum menyerahkan, saya harus menjalankan checklist di atas, memeriksa kode, dan hanya mencatat pada laporan atau worksheet bagian yang benar-benar sudah saya uji dan pahami sendiri.

## Pekerjaan rumah menuju P12 — Node.js LTS

Versi terakhir yang tercatat dari lingkungan pengembangan laptop:
- `node -v`: `v24.21.0`
- `npm -v`: `11.19.0`

Sebelum penyerahan, jalankan ulang kedua perintah tersebut di PowerShell laptop dan perbarui angka jika hasilnya berbeda. Hasil dari sesi sebelumnya bukan pengganti pemeriksaan terminal terbaru.

# PABW — Worksheet Pertemuan 12

## Build Tooling, npm, dan Framework SPA

Pertemuan 12 melanjutkan halaman dari Pertemuan 11 ke proyek Vue dengan Vite di folder [worksheet-p12/](worksheet-p12/). Aset P11 disalin ke proyek Vue, halaman dipisah menjadi komponen, state memakai reaktivitas Vue, dan hasil produksi diuji melalui Vite Preview.

### Struktur proyek dan cara menjalankan

- `index.html` — halaman utama dan titik mount Vue.
- `src/main.js` — mengimpor `App.vue` serta enam CSS dari P04–P06: `tokens.css`, `base.css`, `layout.css`, `komponen.css`, `tema.css`, dan `responsif.css`.
- `src/App.vue` — komponen induk halaman dan pemuatan data proyek.
- `src/components/KepalaProfil.vue` — menampilkan profil melalui props `:profil="profil"`.
- `src/components/TombolFilter.vue` — filter kategori dan pengaturan ulang pilihan proyek.
- `src/components/DaftarProyek.vue` — daftar proyek, keadaan memuat/gagal/kosong, serta tombol favorit.
- `src/components/FormKontak.vue` — menampung formulir Tambah Film yang dipertahankan dari halaman P11.
- `src/state.js` — state reaktif melalui `reactive()`, pemuatan/pemulihan simpanan, dan pengubah state tanpa pemanggilan `render(state)` manual.
- `src/api.js` — mengambil JSON proyek dan memeriksa status respons HTTP.
- `public/data/proyek.json` dan `public/img/` — data JSON dan aset gambar statis.
- `package.json` dan `package-lock.json` — deklarasi paket dan versi dependensi yang terkunci.

Perintah yang digunakan:

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run dev` digunakan selama pengembangan. `npm run build` menghasilkan folder `dist/`. `npm run preview` menjalankan hasil build tersebut untuk memeriksa versi produksi secara lokal.

### Versi Node.js dan npm

Versi yang terakhir tercatat untuk lingkungan pengembangan P12:

| Perkakas | Versi |
|---|---|
| Node.js (`node -v`) | `v24.21.0` |
| npm (`npm -v`) | `12.1.0` |

Sebelum penyerahan, jalankan kembali `node -v` dan `npm -v` pada terminal yang digunakan untuk proyek, lalu pastikan angka di atas sesuai dengan hasil terminal.

### Hasil build produksi

Build berhasil dijalankan dengan `npm run build`; folder `dist/index.html` dan `dist/assets/` terbentuk. Aplikasi kemudian dibuka melalui `npm run preview`. Pada pengukuran DevTools Network yang tercatat untuk preview:

| Pengukuran | `npm run dev` (sebelum build) | `npm run preview` (sesudah build) |
|---|---:|---:|
| Transfer size | Belum tercatat pada pengukuran yang tersedia; ukur di Network sebelum menyimpulkan perbandingan | Sekitar 202 kB |
| Resource size | Belum tercatat pada pengukuran yang tersedia; ukur di Network sebelum menyimpulkan perbandingan | Sekitar 251 kB |
| Jumlah request | Belum tercatat | 7 request |

Cara ukur: buka DevTools → Network, aktifkan Disable cache, lalu muat ulang halaman. Catat jumlah request, transferred size, dan resource size untuk alamat `npm run dev`; lakukan pengukuran yang sama pada alamat `npm run preview`. Nilai sebelum build sengaja ditandai belum tercatat karena tidak ada pengukuran dev yang dapat diverifikasi dari bukti yang tersedia. Jangan mengisi angka perkiraan sebagai hasil pengukuran.

### Penyimpanan dan pemeriksaan state

- State menggunakan `reactive()`; template Vue menyesuaikan tampilan saat state berubah, sehingga tidak memakai `render(state)` manual.
- `onMounted()` memulihkan pilihan dari `localStorage` dan mengambil data proyek.
- `watch(state, (nilai) => simpan(nilai), { deep: true })` menyimpan perubahan state secara otomatis.
- Simpanan menggunakan kunci `pabw-p11` dan format JSON. Simpanan rusak dibuang dan aplikasi kembali memakai nilai bawaan.
- Filter kategori dan favorit diuji agar tetap ada setelah halaman dimuat ulang. `localStorage` terkait dengan origin, termasuk port yang dipakai server lokal.

### Git dan berkas yang tidak di-commit

`.gitignore` mengabaikan `node_modules/`, `dist/`, dan `.env`. `node_modules/` dapat dibuat ulang melalui `npm install`, sementara `dist/` dapat dibuat ulang melalui `npm run build`. `package.json` dan `package-lock.json` tetap disimpan di repositori agar konfigurasi paket dan versi dependensi dapat direproduksi.

### Deklarasi penggunaan AI

AI digunakan sebagai pendamping untuk memahami langkah migrasi ke Vue/Vite, menyusun dan meninjau komponen, mengalihkan state ke `reactive()`, menambahkan penyimpanan otomatis dengan `watch()`, menganalisis error, serta menyiapkan pemeriksaan build dan dokumentasi. Saya menjalankan perintah pada lingkungan saya, memeriksa hasil build, menguji halaman preview, dan mengisi hasil pengujian berdasarkan hasil yang terlihat. Topik halaman profil dan playlist film, identitas, data proyek, isi film, serta aset berasal dari pekerjaan saya pada pertemuan sebelumnya. Saya bertanggung jawab memahami kode yang digunakan dan memverifikasi hasil akhir sebelum menyerahkan pekerjaan.

