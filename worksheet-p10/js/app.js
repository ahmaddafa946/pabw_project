export const profil = {
  nama: "Ahmad Dafa Ardevanda",
  peran: "Mahasiswa Informatika yang belajar front-end",
  nim: "25523179",
  tahun: 2026,
  alamat: "Sleman, Sardonoharjo",
  keahlian: ["HTML", "CSS", "JavaScript", "Responsive Design"],
};

export const daftarFilm = [
  {
    judul: "Avengers Endgame",
    tahun: 2019,
    rating: 8.4,
    gambar: "../worksheet-p9/img/avanger.jpg",
    alt: "Poster Avengers Endgame",
  },
  {
    judul: "Iron Man 3",
    tahun: 2013,
    rating: 7.1,
    gambar: "../worksheet-p9/img/ironman3.jpg",
    alt: "Poster Iron Man 3",
  },
  {
    judul: "Avengers Infinity War",
    tahun: 2018,
    rating: 8.2,
    gambar: "../worksheet-p9/img/infinity.jpg",
    alt: "Poster Avengers Infinity War",
  },
];

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

const jumlahProyek = 0;
const lokasiProfil = profil.alamat?.kota ?? "Belum diisi";
const bioProfil = profil.bio ?? "Saya sedang mengembangkan beberapa proyek.";

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(`Lokasi profil: ${lokasiProfil}`);
console.log(`Bio: ${bioProfil}`);

console.table(profil);
console.table(profil.keahlian);
console.table(daftarFilm);

const filmRatingTinggi = daftarFilm.filter((film) => film.rating >= 8);
const filmFavorit = daftarFilm.find(
  (film) => film.judul === "Avengers Endgame",
);
console.table(filmRatingTinggi);
console.log(filmFavorit);

async function muatProyek() {
  const { ambilProyek } = await import("./api.js");
  const { render, tampilkanGalat, aturMemuat } = await import("./dom.js");
  aturMemuat(true);
  try {
    const data = await ambilProyek();
    render(data);
  } catch (galat) {
    tampilkanGalat("Data proyek gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

muatProyek();
