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

Navbar memakai Flexbox:

```css
.navbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
```

Area isi memakai Grid:

```css
.isi {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: var(--space-6);
}
```

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

### D — Penempatan

D.1 menggunakan `grid-column: span 2` pada dua section yang sudah ada:

```css
#list-film {
  grid-column: span 2;
}

#tambah-film {
  grid-column: span 2;
}
```

D.2 area bernama tidak digunakan karena dua blok utama cukup ditempatkan dengan `span`.

D.3 class/ID yang dipakai berasal dari struktur halaman yang sudah ada; tidak dibuat class dekoratif tambahan hanya untuk penempatan.

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
- [x] Area isi Grid dengan `16rem 1fr`
- [x] Galeri Grid `auto-fit` dan `minmax()`
- [x] `.kartu__kaki` Flexbox
- [x] Penempatan `span 2`
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

File `worksheet-p6/css/responsif.css` menggunakan aturan dasar tanpa media query untuk ukuran layar kecil:

```css
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}
```

Dengan pendekatan ini, layout dimulai dari satu kolom pada layar mobile.

### C — Breakpoint

Breakpoint ditambahkan untuk memperluas layout pada tablet dan desktop:

```css
@media (min-width: 48rem) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 60rem) {
  .content {
    grid-template-columns: 16rem 1fr;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Pada ukuran minimal 48rem, grid berubah menjadi dua kolom. Pada minimal 60rem, grid berubah menjadi tiga kolom dan container `.content` memakai dua kolom dengan ukuran `16rem 1fr`.

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
- [x] Breakpoint 60rem untuk tiga kolom.
- [x] Gambar responsif.
- [x] Aturan wrapper tabel tersedia pada `responsif.css`.
- [x] Ukuran paragraf dan line-height ditetapkan.
- [x] Penanganan teks panjang menggunakan `min-width: 0` dan `overflow-wrap: anywhere`.

### Catatan untuk pengampu

**Bagian yang paling penting:** responsivitas ditambahkan tanpa menghapus struktur dan class dari Pertemuan 5. Pendekatan mobile-first dimulai dari satu kolom, kemudian diperluas melalui breakpoint `48rem` dan `60rem`.
