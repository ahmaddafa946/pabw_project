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
