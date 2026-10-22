import {
  bioProfil,
  buatPerkenalan,
  formatKeahlian,
  profil,
  saring,
  saringFilm,
} from "./data.js";

const judulHalaman = document.querySelector("#judul-halaman");
const judulTampilan = document.querySelector("#judul-halaman-tampilan");
const profilPerkenalan = document.querySelector("#profil-perkenalan");
const profilNim = document.querySelector("#profil-nim");
const profilTahun = document.querySelector("#profil-tahun");
const profilLokasi = document.querySelector("#profil-lokasi");
const profilKeahlian = document.querySelector("#profil-keahlian");
const ringkasanProyek = document.querySelector("#ringkasan-proyek");
const wadahProyek = document.querySelector("#daftar-proyek");
const muatProyek = document.querySelector("#muat-proyek");
const kosongProyek = document.querySelector("#kosong-proyek");
const galatProyek = document.querySelector("#galat-proyek");
const filterProyek = document.querySelector("#filter-proyek");
const filterFilm = document.querySelector("#filter");
const kosongFilm = document.querySelector("#pesan-kosong");
const wadahFilm = document.querySelector("#daftar-film");
const formFilm = document.querySelector("#form-film");
const judulInput = document.querySelector("#judul-kolom");
const tahunInput = document.querySelector("#tahun-kolom");
const ratingInput = document.querySelector("#rating-kolom");
const pesanForm = document.querySelector("#pesan-form");
const tombolKirim = formFilm.querySelector('button[type="submit"]');
const tombolAturUlang = document.querySelector("#atur-ulang");
const footerNama = document.querySelector("#footer-nama");
const footerNim = document.querySelector("#footer-nim");
const footerTahun = document.querySelector("#footer-tahun");

const kolomForm = [
  { input: judulInput, pesan: document.querySelector("#galat-judul") },
  { input: tahunInput, pesan: document.querySelector("#galat-tahun") },
  { input: ratingInput, pesan: document.querySelector("#galat-rating") },
];

function buatKartuProyek(proyek, favorit) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const isi = document.createElement("div");
  isi.className = "kartu__isi";

  const judul = document.createElement("h3");
  judul.textContent = proyek.judul;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = proyek.deskripsi;

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";

  const tahun = document.createElement("p");
  tahun.textContent = "Tahun: " + proyek.tahun;

  const status = document.createElement("p");
  status.textContent = proyek.selesai ? "Status: Selesai" : "Status: Proses";

  const tombolFavorit = document.createElement("button");
  const disukai = favorit.includes(proyek.id);
  tombolFavorit.type = "button";
  tombolFavorit.className = "favorit";
  tombolFavorit.dataset.id = String(proyek.id);
  tombolFavorit.textContent = disukai ? "★" : "☆";
  tombolFavorit.setAttribute("aria-pressed", String(disukai));
  tombolFavorit.setAttribute(
    "aria-label",
    (disukai ? "Sudah menjadi favorit: " : "Tambahkan ke favorit: ") + proyek.judul,
  );

  isi.append(judul, deskripsi);
  kaki.append(tahun, status, tombolFavorit);
  kartu.append(isi, kaki);
  return kartu;
}

function buatKartuFilm(film) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const isi = document.createElement("div");
  isi.className = "kartu__isi";

  if (film.gambar) {
    const figure = document.createElement("figure");
    const gambar = document.createElement("img");
    gambar.src = film.gambar;
    gambar.alt = film.alt ?? "Poster " + film.judul;
    gambar.width = 640;
    gambar.height = 980;
    gambar.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.className = "kartu__judul";
    caption.textContent = film.judul;
    figure.append(gambar, caption);
    isi.append(figure);
  } else {
    const judul = document.createElement("h3");
    judul.className = "kartu__judul";
    judul.textContent = film.judul;
    isi.append(judul);
  }

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";

  const tahun = document.createElement("p");
  tahun.textContent = "Tahun Rilis: " + film.tahun;

  const rating = document.createElement("p");
  rating.textContent =
    film.rating == null ? "Rating: Belum ada" : "Rating: " + film.rating;

  kaki.append(tahun, rating);
  kartu.append(isi, kaki);
  return kartu;
}

function tandaiTombolAktif(wadah, kategoriAktif) {
  wadah.querySelectorAll("button[data-kategori]").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

export function render(state) {
  // Profil, daftar proyek, filter, dan daftar film selalu digambar dari state.
  judulHalaman.textContent = "Profil " + profil.nama;
  judulTampilan.textContent = "Playlist Film Favorit — " + profil.nama;
  profilPerkenalan.textContent = buatPerkenalan(profil);
  profilNim.textContent = "NIM: " + profil.nim;
  profilTahun.textContent = "Tahun: " + profil.tahun;
  profilLokasi.textContent = "Kota: " + (profil.alamat?.kota ?? profil.alamat ?? "Belum diisi");
  profilKeahlian.textContent = "Keahlian: " + formatKeahlian(profil.keahlian);
  ringkasanProyek.textContent = bioProfil;
  footerNama.textContent = profil.nama;
  footerNim.textContent = profil.nim;
  footerTahun.textContent = profil.tahun;

  wadahProyek.replaceChildren();
  const proyekTampil = saring(state.daftarProyek, state.kategoriAktif);
  kosongProyek.hidden = proyekTampil.length !== 0;
  const kartuProyek = document.createDocumentFragment();
  proyekTampil.forEach((proyek) => {
    kartuProyek.append(buatKartuProyek(proyek, state.favorit));
  });
  wadahProyek.append(kartuProyek);
  tandaiTombolAktif(filterProyek, state.kategoriAktif);

  wadahFilm.replaceChildren();
  const filmTampil = saringFilm(state.daftarFilm, state.kategoriFilmAktif);
  kosongFilm.hidden = filmTampil.length !== 0;
  const kartuFilm = document.createDocumentFragment();
  filmTampil.forEach((film) => kartuFilm.append(buatKartuFilm(film)));
  wadahFilm.append(kartuFilm);
  tandaiTombolAktif(filterFilm, state.kategoriFilmAktif);

  pesanForm.textContent = state.pesanForm;
  pesanForm.hidden = state.pesanForm === "";
}

export function aturMemuat(aktif) {
  muatProyek.hidden = !aktif;
  if (aktif) {
    galatProyek.hidden = true;
    kosongProyek.hidden = true;
  }
}

export function tampilkanGalat(pesan) {
  galatProyek.textContent = pesan;
  galatProyek.hidden = false;
  kosongProyek.hidden = true;
}

export function cariKolom(input) {
  return kolomForm.find((kolom) => kolom.input === input) ?? null;
}

export function validasiKolom(input) {
  const kolom = cariKolom(input);
  if (!kolom) return false;

  const valid = input.value.trim() !== "" && input.checkValidity();
  kolom.pesan.classList.toggle("terlihat", !valid);
  input.setAttribute("aria-invalid", String(!valid));
  return valid;
}

export function validasiSemuaKolom() {
  return kolomForm.map(({ input }) => validasiKolom(input)).every(Boolean);
}

export function fokusKolomInvalid() {
  kolomForm.find(({ input }) => input.getAttribute("aria-invalid") === "true")?.input.focus();
}

export function filmDariForm() {
  return {
    judul: judulInput.value.trim(),
    tahun: Number(tahunInput.value),
    rating: Number(ratingInput.value),
  };
}

export function resetForm() {
  formFilm.reset();
  kolomForm.forEach(({ input, pesan }) => {
    input.setAttribute("aria-invalid", "false");
    pesan.classList.remove("terlihat");
  });
  tombolKirim.disabled = false;
}

export function aturTombolKirim(nonaktif) {
  tombolKirim.disabled = nonaktif;
}

export {
  filterFilm,
  filterProyek,
  formFilm,
  tombolAturUlang,
  wadahProyek,
};
