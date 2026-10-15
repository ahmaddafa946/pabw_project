export const profil = {
  nama: "Ahmad Dafa Ardevanda",
  peran: "Mahasiswa Informatika yang belajar front-end",
  nim: "25523179",
  tahun: 2026,
  alamat: "Sleman, Sardonoharjo",
  keahlian: ["HTML", "CSS", "JavaScript", "Responsive Design"],
};


export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

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