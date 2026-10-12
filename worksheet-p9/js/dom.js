import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar-proyek");
const barisFilter = document.querySelector("#filter");
const kosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-film");
const judulInput = document.querySelector("#judul-kolom");
const tahunInput = document.querySelector("#tahun-kolom");
const ratingInput = document.querySelector("#rating-kolom");
const daftarFilmWadah = document.querySelector("#daftar-film");
const pesanForm = document.querySelector("#pesan-form");
const tombolKirim = form.querySelector('button[type="submit"]');

console.log("Wadah proyek:", wadah);
console.log("Baris filter:", barisFilter);
console.log("Pesan kosong:", kosong);
console.log("Form film:", form);
console.log("Input judul:", judulInput);
console.log("Input tahun:", tahunInput);
console.log("Input rating:", ratingInput);

const kolomForm = [
  {
    input: judulInput,
    pesan: document.querySelector("#galat-judul"),
  },
  {
    input: tahunInput,
    pesan: document.querySelector("#galat-tahun"),
  },
  {
    input: ratingInput,
    pesan: document.querySelector("#galat-rating"),
  },
];

let pengirimanDicoba = false;

function buatKartu(proyek) {
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
  tahun.textContent = `Tahun: ${proyek.tahun}`;

  const status = document.createElement("p");
  status.textContent = proyek.selesai ? "Status: Selesai" : "Status: Proses";

  kaki.append(tahun, status);
  isi.append(judul, deskripsi);
  kartu.append(isi, kaki);

  return kartu;
}

function render(daftar) {
  wadah.textContent = "";

  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }

  kosong.hidden = true;
  const fragment = document.createDocumentFragment();
  daftar.map((proyek) => buatKartu(proyek)).forEach((kartu) => fragment.append(kartu));
  wadah.append(fragment);
}

function tandaiTombolAktif(tombolAktif) {
  Array.from(barisFilter.querySelectorAll("button")).forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

function pilihProyek(kategori) {
  return daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori,
  );
}

barisFilter.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const tombol = event.target.closest("button[data-kategori]");
  if (!tombol || !barisFilter.contains(tombol)) return;

  const kategori = tombol.dataset.kategori;
  render(pilihProyek(kategori));
  tandaiTombolAktif(tombol);
});

function validasiKolom(kolom) {
  const valid = kolom.input.value.trim() !== "" && kolom.input.checkValidity();
  kolom.pesan.classList.toggle("terlihat", !valid);
  kolom.input.setAttribute("aria-invalid", String(!valid));
  return valid;
}

function validasiSemuaKolom() {
  return kolomForm.map((kolom) => validasiKolom(kolom)).every(Boolean);
}

function buatKartuFilm(film) {
  const kartu = document.createElement("article");
  kartu.className = "kartu";

  const isi = document.createElement("div");
  isi.className = "kartu__isi";

  const judul = document.createElement("h3");
  judul.className = "kartu__judul";
  judul.textContent = film.judul;

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";

  const tahun = document.createElement("p");
  tahun.textContent = `Tahun Rilis: ${film.tahun}`;

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${film.rating}`;

  isi.append(judul);
  kaki.append(tahun, rating);
  kartu.append(isi, kaki);

  return kartu;
}

form.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLInputElement)) return;

  const kolom = kolomForm.find((item) => item.input === event.target);
  if (!kolom) return;

  validasiKolom(kolom);
  pesanForm.hidden = true;

  if (pengirimanDicoba) {
    const semuaValid = kolomForm.every(
      ({ input }) => input.value.trim() !== "" && input.checkValidity(),
    );
    tombolKirim.disabled = !semuaValid;
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  pengirimanDicoba = true;

  if (!validasiSemuaKolom()) {
    tombolKirim.disabled = true;
    kolomForm.find(({ input }) => input.getAttribute("aria-invalid") === "true").input.focus();
    return;
  }

  const film = {
    judul: judulInput.value.trim(),
    tahun: Number(tahunInput.value),
    rating: Number(ratingInput.value),
  };

  daftarFilmWadah.append(buatKartuFilm(film));
  form.reset();

  kolomForm.forEach(({ input, pesan }) => {
    input.setAttribute("aria-invalid", "false");
    pesan.classList.remove("terlihat");
  });

  pengirimanDicoba = false;
  tombolKirim.disabled = false;
  pesanForm.textContent = `${film.judul} berhasil ditambahkan ke daftar film.`;
  pesanForm.hidden = false;
});

render(daftarProyek);
tandaiTombolAktif(barisFilter.querySelector('button[data-kategori="semua"]'));
