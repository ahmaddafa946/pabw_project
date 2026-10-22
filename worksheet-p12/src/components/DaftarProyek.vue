<script setup>
import { computed } from 'vue';
import { bioProfil, saring } from '../data.js';
import { state, tambahFavorit } from '../state.js';

const proyekTampil = computed(() =>
  saring(state.daftarProyek, state.kategoriAktif)
);
</script>

<template>
  <p id="ringkasan-proyek">{{ bioProfil }}</p>

  <p v-if="state.sedangMemuat" role="status">
    Memuat data proyek...
  </p>

  <p v-if="state.galatProyek" role="alert">
    {{ state.galatProyek }}
  </p>

  <p
    v-if="
      !state.sedangMemuat &&
      !state.galatProyek &&
      proyekTampil.length === 0
    "
    id="kosong-proyek"
  >
    Tidak ada proyek pada kategori ini.
  </p>

  <div class="galeri grid" id="daftar-proyek">
    <article
      v-for="proyek in proyekTampil"
      :key="proyek.id"
      class="kartu"
    >
      <div class="kartu__isi">
        <h3>{{ proyek.judul }}</h3>
        <p>{{ proyek.deskripsi }}</p>
      </div>

      <div class="kartu__kaki">
        <p>Tahun: {{ proyek.tahun }}</p>
        <p>
          Status: {{ proyek.selesai ? 'Selesai' : 'Proses' }}
        </p>

        <button
          type="button"
          class="favorit"
          :aria-pressed="String(state.favorit.includes(proyek.id))"
          :aria-label="
            (state.favorit.includes(proyek.id)
              ? 'Sudah menjadi favorit: '
              : 'Tambahkan ke favorit: ') + proyek.judul
          "
          @click="tambahFavorit(proyek.id)"
        >
          {{ state.favorit.includes(proyek.id) ? '★' : '☆' }}
        </button>
      </div>
    </article>
  </div>
</template>
