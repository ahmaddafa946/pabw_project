<script setup>
import { computed, onMounted } from 'vue';

import { profil, saringFilm } from './data.js';
import { ambilProyek } from './api.js';

import {
  state,
  muat,
  pulihkan,
  isiProyek,
  aturMemuat,
  tampilkanGalat,
  pilihKategoriFilm,
} from './state.js';

import KepalaProfil from './components/KepalaProfil.vue';
import TombolFilter from './components/TombolFilter.vue';
import DaftarProyek from './components/DaftarProyek.vue';
import FormKontak from './components/FormKontak.vue';

const filmTampil = computed(() =>
  saringFilm(state.daftarFilm, state.kategoriFilmAktif)
);

onMounted(async () => {
  document.title = 'Profil ' + profil.nama;

  pulihkan(muat());
  aturMemuat(true);

  try {
    const daftar = await ambilProyek();
    isiProyek(daftar);
  } catch (galat) {
    tampilkanGalat(
      'Data proyek gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    );
    console.error(galat.message);
  } finally {
    aturMemuat(false);
  }
});
</script>

<template>
  <div class="page">
    <header>
      <input
        type="checkbox"
        id="tema"
        class="pengalih-tema"
      >

      <label for="tema" class="tombol-tema">
        Tema gelap
      </label>

      <div class="header-baris">
        <h1 id="judul-halaman-tampilan">
          Playlist Film Favorit — {{ profil.nama }}
        </h1>

        <nav class="navbar" aria-label="Navigasi halaman">
          <ul>
            <li><a href="#profil">Profil</a></li>
            <li><a href="#list-proyek">Proyek</a></li>
            <li><a href="#list-film">List Film</a></li>
            <li><a href="#tambah-film">Tambah Film</a></li>
            <li><a href="#footer">Tentang Saya</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="isi content">
      <KepalaProfil :profil="profil" />

      <section id="list-proyek">
        <h2>Proyek Saya</h2>

        <TombolFilter />

        <DaftarProyek />
      </section>

      <section id="list-film">
        <h2>List Film Favorit</h2>

        <div
          class="baris-filter"
          id="filter"
          aria-label="Filter daftar film"
        >
          <button
            type="button"
            :class="{ aktif: state.kategoriFilmAktif === 'semua' }"
            :aria-pressed="String(state.kategoriFilmAktif === 'semua')"
            @click="pilihKategoriFilm('semua')"
          >
            Semua Film
          </button>

          <button
            type="button"
            :class="{ aktif: state.kategoriFilmAktif === 'tinggi' }"
            :aria-pressed="String(state.kategoriFilmAktif === 'tinggi')"
            @click="pilihKategoriFilm('tinggi')"
          >
            Rating ≥ 8
          </button>

          <button
            type="button"
            :class="{ aktif: state.kategoriFilmAktif === 'rendah' }"
            :aria-pressed="String(state.kategoriFilmAktif === 'rendah')"
            @click="pilihKategoriFilm('rendah')"
          >
            Rating &lt; 8
          </button>

          <button
            type="button"
            :class="{ aktif: state.kategoriFilmAktif === 'tanpa-rating' }"
            :aria-pressed="String(state.kategoriFilmAktif === 'tanpa-rating')"
            @click="pilihKategoriFilm('tanpa-rating')"
          >
            Tanpa Rating
          </button>
        </div>

        <p
          v-if="filmTampil.length === 0"
          id="pesan-kosong"
        >
          Tidak ada film yang sesuai dengan filter.
        </p>

        <div class="galeri grid" id="daftar-film">
          <article
            v-for="film in filmTampil"
            :key="film.id"
            class="kartu"
          >
            <div class="kartu__isi">
              <figure v-if="film.gambar">
                <img
                  :src="film.gambar"
                  :alt="film.alt || ('Poster ' + film.judul)"
                  width="640"
                  height="980"
                  loading="lazy"
                >

                <figcaption class="kartu__judul">
                  {{ film.judul }}
                </figcaption>
              </figure>

              <h3
                v-else
                class="kartu__judul"
              >
                {{ film.judul }}
              </h3>
            </div>

            <div class="kartu__kaki">
              <p>Tahun Rilis: {{ film.tahun }}</p>

              <p>
                Rating:
                {{ film.rating == null ? 'Belum ada' : film.rating }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <FormKontak />
    </main>

    <footer id="footer">
      <h3>Tentang Saya</h3>
      <p>Nama: <span>{{ profil.nama }}</span></p>
      <p>NIM: <span>{{ profil.nim }}</span></p>
      <p>Tahun: <span>{{ profil.tahun }}</span></p>
    </footer>
  </div>
</template>
