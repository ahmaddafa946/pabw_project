

const jumlahProyek = daftarProyek.length;
const lokasiProfil = profil.alamat?.kota ?? "Belum diisi";
const bioProfil = profil.bio ?? `Saya sudah membuat ${jumlahProyek} proyek.`;

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(`Lokasi profil: ${lokasiProfil}`);
console.log(`Bio: ${bioProfil}`);

console.table(profil);
console.table(profil.keahlian);
console.table(daftarProyek);
console.table(daftarFilm);

const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai === true);
console.log(`Jumlah proyek selesai: ${proyekSelesai.length}`);
console.table(proyekSelesai);

const proyekKosManage = daftarProyek.find(
  (proyek) => proyek.judul === "KosManage Web",
);
console.log(proyekKosManage);

const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.log(judulProyek);

const proyekTerbaru = [...daftarProyek].sort(
  (a, b) => b.tahun - a.tahun,
);
console.table(proyekTerbaru);
console.table(daftarProyek);

const filmRatingTinggi = daftarFilm.filter((film) => film.rating >= 8);
const filmFavorit = daftarFilm.find(
  (film) => film.judul === "Avengers Endgame",
);
console.table(filmRatingTinggi);
console.log(filmFavorit);