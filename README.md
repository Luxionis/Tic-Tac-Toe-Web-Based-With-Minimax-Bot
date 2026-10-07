# Permainan Tic-Tac-Toe Berbasis Web dengan Bot Minimax

Aplikasi web statis permainan Tic-Tac-Toe (papan 3×3) interaktif di mana pemain manusia bertanding melawan AI Bot yang tak terkalahkan (*unbeatable*) berbasis algoritma **Minimax**. Proyek ini dibangun tanpa framework, library eksternal, maupun backend server.

Proyek ini disusun sebagai bagian dari Mata Kuliah **Kecerdasan Tiruan I**, Program Studi Sarjana Teknologi Informasi, Fakultas Teknik, **Universitas Udayana** (2026).

---

## Tim Penyusun (Kelompok 6)

* **Nyoman Gede Adi Mahardika** (NIM: 2405551062)
* **Ida Bagus Dalem Werda Adnyana** (NIM: 2505551131)
* **Tyo Putra Kharinata** (NIM: 2405551162)
* **Cornel Asmara Noya Oleona** (NIM: 2505551164)

**Dosen Pengampu:** I Nyoman Prayana Trisna, S.Kom., M.Cs.

---

## Fitur Utama

* **Pilihan Mode Permainan**:  
  * `Player First`: Pemain manusia memakai simbol **X** dan melangkah terlebih dahulu.
  * `Bot First`: Bot AI memakai simbol **X** dan melangkah terlebih dahulu (pembukaan otomatis di sudut pojok).
* **AI Bot Tak Terkalahkan (Unbeatable)**: Menggunakan pencarian adversarial Minimax yang menelusuri seluruh kemungkinan ruang keadaan (*state space*).
* **Antarmuka &amp; Animasi Jeda**: Dilengkapi jeda simulasi berpikir bot (`setTimeout` 500 ms) dan papan interaktif.
* **Deteksi Kemenangan &amp; Seri**:  
  * Penandaan garis pemenang secara visual (warna hijau pada 3 sel sejajar).
  * Penguncian papan otomatis saat ronde berakhir.
  * Status permainan dinamis (`Your Turn`, `Bot Turn`, `Bot Win!`, `Game Draw!`).
* **Navigasi Ronde**:  
  * `Play Again`: Memulai ulang permainan.
  * `Menu`: Kembali ke tampilan utama pemilihan mode.
* **Desain Responsif**: Tampilan tetap optimal dari layar desktop (1280px) hingga mobile (375px &amp; 320px).

---

## 🛠️ Teknologi yang Digunakan

* **HTML5**: Struktur halaman statis (`index.html`).
* **CSS3**: Tata letak menggunakan Flexbox, CSS Grid, Media Queries, dan efek visual (`css/style.css`).
* **JavaScript (Vanilla ES6)**: Pengelolaan logika permainan, manipulasi DOM, timer asinkron, serta implementasi algoritma Minimax (`js/script.js`).
* **Tanpa Dependensi**: Tidak memerlukan Node.js, package manager (`npm`), CDN, atau pustaka eksternal.

---

## Struktur Berkas

```
TICTACTOE/
├── index.html        # Struktur UI (Menu utama, papan 3x3, status, &amp; tombol)
├── css/
│   └── style.css     # Gaya tampilan, grid layout, responsivitas, &amp; indikator pemenang
└── js/
    └── script.js     # State global, event handler DOM, timer bot, &amp; algoritma Minimax

```

---

## Algoritma Minimax

Algoritma Minimax bekerja secara rekursif mengevaluasi seluruh cabang langkah yang memungkinkan pada papan 3×3:

1. **Maximizing Player (Bot)**: Memilih langkah yang memaksimalkan skor evaluasi.
2. **Minimizing Player (Manusia)**: Diasumsikan memilih langkah optimal yang meminimalkan skor bot.
3. **Fungsi Evaluasi State Akhir**:  
  * **Bot Menang**: `10 - depth` (kemenangan lebih cepat diberi skor lebih tinggi).
  * **Manusia Menang**: `depth - 10`.
  * **Seri (Draw)**: `0`.

---

## Cara Menjalankan Proyek

Karena proyek ini murni merupakan web statis, Anda dapat menjalankannya langsung tanpa instalasi khusus:

1. **Clone repository ini**:  
```  
git clone https://github.com/username/tictactoe-minimax.git  
cd tictactoe-minimax  
```
2. **Buka di Browser**:  
  * Buka berkas `index.html` secara langsung menggunakan browser pilihan Anda (Chromium, Chrome, Firefox, Edge, Safari).
  * Atau gunakan ekstensi **Live Server** di VS Code / server statis lokal:  
  ```  
  python -m http.server 8000  
  ```  
  Lalu buka `http://localhost:8000` pada browser.

---

## Ringkasan Hasil Pengujian &amp; Temuan Audit

Berdasarkan laporan pengujian otomatis menggunakan **Chromium (Playwright)**:

* **Ketakterkalahan Bot**: Terbukti secara matematis dan eksperimental bahwa manusia tidak pernah bisa menang melawan bot jika dimainkan secara sah (hasil maksimal adalah seri).
* **Temuan Audit (Catatan Pengembangan Masa Depan)**:  
  * **F01 (Timer Bot Lintas Ronde)**: Menekan tombol `Menu` / `Play Again` secara cepat saat bot berpikir dapat menyebabkan callback `setTimeout` bocor ke ronde baru.
  * **F02 (Reset Mode)**: Tombol `Play Again` menentukan giliran pertama berdasarkan `currentPlayer` saat tombol ditekan, bukan mempertahankan pilihan mode di menu awal.
  * **F03 &amp; F04 (Aksesibilitas/WCAG)**: Sel papan kosong belum memiliki `aria-label` dan teks status belum menggunakan `aria-live`.
