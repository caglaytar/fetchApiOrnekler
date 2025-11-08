const araBtn = document.getElementById("araBtn");
const kullaniciInput = document.getElementById("kullaniciAdi");
const sonucDiv = document.getElementById("sonuc");

araBtn.addEventListener("click", () => {
  const kullaniciAdi = kullaniciInput.value.trim();

  if (!kullaniciAdi) {
    sonucDiv.innerHTML = "<p>Lütfen bir kullanıcı adı girin.</p>";
    return;
  }

  fetch(`https://api.github.com/users/${kullaniciAdi}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Kullanıcı bulunamadı!");
      }
      return response.json();
    })
    .then(data => {
      sonucDiv.innerHTML = `
        <div class="kart">
          <img src="${data.avatar_url}" alt="${data.login}">
          <h2>${data.name || data.login}</h2>
          <p>Takipçi: ${data.followers}</p>
          <p>Takip Edilen: ${data.following}</p>
          <a href="${data.html_url}" target="_blank">GitHub Profiline Git</a>
        </div>
      `;
    })
    .catch(err => {
      sonucDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
});
