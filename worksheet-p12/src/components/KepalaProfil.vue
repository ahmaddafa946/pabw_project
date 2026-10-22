<script setup>
const props = defineProps({
  profil: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section id="profil">
    <h2>Profil Saya</h2>

    <div class="kartu">
      <div class="kartu__isi">
        <p>{{ props.profil.nama }} — {{ props.profil.peran }}</p>
        <p>NIM: {{ props.profil.nim }}</p>
        <p>Tahun: {{ props.profil.tahun }}</p>
        <p>
          Kota:
          {{
            typeof props.profil.alamat === 'string'
              ? props.profil.alamat
              : (props.profil.alamat?.kota ?? 'Belum diisi')
          }}
        </p>
        <p>Keahlian: {{ props.profil.keahlian.join(' · ') }}</p>
      </div>
    </div>
  </section>
</template>
