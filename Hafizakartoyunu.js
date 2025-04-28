// Kart içerikleri
const kartlar = ["🍌", "🍇", "🍓", "🥝", "🍒","🌶️","🥦","🫛","🍄‍🟫","🥜","🐬","🍉"];
const oyunKartlari = [...kartlar, ...kartlar]; // Kartları 2 defa çoğalttık .  "..." ile dizinin elemanlarını teker teker açtık
let kartlarKilitli = false;
// Kartları karıştıralım
// Math.random() → 0 ile 1 arasında rasgele bir sayı üretir.
// Math.random() - 0.5 → Sonuç bazen negatif, bazen pozitif olur.
// .sort() bu değere göre diziyi rastgele karıştırır!
oyunKartlari.sort(() => Math.random() - 0.5);

// Kartları ekrana yerleştirelim
const oyunAlani = document.getElementById("oyun-alani");

// .forEach() : Bir dizinin her elemanında sırayla dolaşmamızı sağlar.
oyunKartlari.forEach((emoji) => {
    const kart = document.createElement("div");
    kart.classList.add("kart");
    kart.textContent = ""; // Başta emoji gizli olsun
    kart.dataset.emoji = emoji; // Emoji bilgisini saklıyoruz
    oyunAlani.appendChild(kart);

    // Kartlara tıklama olayını ekleyelim (ileride işleyeceğiz)
    kart.addEventListener("click", kartTiklama);
});

// Tıklayınca çalışacak temel fonksiyon
let secilenKartlar = [];

function kartTiklama() {
    if (kartlarKilitli) return; //kartlar kilitliyse hiçbirşey yapma 
    // Eğer zaten açık kartsa bir şey yapma
    if (this.textContent !== "") {
        return;
    }

    // Kartın içeriğini göster
    this.textContent = this.dataset.emoji;
    secilenKartlar.push(this);

    // 2 kart seçilince kontrol yap
    if (secilenKartlar.length === 2) {
        kartlarKilitli = true; // şimdi kartlar kilitlensin.
        setTimeout(kartlariKontrolEt, 800);
    }
}

function kartlariKontrolEt() {
    const [ilkKart, ikinciKart] = secilenKartlar;

    if (ilkKart.dataset.emoji === ikinciKart.dataset.emoji) {
        // Eşleşirse bırak, açık kalsın
        ilkKart.style.backgroundColor = "rgb(50, 232, 44)";
        ikinciKart.style.backgroundColor = "rgb(50, 232, 44)";
    } else {
        // Eşleşmezse kapat
        ilkKart.textContent = "";
        ikinciKart.textContent = "";
    }

    secilenKartlar = [];
    kartlarKilitli = false; // kontrol bitti, tekrar tıklamaya izin ver.
}
