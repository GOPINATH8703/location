let imgs = [];
let imgIndex = 0;
let templesData = [];
let currentId = "";

function showImg() {
  document.getElementById("slideImg").src = imgs[imgIndex];
}

function nextImg() {
  imgIndex = (imgIndex + 1) % imgs.length;
  showImg();
}

function prevImg() {
  imgIndex = (imgIndex - 1 + imgs.length) % imgs.length;
  showImg();
}

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    templesData = data.temples;

    const list = document.getElementById("templeList");
    if (list) {
      data.temples.forEach(t => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <img src="${t.images[0]}">
          <h3>${t.name}</h3>
        `;
        div.onclick = () => {
          location.href = `temple.html?id=${t.id}`;
        };
        list.appendChild(div);
      });
    }

    const params = new URLSearchParams(location.search);
    currentId = params.get("id");

    if (currentId) {
      const t = data.temples.find(x => x.id === currentId);
      imgs = t.images;
      showImg();
      name.innerText = t.name;
      desc.innerText = t.desc;
      location.innerText = "📍 " + t.location;
      map.href = t.map;
      embed.src = t.mapEmbed;
    }
  });

function nextTemple() {
  let i = templesData.findIndex(x => x.id === currentId);
  let next = templesData[(i + 1) % templesData.length].id;
  location.href = `temple.html?id=${next}`;
}

function prevTemple() {
  let i = templesData.findIndex(x => x.id === currentId);
  let prev = templesData[(i - 1 + templesData.length) % templesData.length].id;
  location.href = `temple.html?id=${prev}`;
}
