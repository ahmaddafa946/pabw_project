<script setup>
import { reactive } from 'vue';
import {
  state,
  tambahFilm,
  aturPesanForm,
} from '../state.js';

const formulir = reactive({
  judul: '',
  tahun: '',
  rating: '',
});

const galat = reactive({
  judul: '',
  tahun: '',
  rating: '',
});

function validasi() {
  galat.judul = formulir.judul.trim()
    ? ''
    : 'Judul film wajib diisi.';

  const tahun = Number(formulir.tahun);
  galat.tahun =
    Number.isInteger(tahun) && tahun >= 1888 && tahun <= 2026
      ? ''
      : 'Masukkan tahun rilis antara 1888 sampai 2026.';

  const rating = Number(formulir.rating);
  galat.rating =
    formulir.rating !== '' &&
    Number.isFinite(rating) &&
    rating >= 0 &&
    rating <= 10
      ? ''
      : 'Rating harus berada antara 0 sampai 10.';

  return !galat.judul && !galat.tahun && !galat.rating;
}

function simpanFilm() {
  state.pengirimanDicoba = true;
  aturPesanForm('');

  if (!validasi()) return;

  tambahFilm({
    judul: formulir.judul.trim(),
    tahun: Number(formulir.tahun),
    rating: Number(formulir.rating),
  });

  formulir.judul = '';
  formulir.tahun = '';
  formulir.rating = '';

  galat.judul = '';
  galat.tahun = '';
  galat.rating = '';

  state.pengirimanDicoba = false;
}

function periksaInput() {
  aturPesanForm('');

  if (state.pengirimanDicoba) {
    validasi();
  }
}
</script>

<template>
  <section id="tambah-film">
    <h2>Tambah Film</h2>

    <div class="katalog">
      <div class="kartu">
        <div class="kartu__isi">
          <form id="form-film" novalidate @submit.prevent="simpanFilm">
            <div class="form-kolom">
              <label for="judul-kolom">Judul</label>

              <input
                id="judul-kolom"
                v-model="formulir.judul"
                name="judul-kolom"
                type="text"
                required
                :aria-invalid="String(Boolean(galat.judul))"
                aria-describedby="galat-judul"
                @input="periksaInput"
              >

              <span
                id="galat-judul"
                class="pesan-galat"
                :class="{ terlihat: Boolean(galat.judul) }"
              >
                {{ galat.judul }}
              </span>
            </div>

            <div class="form-kolom">
              <label for="tahun-kolom">Tahun Rilis</label>

              <input
                id="tahun-kolom"
                v-model="formulir.tahun"
                name="tahun-kolom"
                type="number"
                min="1888"
                max="2026"
                step="1"
                required
                :aria-invalid="String(Boolean(galat.tahun))"
                aria-describedby="galat-tahun"
                @input="periksaInput"
              >

              <span
                id="galat-tahun"
                class="pesan-galat"
                :class="{ terlihat: Boolean(galat.tahun) }"
              >
                {{ galat.tahun }}
              </span>
            </div>

            <div class="form-kolom">
              <label for="rating-kolom">Rating</label>

              <input
                id="rating-kolom"
                v-model="formulir.rating"
                name="rating-kolom"
                type="number"
                min="0"
                max="10"
                step="0.1"
                required
                :aria-invalid="String(Boolean(galat.rating))"
                aria-describedby="galat-rating"
                @input="periksaInput"
              >

              <span
                id="galat-rating"
                class="pesan-galat"
                :class="{ terlihat: Boolean(galat.rating) }"
              >
                {{ galat.rating }}
              </span>
            </div>

            <button type="submit">Simpan</button>

            <p
              id="pesan-form"
              class="pesan-form"
              role="status"
              aria-live="polite"
              v-if="state.pesanForm"
            >
              {{ state.pesanForm }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
