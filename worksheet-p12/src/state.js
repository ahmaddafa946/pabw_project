import { reactive } from "vue";
import { daftarFilmAwal } from "./data.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

const KATEGORI_PROYEK = ["semua", "web", "mobile"];
const KATEGORI_FILM = ["semua", "tinggi", "rendah", "tanpa-rating"];

export const state = reactive({
  daftarProyek: [],
  daftarFilm: daftarFilmAwal.map((film, index) => ({
    ...film,
    id: index + 1,
  })),
  kategoriAktif: "semua",
  kategoriFilmAktif: "semua",
  favorit: [],
  pesanForm: "",
  pengirimanDicoba: false,
  sedangMemuat: true,
  galatProyek: "",
});

function hapusSimpanan() {
  try {
    localStorage.removeItem(KUNCI);
  } catch {
    // Aplikasi tetap berjalan jika penyimpanan tidak tersedia.
  }
}

export function simpan(stateAplikasi = state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: stateAplikasi.kategoriAktif,
    favorit: stateAplikasi.favorit,
  };

  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch {
    // Aplikasi tetap berjalan jika penyimpanan tidak tersedia.
  }
}

export function muat() {
  try {
    const teks = localStorage.getItem(KUNCI);
    if (teks === null) return null;

    const isi = JSON.parse(teks);
    const bentukValid =
      isi !== null &&
      typeof isi === "object" &&
      isi.versi === VERSI &&
      KATEGORI_PROYEK.includes(isi.kategoriAktif) &&
      Array.isArray(isi.favorit) &&
      isi.favorit.every(
        (id) => Number.isInteger(id) && id > 0
      );

    if (!bentukValid) {
      hapusSimpanan();
      return null;
    }

    return isi;
  } catch {
    hapusSimpanan();
    return null;
  }
}

export function pulihkan(isi) {
  if (!isi || isi.versi !== VERSI) return;

  state.kategoriAktif = KATEGORI_PROYEK.includes(isi.kategoriAktif)
    ? isi.kategoriAktif
    : "semua";

  state.favorit = Array.isArray(isi.favorit)
    ? [...new Set(isi.favorit.filter(
        (id) => Number.isInteger(id) && id > 0
      ))]
    : [];
}

export function isiProyek(daftar) {
  state.daftarProyek = Array.isArray(daftar) ? daftar : [];

  state.favorit = state.favorit.filter(
    (id) => state.daftarProyek.some((proyek) => proyek.id === id)
  );

  state.sedangMemuat = false;
  state.galatProyek = "";
}

export function pilihKategori(nilai) {
  if (!KATEGORI_PROYEK.includes(nilai)) return;

  state.kategoriAktif = nilai;
}

export function pilihKategoriFilm(nilai) {
  if (!KATEGORI_FILM.includes(nilai)) return;

  state.kategoriFilmAktif = nilai;
}

export function tambahFavorit(id) {
  if (!state.daftarProyek.some((proyek) => proyek.id === id)) return;
  if (state.favorit.includes(id)) return;

  state.favorit = [...state.favorit, id];
}

export function aturUlang() {
  hapusSimpanan();
  state.kategoriAktif = "semua";
  state.kategoriFilmAktif = "semua";
  state.favorit = [];
}

export function tambahFilm(film) {
  state.daftarFilm = [
    ...state.daftarFilm,
    { ...film, id: film.id ?? Date.now() },
  ];

  state.pengirimanDicoba = false;
  state.pesanForm = film.judul + " berhasil ditambahkan ke daftar film.";
}

export function aturPesanForm(pesan) {
  state.pesanForm = pesan;
}

export function mulaiValidasi() {
  state.pengirimanDicoba = true;
}

export function aturMemuat(aktif) {
  state.sedangMemuat = Boolean(aktif);
}

export function tampilkanGalat(pesan) {
  state.galatProyek = pesan;
}
