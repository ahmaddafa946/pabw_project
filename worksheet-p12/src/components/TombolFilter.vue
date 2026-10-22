<script setup>
import {
  state,
  pilihKategori,
  aturUlang,
} from '../state.js';
</script>

<template>
  <div>
    <div
      class="baris-filter"
      id="filter-proyek"
      aria-label="Filter kategori proyek"
    >
      <button
        type="button"
        :class="{ aktif: state.kategoriAktif === 'semua' }"
        :aria-pressed="String(state.kategoriAktif === 'semua')"
        @click="pilihKategori('semua')"
      >
        Semua Proyek
      </button>

      <button
        type="button"
        :class="{ aktif: state.kategoriAktif === 'web' }"
        :aria-pressed="String(state.kategoriAktif === 'web')"
        @click="pilihKategori('web')"
      >
        Web
      </button>

      <button
        type="button"
        :class="{ aktif: state.kategoriAktif === 'mobile' }"
        :aria-pressed="String(state.kategoriAktif === 'mobile')"
        @click="pilihKategori('mobile')"
      >
        Mobile
      </button>
    </div>

    <button type="button" id="atur-ulang" @click="aturUlang">
      Atur ulang pilihan
    </button>
  </div>
</template>
