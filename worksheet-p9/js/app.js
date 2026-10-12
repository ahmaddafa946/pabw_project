export const profil = {
  nama: "Ahmad Dafa Ardevanda",
  peran: "Mahasiswa Informatika yang belajar front-end",
  nim: "25523179",
  tahun: 2026,
  alamat: "Sleman, Sardonoharjo",
  keahlian: ["HTML", "CSS", "JavaScript", "Responsive Design"],
};

export const daftarProyek = [
  {
    judul: "KosManage Web",
    tahun: 2026,
    selesai: true,
    deskripsi: "Aplikasi web untuk membantu pengelolaan data kos.",
  },
  {
    judul: "KosManage Mobile",
    tahun: 2026,
    selesai: true,
    deskripsi: "Aplikasi mobile pendamping untuk pengelolaan data kos.",
  },
  {
    judul: "Profil Responsif PABW",
    tahun: 2026,
    selesai: true,
    deskripsi: "Halaman profil responsif dengan HTML dan CSS modern.",
  },
];

export const daftarFilm = [
  {
    judul: "Avengers Endgame",
    tahun: 2019,
    rating: 8.4,
    gambar: "./img/avanger.jpg",
    alt: "Poster Avengers Endgame",
  },
  {
    judul: "Iron Man 3",
    tahun: 2013,
    rating: 7.1,
    gambar: "./img/ironman3.jpg",
    alt: "Poster Iron Man 3",
  },
  {
    judul: "Avengers Infinity War",
    tahun: 2018,
    rating: 8.2,
    gambar: "./img/infinity.jpg",
    alt: "Poster Avengers Infinity War",
  },
];

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

const jumlahProyek = daftarProyek.length;
const lokasiProfil = profil.alamat?.kota ?? "Belum diisi";
const bioProfil = profil.bio ?? `Saya sudah membuat ${jumlahProyek} proyek.`;

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(`Lokasi profil: ${lokasiProfil}`);
console.log(`Bio: ${bioProfil}`);

console.table(profil);
console.table(profil.keahlian);
console.table(daftarProyek);
console.table(daftarFilm);

const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai === true);
console.log(`Jumlah proyek selesai: ${proyekSelesai.length}`);
console.table(proyekSelesai);

const proyekKosManage = daftarProyek.find(
  (proyek) => proyek.judul === "KosManage Web",
);
console.log(proyekKosManage);

const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.log(judulProyek);

const proyekTerbaru = [...daftarProyek].sort(
  (a, b) => b.tahun - a.tahun,
);
console.table(proyekTerbaru);
console.table(daftarProyek);

const filmRatingTinggi = daftarFilm.filter((film) => film.rating >= 8);
const filmFavorit = daftarFilm.find(
  (film) => film.judul === "Avengers Endgame",
);
console.table(filmRatingTinggi);
console.log(filmFavorit);
