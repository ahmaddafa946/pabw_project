import {
  aturPesanForm,
  aturUlang,
  mulaiValidasi,
  pilihKategori,
  pilihKategoriFilm,
  state,
  tambahFilm,
  tambahFavorit,
} from "./state.js";
import {
  aturTombolKirim,
  cariKolom,
  filmDariForm,
  filterFilm,
  filterProyek,
  fokusKolomInvalid,
  formFilm,
  resetForm,
  validasiKolom,
  validasiSemuaKolom,
  wadahProyek,
  tombolAturUlang,
} from "./dom.js";

export function pasangPendengar() {
  filterProyek.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const tombol = event.target.closest("button[data-kategori]");
    if (!tombol || !filterProyek.contains(tombol)) return;
    pilihKategori(tombol.dataset.kategori);
  });

  filterFilm.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const tombol = event.target.closest("button[data-kategori]");
    if (!tombol || !filterFilm.contains(tombol)) return;
    pilihKategoriFilm(tombol.dataset.kategori);
  });

  wadahProyek.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const tombol = event.target.closest("button.favorit");
    if (!tombol || !wadahProyek.contains(tombol)) return;

    const id = Number(tombol.dataset.id);
    if (Number.isInteger(id)) tambahFavorit(id);
  });

  tombolAturUlang.addEventListener("click", () => {
    aturUlang();
  });

  formFilm.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    if (!cariKolom(event.target)) return;

    aturPesanForm("");
    validasiKolom(event.target);

    if (state.pengirimanDicoba) {
      aturTombolKirim(!validasiSemuaKolom());
    }
  });

  formFilm.addEventListener("submit", (event) => {
    event.preventDefault();
    mulaiValidasi();

    if (!validasiSemuaKolom()) {
      aturTombolKirim(true);
      fokusKolomInvalid();
      return;
    }

    const filmBaru = filmDariForm();
    resetForm();
    tambahFilm(filmBaru);
  });
}
