import { daftarFilmAwal } from "./data.js";
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;
const KATEGORI_PROYEK = ["semua", "web", "mobile"];
const KATEGORI_FILM = ["semua", "tinggi", "rendah", "tanpa-rating"];

export const state = {
  daftarProyek: [],
  daftarFilm: daftarFilmAwal.map((film) => ({ ...film })),
  kategoriAktif: "semua",
  kategoriFilmAktif: "semua",
  favorit: [],
  pesanForm: "",
  pengirimanDicoba: false,
};

function hapusSimpanan() {
  try {
    localStorage.removeItem(KUNCI);
  } catch {
    // Penyimpanan mungkin dinonaktifkan oleh kebijakan peramban.
  }
}

export function simpan(stateAplikasi = state) {
  // Hanya pilihan tampilan yang disimpan, bukan data proyek, profil, atau input form.
  const isi = {
    versi: VERSI,
    kategoriAktif: stateAplikasi.kategoriAktif,
    favorit: stateAplikasi.favorit,
  };

  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch {
    // Halaman tetap dapat digunakan saat localStorage tidak tersedia atau penuh.
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
      isi.favorit.every((id) => Number.isInteger(id) && id > 0);

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
    ? [...new Set(isi.favorit.filter((id) => Number.isInteger(id) && id > 0))]
    : [];
}

export function isiProyek(daftar) {
  state.daftarProyek = Array.isArray(daftar) ? daftar : [];
  render(state);
}

export function pilihKategori(nilai) {
  if (!KATEGORI_PROYEK.includes(nilai)) return;
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function pilihKategoriFilm(nilai) {
  if (!KATEGORI_FILM.includes(nilai)) return;
  state.kategoriFilmAktif = nilai;
  render(state);
}

export function tambahFavorit(id) {
  if (!state.daftarProyek.some((proyek) => proyek.id === id)) return;
  if (state.favorit.includes(id)) return;

  state.favorit = [...state.favorit, id];
  simpan(state);
  render(state);
}

export function tambahFilm(film) {
  state.daftarFilm = [...state.daftarFilm, film];
  state.pengirimanDicoba = false;
  state.pesanForm = film.judul + " berhasil ditambahkan ke daftar film.";
  render(state);
}

export function aturPesanForm(pesan) {
  state.pesanForm = pesan;
  render(state);
}

export function mulaiValidasi() {
  state.pengirimanDicoba = true;
  render(state);
}

export function aturUlang() {
  hapusSimpanan();
  state.kategoriAktif = "semua";
  state.kategoriFilmAktif = "semua";
  state.favorit = [];
  render(state);
}
