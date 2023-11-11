const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});
api.defaults.headers.common["X-API-KEY"] =
  "live_y1A8sEMyAadnfCFHdGT14bZVcZF4mWurgxqPM5qde4RU19tW9jkCJb6selvdfTUo";

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/iamges/upload";
const spanError = document.getElementById("error");

async function loadRandomCats() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteCats(data[0].id);
    btn2.onclick = () => saveFavouriteCats(data[1].id);
  }
}

async function loadFavouriteCats() {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "GET",
    headers: {
      "X-API-KEY":
        "live_y1A8sEMyAadnfCFHdGT14bZVcZF4mWurgxqPM5qde4RU19tW9jkCJb6selvdfTUo",
    },
  });

  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById("favouriteCats");
    const h2 = document.createElement("h2");
    const h2text = document.createTextNode("Gatos favoritos");

    section.innerHTML = "";
    section.appendChild(h2);
    h2.appendChild(h2text);

    data.forEach((cat) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar foto de favoritos");

      img.src = cat.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteCats(cat.id);

      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
    });
  }
}

async function saveFavouriteCats(id) {
  const { data, status } = await api.post("/favourites", {
    image_id: id,
  });

  // const res = await fetch(API_URL_FAVOURITES, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-API-KEY":
  //       "live_y1A8sEMyAadnfCFHdGT14bZVcZF4mWurgxqPM5qde4RU19tW9jkCJb6selvdfTUo",
  //   },
  //   body: JSON.stringify({ image_id: id }),
  // });
  // const data = await res.json();

  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    console.log("Gato guardado");
    loadFavouriteCats();
  }
}

async function deleteFavouriteCats(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY":
        "live_y1A8sEMyAadnfCFHdGT14bZVcZF4mWurgxqPM5qde4RU19tW9jkCJb6selvdfTUo",
    },
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Gato eliminado");
    loadFavouriteCats();
  }
}

async function uploadCatPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      "X-API-KEY":
        "live_y1A8sEMyAadnfCFHdGT14bZVcZF4mWurgxqPM5qde4RU19tW9jkCJb6selvdfTUo",
    },
    body: formData,
  });
}

loadRandomCats();
loadFavouriteCats();
