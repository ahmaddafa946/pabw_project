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

Implementasi P5 menggunakan kembali konten, warna, dan design token dari Pertemuan 4. Perubahan utama berada pada mekanisme layout.

### A. Kerangka halaman

| Bagian | Pilihan |
|---|---|
| Baris halaman | `auto 1fr auto` |
| Kolom area isi | `16rem 1fr` |
| Sumbu navbar | horizontal |
| Navbar | Flex |
| Area isi | Grid |
| Galeri kartu | Grid |
| Isi kartu | Flex |

### B. Kerangka dan navbar

- Pembungkus terluar: `.page`
- Kerangka halaman: CSS Grid dengan tiga baris `auto 1fr auto`
- Tinggi minimum: `100dvh`
- Navbar: Flexbox dengan `gap`
- Area isi: Grid dua kolom menggunakan `16rem 1fr` dengan `minmax(0, ...)` agar item tetap dapat menyusut

### C. Kartu dan galeri

Galeri menggunakan `repeat(auto-fit, minmax(16rem, 1fr))`, sehingga jumlah kolom dapat berubah mengikuti ruang yang tersedia tanpa media query. Isi kartu menggunakan Flexbox.

### D. Penempatan

Bagian **List Film** dan **Tambah Film** masing-masing memakai `grid-column: span 2`, sehingga dua blok memenuhi syarat penempatan span dan tetap rapi pada lebar sempit.

### E. Tiga kasus sulit

1. Tinggi kartu: kartu memakai `min-height: 14rem`.
2. Isi panjang: item memakai `min-width: 0` dan teks memakai `overflow-wrap: anywhere`.
3. Luber: input dan item kartu diberi `min-width: 0`, sedangkan galeri memakai `minmax(16rem, 1fr)`.

### F. Pemeriksaan

- [x] Kerangka halaman memakai Grid.
- [x] Navbar memakai Flexbox.
- [x] Jarak utama memakai `gap`.
- [x] Lebar kolom menggunakan `fr` / `minmax()`.
- [x] Galeri adaptif tanpa media query.
- [x] Tidak menggunakan `float`.
- [x] Tidak menggunakan `!important`.
- [x] Tema gelap Pertemuan 4 tetap dipakai.

**Potongan kode:** `grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));`

**Dipakai pada:** galeri daftar film.

### F.4 Tiket keluar

| Pertanyaan | Jawaban |
|---|---|
| Bagian halaman mana yang memakai flex, dan mengapa flex yang cocok? | Navbar, isi kartu, dan form memakai Flexbox karena elemen di dalamnya terutama disusun dalam satu arah. |
| Bagian halaman mana yang memakai grid, dan mengapa grid yang cocok? | Kerangka halaman, area isi, dan galeri memakai Grid karena perlu pengaturan baris dan kolom. |
| Satu kasus meluber yang ditemukan dan perbaikannya | Isi panjang dapat mendorong item melebar; diperbaiki dengan `min-width: 0` dan `overflow-wrap: anywhere`. |

### F.5 Catatan untuk pengampu

**Bagian yang paling sulit:** menyesuaikan Grid dan Flexbox tanpa mengubah isi dan design token dari Pertemuan 4.

**Bagian yang saya ingin dibahas di kelas:** perbedaan penggunaan Grid untuk kerangka dua arah dan Flexbox untuk komponen satu arah.
