export const profil = {
  nama: "Ahmad Dafa Ardevanda",
  peran: "Mahasiswa Informatika yang belajar front-end",
  nim: "25523179",
  tahun: 2026,
  alamat: "Sleman, Sardonoharjo",
  keahlian: ["HTML", "CSS", "JavaScript", "Responsive Design"],
};

export const daftarFilmAwal = [
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
  return nama + " — " + peran;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

// Fungsi murni: penyaringan bergantung hanya pada daftar dan kategori.
export function saring(daftar, kategori) {
  if (kategori === "semua") return daftar;
  return daftar.filter((item) => item.kategori === kategori);
}

export function saringFilm(daftar, kategori) {
  return daftar.filter((film) => {
    if (kategori === "semua") return true;
    if (kategori === "tinggi") return film.rating >= 8;
    if (kategori === "rendah") return film.rating < 8;
    if (kategori === "tanpa-rating") {
      return film.rating === null || film.rating === undefined;
    }
    return false;
  });
}

export const bioProfil =
  profil.bio ?? "Saya sedang mengembangkan beberapa proyek.";
