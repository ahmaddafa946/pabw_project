import { ambilProyek } from "./api.js";
import { isiProyek, muat, pulihkan, state } from "./state.js";
import { aturMemuat, render, tampilkanGalat } from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  pulihkan(muat());
  pasangPendengar();
  render(state);
  aturMemuat(true);

  try {
    isiProyek(await ambilProyek());
  } catch (galat) {
    tampilkanGalat("Data proyek gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
}

mulai();
