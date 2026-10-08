const profil = {
  nama: "Ahmad Dafa Ardevanda",
  peran: "Mahasiswa Informatika yang belajar front-end",
  nim: "25523179",
  tahun: 2026,
  alamat: "Sleman, Sardonoharjo", 
  keahlian: ["HTML", "CSS", "JavaScript", "Responsive Design"],
};

const daftarProyek = [
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
    deskripsi: "Aplikasi mobile pendamping untuk pengelolaan kos.",
  },
  {
    judul: "Profil Responsif PABW",
    tahun: 2026,
    selesai: true,
    deskripsi: "Halaman profil responsif dengan HTML dan CSS modern.",
  },
];

const jumlahProyek = daftarProyek.length;
let filterAktif = "semua";

const daftarFilm = [
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
if (proyekSelesai.length === jumlahProyek && jumlahProyek > 0) {
  filterAktif = "selesai";
}
console.log(`Filter aktif: ${filterAktif}`);
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

if (typeof document !== "undefined") {
  const el = {
    judulHalaman: document.querySelector("#judul-halaman"),
    judulTampilan: document.querySelector("#judul-halaman-tampilan"),
    profilPerkenalan: document.querySelector("#profil-perkenalan"),
    profilNim: document.querySelector("#profil-nim"),
    profilTahun: document.querySelector("#profil-tahun"),
    profilLokasi: document.querySelector("#profil-lokasi"),
    profilKeahlian: document.querySelector("#profil-keahlian"),
    daftarProyek: document.querySelector("#daftar-proyek"),
    daftarFilm: document.querySelector("#daftar-film"),
    footerNama: document.querySelector("#footer-nama"),
    footerNim: document.querySelector("#footer-nim"),
    footerTahun: document.querySelector("#footer-tahun"),
  };

  el.judulHalaman.textContent = `Profil ${profil.nama}`;
  el.judulTampilan.textContent = `Playlist Film Favorit — ${profil.nama}`;
  el.profilPerkenalan.textContent = buatPerkenalan(profil);
  el.profilNim.textContent = `NIM: ${profil.nim}`;
  el.profilTahun.textContent = `Tahun: ${profil.tahun}`;
  el.profilLokasi.textContent = `Kota: ${lokasiProfil}`;
  el.profilKeahlian.textContent = `Keahlian: ${formatKeahlian(profil.keahlian)}`;

  daftarProyek.forEach((proyek) => {
    const article = document.createElement("article");
    article.className = "kartu";

    const isi = document.createElement("div");
    isi.className = "kartu__isi";

    const judul = document.createElement("h3");
    judul.textContent = proyek.judul;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = proyek.deskripsi;

    const kaki = document.createElement("div");
    kaki.className = "kartu__kaki";

    const tahun = document.createElement("p");
    tahun.textContent = `Tahun: ${proyek.tahun}`;

    const status = document.createElement("p");
    status.textContent = proyek.selesai ? "Status: Selesai" : "Status: Proses";

    kaki.append(tahun, status);
    isi.append(judul, deskripsi);
    article.append(isi, kaki);
    el.daftarProyek.append(article);
  });

  daftarFilm.forEach((film) => {
    const article = document.createElement("article");
    article.className = "kartu";

    const isi = document.createElement("div");
    isi.className = "kartu__isi";

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = film.gambar;
    image.alt = film.alt;
    image.width = 640;
    image.height = 980;
    image.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.className = "kartu__judul";
    caption.textContent = film.judul;

    figure.append(image, caption);
    isi.append(figure);

    const kaki = document.createElement("div");
    kaki.className = "kartu__kaki";

    const tahun = document.createElement("p");
    tahun.textContent = `Tahun Rilis: ${film.tahun}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${film.rating}`;

    kaki.append(tahun, rating);
    article.append(isi, kaki);
    el.daftarFilm.append(article);
  });

  el.footerNama.textContent = profil.nama;
  el.footerNim.textContent = profil.nim;
  el.footerTahun.textContent = profil.tahun;
}
