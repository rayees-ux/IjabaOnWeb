document.addEventListener("DOMContentLoaded", function () {

  console.log("Global Ad Running ✅");

  const adImages = [
    "image.png",
    "https://via.placeholder.com/300x250"
  ];

  function getRandomImage() {
    return adImages[Math.floor(Math.random() * adImages.length)];
  }

  function showAd() {

    // remove old ad
    const old = document.getElementById("globalAd");
    if (old) old.remove();

    const popup = document.createElement("div");
    popup.id = "adOverlay";

    popup.style = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.5);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
    `;

popup.innerHTML = `
  <div class="ad-card">
    <button class="ad-close-btn" aria-label="Close advertisement">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>
    </button>

    <div class="ad-image-container">
      <img src="${getRandomImage()}" alt="Advertisement" class="ad-image" loading="lazy">
      <div class="ad-image-overlay"></div>
    </div>

    <div class="ad-content">
      <h2 class="ad-title">✨ Special Islamic Content</h2>
      <p class="ad-description">Explore powerful Mas'ala, articles and daily guidance</p>
      <a href="#" class="ad-btn">Explore Now</a>
    </div>
  </div>
`;

    document.body.appendChild(popup);

    popup.querySelector("button").onclick = () => popup.remove();
  }


  // 🔁 REPEAT (TEST)
  setInterval(showAd, 4 * 60 * 1000);

});