// Fungsi untuk memeriksa status jaringan
function checkNetworkStatus() {
    const statusText = document.getElementById('networkStatus');
    if (navigator.onLine) {
        statusText.textContent = "Koneksi aktif";
        statusText.style.color = "green";
    } else {
        statusText.textContent = "Koneksi terputus";
        statusText.style.color = "red";
    }
}

// Fungsi untuk menguji ping ke server eksternal (misalnya, Google)
function pingTest() {
    const startTime = Date.now();

    // Lakukan permintaan ping ke server eksternal
    fetch('https://www.google.com', { mode: 'no-cors' })
        .then(() => {
            const endTime = Date.now();
            const latency = endTime - startTime;
            document.getElementById('pingResult').textContent = `Ping berhasil! Latensi: ${latency} ms`;
            document.getElementById('pingResult').style.color = "green";
        })
        .catch(() => {
            document.getElementById('pingResult').textContent = "Ping gagal!";
            document.getElementById('pingResult').style.color = "red";
        });
}

// Fungsi untuk mengukur kecepatan jaringan (tes sederhana)
function speedTest() {
    const startTime = Date.now();

    // Ambil file eksternal kecil untuk tes kecepatan (file yang bisa diakses di server eksternal)
    fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAMAAABuU5ChAAAA+VBMVEX////pQjU0qFNChfT6uwU0f/O4zvs6gfSJr/j6twDoOisjePPoNSXpPjDrWU/oLRr+9vZ7pff/vAAUoUAkpEn0ran619b82pT7wgD+68j947H/+e7//PafvPm/0vuBw5Df7+P63tz3xcPxl5HnJQ7qUEXxj4n4z83zoJzqSz/vgXrucWrsY1r1tbHrSBPoOjbvcSr0kx74rRH80XntZC3xhSPmGRr86+r4sk/936EJcfPS3/yowvnbwVKjsTjx9f5urEjkuBu9tC+ErkJyvoRRpj2az6hWs23j6/0emX2z2btAiuI8k8AyqkE5nZU1pGxCiOxVmtHJ5M+PSt3WAAACGElEQVRIieWSa3fSQBCGk20CJRcW2AWKxgJtqCmieNdatV5SUtFq5f//GJeE7CXJJOT4TZ+PO+c58+7MaNr/SWd60mecTDs1pMFp28dODPZnZw/369TXseXqHNfCblDdte84krTDwUFFwnMnJyXm+bSsmZ/vlcb1+6A2x5C1xYeyPgIyJlhtYDjzjOYyZA3oFighLYxni8UMY6dCG/jy9KzTQfI8DXSnTNN0kcl1lNE9dlxYC8TnnEVmAJ02qHlPllyb58vgmQ2Np0tYgzGMo2ex6IKRihi1mPhcZyYuO8McL4yYl0vrrI6mJZpx9Or1mzqa10rFt8p7o5ArXh+lXutC8d6ZBdiXvH6PeyPFsw8KMBu8fsG9+3t473l9yD1vD+/BX3v1cgqv3lzE/8A9NCUK5sn33vugeN1DQTcVTbG/9M56H+lEAzg2d54t7iW5657xCdEx5PF+B9Lj9oO9z4hBgIZX6YyaXfmZaV9QQkU781h+Hra+7jQaFv6Or8RW3r1rhErES641D9XKigox8jJaQxyAfZOpIQm6kiuT6BvfujqVuEpkkY43u+d1RBBF35v55aVJidKSEBRFiJAk/+0PM3NjgjFFMLc/WVYzlzImLBPprzvzrlBjHUmZSH8DmqatS0QSZtcjTxUBWSlZw1bckhaYlISTcm1rIqKolJJxtRWnXUVscTFsjWFFwoy7WTM2+zX69/gDaLcy7SET9nsAAAAASUVORK5CYII=')
        .then(response => response.blob())
        .then(blob => {
            const endTime = Date.now();
            const duration = endTime - startTime;
            const fileSize = blob.size / 1024 / 1024; // Mengonversi byte ke MB
            const speed = fileSize / (duration / 1000); // MB per detik
            const progressBar = document.getElementById('speedProgress');
            progressBar.style.width = `${Math.min(speed * 100, 100)}%`; // Menampilkan progress bar

            document.getElementById('speedResult').textContent = `Kecepatan: ${speed.toFixed(2)} MB/s`;
            document.getElementById('speedResult').style.color = "green";
        })
        .catch(() => {
            document.getElementById('speedResult').textContent = "Tes kecepatan gagal!";
            document.getElementById('speedResult').style.color = "red";
        });
}

// Menjalankan fungsi saat halaman dimuat
window.onload = function() {
    checkNetworkStatus();

    // Memperbarui status jaringan setiap 5 detik
    setInterval(checkNetworkStatus, 5000);
};

// Menambahkan event listener pada tombol-tombol
document.getElementById('pingButton').addEventListener('click', pingTest);
document.getElementById('speedTestButton').addEventListener('click', speedTest);

