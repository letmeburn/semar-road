let map;
let markerLayer;
let heatLayer;
let currentMapMode = 'marker';
let laporanData = [];

const CONFIG = {
    mapCenter: [-6.9839, 110.4097],
    mapZoom: 13,
    updateInterval: 30000,
};

const FIXED_MARKERS_SEMARANG = [
    { lat: -6.9839, lng: 110.4097, color: 'red', name: 'Tugu Muda', intensity: 1.0 },
{ lat: -6.9900, lng: 110.4225, color: 'red', name: 'Simpang Lima', intensity: 1.0 },
{ lat: -7.0050, lng: 110.4380, color: 'red', name: 'Tembalang', intensity: 1.0 },
{ lat: -7.0247, lng: 110.4405, color: 'red', name: 'Undip', intensity: 1.0 },
{ lat: -6.9667, lng: 110.4200, color: 'red', name: 'Pelabuhan Tanjung Mas', intensity: 1.0 },
{ lat: -6.9750, lng: 110.3850, color: 'red', name: 'Bandara Ahmad Yani', intensity: 1.0 },
{ lat: -7.0500, lng: 110.4100, color: 'red', name: 'Banyumanik', intensity: 1.0 },
{ lat: -6.9980, lng: 110.4480, color: 'red', name: 'Pedurungan', intensity: 1.0 },
{ lat: -7.0300, lng: 110.3800, color: 'red', name: 'Gunungpati', intensity: 1.0 },
{ lat: -6.9700, lng: 110.4500, color: 'red', name: 'Genuk', intensity: 1.0 },
{ lat: -7.0100, lng: 110.4100, color: 'yellow', name: 'Candisari', intensity: 0.6 },
{ lat: -6.9920, lng: 110.4050, color: 'yellow', name: 'Pandanaran', intensity: 0.6 },
{ lat: -6.9780, lng: 110.4280, color: 'yellow', name: 'Kaligawe', intensity: 0.6 },
{ lat: -7.0000, lng: 110.3900, color: 'yellow', name: 'Gajah Mada', intensity: 0.6 },
{ lat: -6.9950, lng: 110.4350, color: 'yellow', name: 'Gayamsari', intensity: 0.6 },
{ lat: -7.0200, lng: 110.4200, color: 'yellow', name: 'Bukit Sari', intensity: 0.6 },
{ lat: -6.9850, lng: 110.3950, color: 'yellow', name: 'Pemuda', intensity: 0.6 },
{ lat: -7.0080, lng: 110.3800, color: 'yellow', name: 'Ngaliyan', intensity: 0.6 },
{ lat: -6.9600, lng: 110.4100, color: 'yellow', name: 'Terboyo', intensity: 0.6 },
{ lat: -7.0400, lng: 110.4300, color: 'yellow', name: 'Rowosari', intensity: 0.6 },
{ lat: -6.9880, lng: 110.4600, color: 'yellow', name: 'Muktiharjo', intensity: 0.6 },
{ lat: -7.0150, lng: 110.3650, color: 'yellow', name: 'Mijen', intensity: 0.6 },
{ lat: -6.9800, lng: 110.4150, color: 'green', name: 'Pasar Johar', intensity: 0.3 },
{ lat: -7.0050, lng: 110.3950, color: 'green', name: 'Setiabudi', intensity: 0.3 },
{ lat: -6.9950, lng: 110.4150, color: 'green', name: 'Imam Bonjol', intensity: 0.3 },
{ lat: -7.0120, lng: 110.4280, color: 'green', name: 'Jatingaleh', intensity: 0.3 },
{ lat: -6.9720, lng: 110.3980, color: 'green', name: 'Halmahera', intensity: 0.3 },
{ lat: -7.0350, lng: 110.4150, color: 'green', name: 'Bukit Kencana', intensity: 0.3 },
{ lat: -6.9680, lng: 110.4350, color: 'green', name: 'Bandarharjo', intensity: 0.3 },
{ lat: -7.0250, lng: 110.3900, color: 'green', name: 'Beringin', intensity: 0.3 }
];

const kecamatanData = [
    { nama: 'Semarang Tengah', total: 324, menunggu: 45, proses: 28, selesai: 251 },
{ nama: 'Semarang Utara', total: 298, menunggu: 38, proses: 22, selesai: 238 },
{ nama: 'Semarang Timur', total: 267, menunggu: 31, proses: 19, selesai: 217 },
{ nama: 'Gayamsari', total: 245, menunggu: 29, proses: 17, selesai: 199 },
{ nama: 'Genuk', total: 189, menunggu: 24, proses: 15, selesai: 150 },
{ nama: 'Semarang Selatan', total: 312, menunggu: 42, proses: 25, selesai: 245 },
{ nama: 'Candisari', total: 234, menunggu: 27, proses: 16, selesai: 191 },
{ nama: 'Pedurungan', total: 221, menunggu: 26, proses: 14, selesai: 181 },
{ nama: 'Tembalang', total: 276, menunggu: 34, proses: 20, selesai: 222 },
{ nama: 'Banyumanik', total: 289, menunggu: 36, proses: 21, selesai: 232 },
{ nama: 'Gunungpati', total: 198, menunggu: 23, proses: 13, selesai: 162 },
{ nama: 'Semarang Barat', total: 256, menunggu: 30, proses: 18, selesai: 208 },
{ nama: 'Mijen', total: 167, menunggu: 19, proses: 11, selesai: 137 },
{ nama: 'Ngaliyan', total: 203, menunggu: 25, proses: 14, selesai: 164 },
{ nama: 'Tugu', total: 142, menunggu: 16, proses: 9, selesai: 117 },
{ nama: 'Gajahmungkur', total: 183, menunggu: 21, proses: 12, selesai: 150 }
];

const dataLaporan = [
    {
        id: 1,
        judul: 'Tabrakan Beruntun 3 Motor',
        lokasi: 'Simpang Lima',
        kecamatan: 'Semarang Tengah',
        tanggal: '2026-06-03',
        waktu: '5 menit lalu',
        kategori: 'Kecelakaan',
        deskripsi: 'Tabrakan beruntun terjadi karena rem blong, melibatkan 3 sepeda motor. Ada korban luka ringan.',
        foto: '1.jpg',
        status: 'menunggu',
        pelapor: 'Ahmad Fauzi'
    },
{
    id: 2,
    judul: 'Kecelakaan Tunggal Motor',
    lokasi: 'Jl. Banjarsari',
    kecamatan: 'Banyumanik',
    tanggal: '2026-06-03',
    waktu: '12 menit lalu',
    kategori: 'Kecelakaan',
    deskripsi: 'Pengendara motor terpeleset karena oli tumpah di jalan, butuh pertolongan medis.',
    foto: '2.jpg',
    status: 'proses',
    pelapor: 'Rani Kartika'
},
{
    id: 3,
    judul: 'Truk Terguling di Tikungan',
    lokasi: 'Tol Semarang-Solo Km 12',
    kecamatan: 'Tembalang',
    tanggal: '2026-06-02',
    waktu: '18 menit lalu',
    kategori: 'Kecelakaan',
    deskripsi: 'Truk muatan pasir terguling di tikungan tajam, lalu lintas macet total.',
    foto: '3.jpg',
    status: 'selesai',
    pelapor: 'Rina Wijaya'
},
{
    id: 4,
    judul: 'Tabrakan Lawan Arah',
    lokasi: 'Turunan Gajahmungkur',
    kecamatan: 'Gajahmungkur',
    tanggal: '2026-06-02',
    waktu: '25 menit lalu',
    kategori: 'Kecelakaan',
    deskripsi: 'Ada motor ngebut berlawanan arah nabrak mobil. Macet panjang, butuh ambulan.',
    foto: '4.jpg',
    status: 'menunggu',
    pelapor: 'Budi Santoso'
},
{
    id: 5,
    judul: 'Bus Mogok di Tengah Jalan',
    lokasi: 'Jl. MT Haryono',
    kecamatan: 'Gayamsari',
    tanggal: '2026-06-01',
    waktu: '32 menit lalu',
    kategori: 'Kecelakaan',
    deskripsi: 'Bus Trans Semarang mogok mendadak di tengah jalan, menyebabkan kemacetan panjang.',
    foto: '5.jpg',
    status: 'proses',
    pelapor: 'Yoga Pratama'
},
{
    id: 6,
    judul: 'Pohon Tumbang Tutup Jalan',
    lokasi: 'Jl. Pandanaran Km 3',
    kecamatan: 'Semarang Selatan',
    tanggal: '2026-06-01',
    waktu: '38 menit lalu',
    kategori: 'Bencana',
    deskripsi: 'Pohon besar tumbang menutupi seluruh badan jalan setelah hujan deras, kendaraan dialihkan.',
    foto: '6.jpg',
    status: 'menunggu',
    pelapor: 'Siti Nurhaliza'
},
{
    id: 7,
    judul: 'Banjir Setinggi 40cm',
    lokasi: 'Genuk Indah Permai',
    kecamatan: 'Genuk',
    tanggal: '2026-05-31',
    waktu: '45 menit lalu',
    kategori: 'Bencana',
    deskripsi: 'Banjir merendam jalan akibat luapan kali, kendaraan tidak bisa lewat.',
    foto: '7.jpg',
    status: 'selesai',
    pelapor: 'Dewi Lestari'
},
{
    id: 8,
    judul: 'Reklame Roboh Timpa Kendaraan',
    lokasi: 'Jl. Gajah Mada',
    kecamatan: 'Semarang Barat',
    tanggal: '2026-05-31',
    waktu: '52 menit lalu',
    kategori: 'Bencana',
    deskripsi: 'Papan reklame besar roboh menimpa 2 mobil yang sedang parkir, tidak ada korban jiwa.',
    foto: '8.jpg',
    status: 'proses',
    pelapor: 'Bambang Sutopo'
},
{
    id: 9,
    judul: 'Kebakaran Lahan Ganggu Jalan',
    lokasi: 'Kelurahan Muktiharjo',
    kecamatan: 'Pedurungan',
    tanggal: '2026-05-30',
    waktu: '1 jam lalu',
    kategori: 'Bencana',
    deskripsi: 'Lahan kosong terbakar dan asap mengganggu jarak pandang pengendara di jalan utama.',
    foto: '9.jpg',
    status: 'selesai',
    pelapor: 'Toni Hermawan'
},
{
    id: 10,
    judul: 'Genangan Air di Underpass',
    lokasi: 'Underpass Jatingaleh',
    kecamatan: 'Semarang Selatan',
    tanggal: '2026-05-30',
    waktu: '1 jam 15 menit lalu',
    kategori: 'Bencana',
    deskripsi: 'Genangan air cukup dalam di underpass setelah hujan, pompa tidak berfungsi.',
    foto: '10.jpg',
    status: 'menunggu',
    pelapor: 'Linda Saputri'
},
{
    id: 11,
    judul: 'Jalan Berlubang Besar',
    lokasi: 'Jl. Setiabudi Raya',
    kecamatan: 'Candisari',
    tanggal: '2026-05-29',
    waktu: '1 jam 28 menit lalu',
    kategori: 'Infrastruktur',
    deskripsi: 'Lubang besar di tengah jalan sangat berbahaya untuk kendaraan roda dua.',
    foto: '11.jpg',
    status: 'proses',
    pelapor: 'Eko Prasetyo'
},
{
    id: 12,
    judul: 'Lampu Traffic Light Mati',
    lokasi: 'Perempatan Tugu Muda',
    kecamatan: 'Semarang Tengah',
    tanggal: '2026-05-29',
    waktu: '1 jam 35 menit lalu',
    kategori: 'Infrastruktur',
    deskripsi: 'Lampu merah mati dari pagi, lalu lintas kacau balau dan rawan kecelakaan.',
    foto: '12.jpg',
    status: 'selesai',
    pelapor: 'Fatimah Zahra'
},
{
    id: 13,
    judul: 'Trotoar Rusak Parah',
    lokasi: 'Jl. Imam Bonjol',
    kecamatan: 'Semarang Tengah',
    tanggal: '2026-05-28',
    waktu: '1 jam 42 menit lalu',
    kategori: 'Infrastruktur',
    deskripsi: 'Trotoar rusak dan berlubang sangat berbahaya untuk pejalan kaki dan pengendara.',
    foto: '13.jpg',
    status: 'menunggu',
    pelapor: 'Sri Mulyani'
},
{
    id: 14,
    judul: 'Rambu Lalu Lintas Hilang',
    lokasi: 'Pertigaan Ngaliyan',
    kecamatan: 'Ngaliyan',
    tanggal: '2026-05-28',
    waktu: '2 jam lalu',
    kategori: 'Infrastruktur',
    deskripsi: 'Rambu stop hilang dicuri, membuat pengendara bingung dan rawan kecelakaan.',
    foto: '14.jpg',
    status: 'proses',
    pelapor: 'Wahyu Nugroho'
},
{
    id: 15,
    judul: 'Kabel Listrik Nyaris Putus',
    lokasi: 'Jl. Dr. Cipto',
    kecamatan: 'Semarang Utara',
    tanggal: '2026-05-27',
    waktu: '2 jam 15 menit lalu',
    kategori: 'Infrastruktur',
    deskripsi: 'Kabel listrik hampir putus dan menggantung rendah di atas jalan, sangat berbahaya.',
    foto: '15.jpg',
    status: 'selesai',
    pelapor: 'Joko Widodo'
},
{
    id: 16,
    judul: 'Rombongan Knalpot Brong',
    lokasi: 'Tugu Muda',
    kecamatan: 'Semarang Tengah',
    tanggal: '2026-05-27',
    waktu: '2 jam 28 menit lalu',
    kategori: 'Pelanggaran',
    deskripsi: 'Bising banget rombongan anak sekolah pakai knalpot brong nutup jalan.',
    foto: '16.jpg',
    status: 'menunggu',
    pelapor: 'Agus Mulyono'
},
{
    id: 17,
    judul: 'Pedagang Kaki Lima Tutup Trotoar',
    lokasi: 'Jl. Pemuda Depan Mall',
    kecamatan: 'Semarang Tengah',
    tanggal: '2026-05-26',
    waktu: '2 jam 35 menit lalu',
    kategori: 'Pelanggaran',
    deskripsi: 'PKL memenuhi trotoar hingga pejalan kaki terpaksa berjalan di badan jalan, sangat berbahaya.',
    foto: '17.jpg',
    status: 'proses',
    pelapor: 'Dimas Prasetyo'
},
{
    id: 18,
    judul: 'Motor Balapan Liar',
    lokasi: 'Jl. Veteran Malam Hari',
    kecamatan: 'Semarang Timur',
    tanggal: '2026-05-26',
    waktu: '2 jam 48 menit lalu',
    kategori: 'Pelanggaran',
    deskripsi: 'Sekelompok remaja balapan liar dengan knalpot berisik mengganggu warga.',
    foto: '18.jpg',
    status: 'selesai',
    pelapor: 'Indah Permatasari'
},
{
    id: 19,
    judul: 'Angkot Parkir Sembarangan',
    lokasi: 'Terminal Terboyo',
    kecamatan: 'Semarang Utara',
    tanggal: '2026-05-25',
    waktu: '3 jam lalu',
    kategori: 'Pelanggaran',
    deskripsi: 'Banyak angkot parkir sembarangan di luar area tunggu resmi, bikin macet.',
    foto: '19.jpg',
    status: 'menunggu',
    pelapor: 'Hendra Wijaya'
},
{
    id: 20,
    judul: 'Demonstrasi Tutup Jalan',
    lokasi: 'Depan Gedung DPRD',
    kecamatan: 'Semarang Tengah',
    tanggal: '2026-05-25',
    waktu: '3 jam 15 menit lalu',
    kategori: 'Pelanggaran',
    deskripsi: 'Massa demonstrasi menutup akses jalan utama, kendaraan dialihkan ke jalan alternatif.',
    foto: '20.jpg',
    status: 'proses',
    pelapor: 'Ani Yudhoyono'
}
];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    updateClock();
    renderKecamatanData();
    renderLaporanVerifikasi();
    setInterval(updateClock, 1000);
    console.log('✅ PeloporMaps V3 Initialized Successfully');
});

function initializeMap() {
    map = L.map('map', {
        center: CONFIG.mapCenter,
        zoom: CONFIG.mapZoom,
        zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);
    generateFixedMarkers();
    generateHeatmapFromMarkers();
}

let allMarkers = [];

function generateFixedMarkers() {
    allMarkers = [];
    markerLayer.clearLayers();

    FIXED_MARKERS_SEMARANG.forEach(markerData => {
        allMarkers.push({
            lat: markerData.lat,
            lng: markerData.lng,
            color: markerData.color,
            intensity: markerData.intensity,
            name: markerData.name
        });

        const markerIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="map-marker marker-${markerData.color} ${markerData.color === 'red' ? 'radar-ring' : ''}"></div>`,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -11]
        });

        const marker = L.marker([markerData.lat, markerData.lng], { icon: markerIcon }).addTo(markerLayer);

        const statusText = markerData.color === 'red' ? '🚨 DARURAT' : markerData.color === 'yellow' ? '⚠️ PROSES' : '✅ SELESAI';
        const bgColor = markerData.color === 'red' ? 'danger' : markerData.color === 'yellow' ? 'warning' : 'success';

        const popupContent = `
        <div class="popup-header bg-${bgColor}-500 text-white">
        ${statusText}
        </div>
        <div class="popup-body">
        <p class="text-xs font-bold text-slate-800 mb-1">${markerData.name}</p>
        <p class="text-[11px] text-slate-600">Laporan #${1000 + Math.floor(Math.random() * 999)}</p>
        <p class="text-[10px] text-slate-500 mt-2">${Math.floor(Math.random() * 60)} menit lalu</p>
        </div>
        `;
        marker.bindPopup(popupContent);
    });
}

function generateHeatmapFromMarkers() {
    const heatData = allMarkers.map(m => [m.lat, m.lng, m.intensity]);

    if (heatLayer) {
        map.removeLayer(heatLayer);
    }

    heatLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 20,
        maxZoom: 15,
        max: 1.0,
        minOpacity: 0.4,
        gradient: {
            0.3: '#10b981',
            0.5: '#f59e0b',
            0.7: '#ff6b35',
            1.0: '#ef4444'
        }
    });
}

function toggleMapMode(mode) {
    currentMapMode = mode;
    document.getElementById('btn-mode-marker').classList.toggle('bg-white', mode === 'marker');
    document.getElementById('btn-mode-marker').classList.toggle('text-slate-800', mode === 'marker');
    document.getElementById('btn-mode-marker').classList.toggle('shadow-sm', mode === 'marker');
    document.getElementById('btn-mode-marker').classList.toggle('text-slate-500', mode !== 'marker');

    document.getElementById('btn-mode-heat').classList.toggle('bg-white', mode === 'heat');
    document.getElementById('btn-mode-heat').classList.toggle('text-slate-800', mode === 'heat');
    document.getElementById('btn-mode-heat').classList.toggle('shadow-sm', mode === 'heat');
    document.getElementById('btn-mode-heat').classList.toggle('text-slate-500', mode !== 'heat');

    if (mode === 'heat') {
        markerLayer.clearLayers();
        if (heatLayer) {
            map.addLayer(heatLayer);
        }
    } else {
        if (heatLayer && map.hasLayer(heatLayer)) {
            map.removeLayer(heatLayer);
        }
        generateFixedMarkers();
    }
}

function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + viewName).classList.add('active');

    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');
        btn.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');
    });

    const activeBtn = document.getElementById('btn-' + viewName);
    activeBtn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-slate-800');
    activeBtn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');

    const titles = {
        'dashboard': 'Live Traffic',
        'verifikasi': 'Verifikasi Laporan',
        'kecamatan': 'Data Kecamatan'
    };
    document.getElementById('header-title').textContent = titles[viewName] || 'Dashboard';

    if (viewName === 'dashboard' && map) {
        setTimeout(() => map.invalidateSize(), 100);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes} WIB`;
}

function renderKecamatanData() {
    const container = document.getElementById('kecamatan-grid');
    if (!container) return;

    container.innerHTML = kecamatanData.map(kec => {
        const persenSelesai = Math.round((kec.selesai / kec.total) * 100);
        return `
        <div class="kecamatan-card bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:shadow-lg transition-all" onclick="showKecamatanDetail('${kec.nama}')">
        <div class="flex justify-between items-start mb-3">
        <h4 class="text-base font-bold text-slate-800">${kec.nama}</h4>
        <div class="text-2xl font-black text-brand-600">${kec.total}</div>
        </div>
        <div class="space-y-2 mb-3">
        <div class="flex justify-between text-xs">
        <span class="text-slate-600">🔴 Menunggu</span>
        <span class="font-bold text-danger-600">${kec.menunggu}</span>
        </div>
        <div class="flex justify-between text-xs">
        <span class="text-slate-600">🟡 Proses</span>
        <span class="font-bold text-warning-600">${kec.proses}</span>
        </div>
        <div class="flex justify-between text-xs">
        <span class="text-slate-600">🟢 Selesai</span>
        <span class="font-bold text-success-600">${kec.selesai}</span>
        </div>
        </div>
        <div class="pt-3 border-t border-slate-100">
        <div class="flex justify-between items-center text-xs mb-1">
        <span class="text-slate-500 font-semibold">Tingkat Selesai</span>
        <span class="font-bold text-slate-800">${persenSelesai}%</span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2">
        <div class="bg-success-500 h-2 rounded-full transition-all" style="width: ${persenSelesai}%"></div>
        </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100">
        <button class="w-full text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center justify-center gap-1">
        <i class="fa-solid fa-eye"></i> Lihat Detail Laporan
        </button>
        </div>
        </div>
        `;
    }).join('');
}

function showKecamatanDetail(namaKecamatan) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');

    const modal = document.getElementById('modal-kecamatan');
    const title = document.getElementById('modal-kecamatan-title');
    const subtitle = document.getElementById('modal-kecamatan-subtitle');
    const body = document.getElementById('modal-kecamatan-body');

    const laporanKecamatan = dataLaporan.filter(lap => lap.kecamatan === namaKecamatan);
    laporanKecamatan.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    title.textContent = namaKecamatan;
    subtitle.textContent = `${laporanKecamatan.length} laporan ditemukan`;

    if (laporanKecamatan.length === 0) {
        body.innerHTML = `
        <div class="text-center py-12">
        <i class="fa-solid fa-folder-open text-6xl text-slate-300 mb-4"></i>
        <p class="text-slate-500 font-semibold">Tidak ada laporan di kecamatan ini</p>
        </div>
        `;
    } else {
        body.innerHTML = laporanKecamatan.map(lap => {
            const statusClass = lap.status === 'menunggu' ? 'danger' : lap.status === 'proses' ? 'warning' : 'success';
            const statusIcon = lap.status === 'menunggu' ? '🔴' : lap.status === 'proses' ? '🟡' : '🟢';
            const statusText = lap.status === 'menunggu' ? 'Menunggu' : lap.status === 'proses' ? 'Proses' : 'Selesai';
            const dateObj = new Date(lap.tanggal);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const tanggalFormatted = dateObj.toLocaleDateString('id-ID', options);

            let fotoHtml = '';
            if (lap.foto) {
                fotoHtml = `<img src="${lap.foto}" class="w-full h-32 object-cover rounded-lg mb-3" alt="${lap.judul}" onerror="this.parentElement.querySelector('.foto-error').classList.remove('hidden')">
                <div class="foto-error hidden bg-slate-100 h-32 rounded-lg flex items-center justify-center mb-3">
                <div class="text-center text-slate-500">
                <i class="fa-solid fa-image-slash text-2xl mb-1"></i>
                <p class="text-xs font-bold">Foto: ${lap.foto}</p>
                </div>
                </div>`;
            }

            return `
            <div class="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
            <div class="flex justify-between items-start mb-3">
            <div>
            <h4 class="font-bold text-slate-800 mb-1">${lap.judul}</h4>
            <p class="text-xs text-slate-500">
            <i class="fa-solid fa-calendar mr-1"></i> ${tanggalFormatted}
            </p>
            </div>
            <span class="px-2 py-1 rounded-lg text-xs font-bold bg-${statusClass}-100 text-${statusClass}-700">
            ${statusIcon} ${statusText}
            </span>
            </div>

            ${fotoHtml}

            <div class="space-y-2 mb-3">
            <p class="text-xs text-slate-600">
            <i class="fa-solid fa-location-dot mr-1 text-${statusClass}-500"></i>
            <span class="font-semibold">${lap.lokasi}</span>
            </p>
            <p class="text-xs text-slate-600">
            <i class="fa-solid fa-user mr-1 text-slate-400"></i>
            Pelapor: <span class="font-semibold">${lap.pelapor}</span>
            </p>
            <p class="text-xs text-slate-600">
            <i class="fa-solid fa-tag mr-1 text-slate-400"></i>
            Kategori: <span class="font-semibold">${lap.kategori}</span>
            </p>
            </div>

            <div class="bg-white p-3 rounded-lg border border-slate-200">
            <p class="text-xs text-slate-700 italic">"${lap.deskripsi}"</p>
            </div>
            </div>
            `;
        }).join('');
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModalKecamatan(event) {
    if (event && event.target.id !== 'modal-kecamatan') return;

    const modal = document.getElementById('modal-kecamatan');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function renderLaporanVerifikasi() {
    const container = document.getElementById('laporan-grid');
    if (!container) return;

    container.innerHTML = dataLaporan.map(lap => {
        const statusClass = lap.status === 'menunggu' ? 'danger' : lap.status === 'proses' ? 'warning' : 'success';
        const statusText = lap.status === 'menunggu' ? '🔴 Menunggu Petugas' : lap.status === 'proses' ? '🟡 Sedang Ditangani' : '🟢 Telah Selesai';
        const isSelesai = lap.status === 'selesai';

        let fotoHtml = '';
        if (lap.foto) {
            fotoHtml = `
            <img src="${lap.foto}"
            class="report-photo"
            alt="${lap.judul}"
            onerror="this.parentElement.innerHTML='<div class=\\'report-photo-error\\'><i class=\\'fa-solid fa-image-slash text-3xl mb-2\\'></i><span class=\\'text-xs font-bold\\'>Foto Corrupt: ${lap.foto}</span></div>'">
            `;
        } else {
            fotoHtml = `
            <div class="no-photo-placeholder">
            <i class="fa-solid fa-file-lines text-3xl mb-2"></i>
            <span class="text-xs font-bold">Laporan Teks</span>
            </div>
            `;
        }

        return `
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${isSelesai ? 'opacity-75' : ''}">
        <div class="h-40 relative">
        ${fotoHtml}
        <span class="absolute top-3 right-3 bg-${statusClass}-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-md uppercase tracking-wider">${lap.kategori}</span>
        <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-1 rounded">ID: ${lap.id}</span>
        </div>
        <div class="p-4 flex-1 flex flex-col">
        <p class="text-sm font-bold text-slate-800 mb-1">${lap.judul}</p>
        <p class="text-[11px] text-slate-500 mb-2">
        <i class="fa-solid fa-location-dot mr-1 text-slate-400"></i> ${lap.lokasi} • ${lap.waktu}
        </p>
        <p class="text-[11px] text-slate-600 mb-2">
        <i class="fa-solid fa-user text-slate-400 mr-1"></i> <span class="font-semibold">${lap.pelapor}</span>
        </p>
        <p class="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 mb-4 flex-1">"${lap.deskripsi}"</p>

        <div>
        <label class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Status:</label>
        <select
        onchange="updateStatus(this, ${lap.id})"
        class="w-full text-sm font-semibold border border-slate-300 rounded-lg px-3 py-2 bg-${statusClass}-50 text-${statusClass}-700 outline-none focus:border-brand-500 cursor-pointer ${isSelesai ? 'cursor-not-allowed opacity-80' : ''}"
        ${isSelesai ? 'disabled' : ''}>
        <option value="menunggu" ${lap.status === 'menunggu' ? 'selected' : ''}>🔴 Menunggu Petugas</option>
        <option value="proses" ${lap.status === 'proses' ? 'selected' : ''}>🟡 Sedang Ditangani</option>
        <option value="selesai" ${lap.status === 'selesai' ? 'selected' : ''}>🟢 Masalah Selesai</option>
        </select>
        </div>
        </div>
        </div>
        `;
    }).join('');
}

function updateStatus(selectElement, laporanId) {
    const newStatus = selectElement.value;
    const laporan = dataLaporan.find(l => l.id === laporanId);

    if (laporan) {
        laporan.status = newStatus;

        const card = selectElement.closest('.bg-white');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);

        updateCounterBadge();
        renderLaporanVerifikasi();

        console.log(`✅ Laporan #${laporanId} status diubah menjadi: ${newStatus}`);
    }
}

function updateCounterBadge() {
    const menungguCount = dataLaporan.filter(l => l.status === 'menunggu').length;
    const badge = document.querySelector('#btn-verifikasi .bg-danger-500');
    if (badge) {
        badge.textContent = `${menungguCount} Baru`;
    }
}

function simulasikanLaporanMasuk() {
    const laporanBaru = [
        { title: 'Kecelakaan Motor Beruntun', foto: Math.floor(Math.random() * 5) + 1 + '.jpg' },
        { title: 'Pohon Tumbang Tutup Jalan', foto: Math.floor(Math.random() * 5) + 6 + '.jpg' },
        { title: 'Jalan Berlubang Besar', foto: Math.floor(Math.random() * 5) + 11 + '.jpg' },
        { title: 'Rombongan Knalpot Brong', foto: Math.floor(Math.random() * 5) + 16 + '.jpg' }
    ];

    const locations = [
        { name: 'Gajahmungkur', lat: -6.9980, lng: 110.4080 },
        { name: 'Majapahit', lat: -6.9920, lng: 110.4120 },
        { name: 'MT Haryono', lat: -7.0020, lng: 110.4180 },
        { name: 'Dr. Cipto', lat: -6.9880, lng: 110.4180 },
        { name: 'Veteran', lat: -6.9950, lng: 110.4050 }
    ];

    const randomLaporan = laporanBaru[Math.floor(Math.random() * laporanBaru.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];

    const toast = document.getElementById('toast-notif');
    toast.innerHTML = `
    <div class="w-10 h-10 rounded-full bg-danger-500 flex items-center justify-center text-white text-lg shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse">
    <i class="fa-solid fa-bolt"></i>
    </div>
    <div>
    <h4 class="font-bold text-sm text-white">Laporan Darurat Masuk!</h4>
    <p class="text-xs text-slate-300 mt-1 leading-relaxed">${randomLaporan.title} di ${randomLocation.name}. Peta diperbarui otomatis.</p>
    </div>
    `;
    toast.classList.remove('translate-y-32', 'opacity-0');
    toast.classList.add('toast-show');

    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
    }, 4000);

    const newLat = randomLocation.lat;
    const newLng = randomLocation.lng;

    allMarkers.push({
        lat: newLat,
        lng: newLng,
        color: 'red',
        intensity: 1.0,
        name: randomLocation.name
    });

    generateHeatmapFromMarkers();
    if (currentMapMode === 'heat' && heatLayer) {
        map.addLayer(heatLayer);
    }

    if (currentMapMode === 'marker') {
        const newMarkerIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: '<div class="map-marker marker-red radar-ring"></div>',
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -11]
        });

        const newMarker = L.marker([newLat, newLng], { icon: newMarkerIcon }).addTo(markerLayer);
        map.flyTo([newLat, newLng], 15, { duration: 1.5 });

        setTimeout(() => {
            newMarker.bindPopup(`
            <div class="popup-header bg-danger-600 text-white">
            🚨 LAPORAN BARU!
            </div>
            <div class="popup-body">
            <p class="text-xs font-bold text-slate-800 mb-2">${randomLaporan.title}</p>
            <img src="${randomLaporan.foto}" class="w-full h-24 object-cover rounded-lg mb-2 border border-slate-200" onerror="this.src='https://images.unsplash.com/photo-1515511856280-7b23f68d2996?auto=format&fit=crop&w=600&q=80'">
            <p class="text-[11px] text-slate-600"><i class="fa-solid fa-location-dot mr-1 text-danger-500"></i> ${randomLocation.name}</p>
            <p class="text-[10px] text-slate-500 mt-1">Baru saja dilaporkan</p>
            </div>
            `).openPopup();
        }, 1600);
    }

    const currentStat = parseInt(document.getElementById('stat-today').textContent.replace(',', ''));
    document.getElementById('stat-today').textContent = (currentStat + 1).toLocaleString();

    const feedContainer = document.getElementById('feed-container');
    const newFeedHtml = `
    <div class="bg-blue-50 p-4 lg:p-5 border-b border-slate-100 feed-item hover:bg-blue-100 transition-colors">
    <div class="flex justify-between items-start mb-2">
    <div class="flex items-center gap-3">
    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80" class="w-9 h-9 rounded-full object-cover border-2 border-danger-300">
    <div>
    <p class="text-sm font-bold text-slate-800">Warga Baru <i class="fa-solid fa-circle-check text-brand-500 text-[10px]"></i></p>
    <p class="text-[10px] text-slate-500">${randomLocation.name} • Baru saja</p>
    </div>
    </div>
    <span class="bg-danger-500 text-white text-[9px] font-bold px-2 py-0.5 rounded animate-pulse">LIVE</span>
    </div>
    <p class="text-[13px] text-slate-700 mt-2 mb-3 leading-relaxed">${randomLaporan.title}! Tolong segera ditangani petugas. Situasi cukup darurat! 🚨</p>
    <img src="${randomLaporan.foto}" class="w-full h-36 object-cover rounded-lg mb-3 border border-slate-200" onerror="this.src='https://images.unsplash.com/photo-1515511856280-7b23f68d2996?auto=format&fit=crop&w=600&q=80'">
    <div class="flex items-center gap-4 mt-2 pt-2 border-t border-slate-50">
    <button class="flex items-center gap-1.5 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full hover:bg-brand-100 transition-colors">
    <i class="fa-solid fa-thumbs-up"></i> 1 Validasi
    </button>
    </div>
    </div>
    `;

    if (feedContainer) {
        feedContainer.insertAdjacentHTML('afterbegin', newFeedHtml);
    }

    console.log('🚨 Simulasi laporan baru:', randomLaporan.title, '-', randomLocation.name, '-', randomLaporan.foto);
}
