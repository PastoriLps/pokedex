let pokemon = null;

const modal = document.querySelector(".modal");
function showModal(div) {
  modal.classList.add("is-active");
  console.log(div.id);
}

function hideModal() {
  modal.classList.remove("is-active");
}

function createColumn(pokemonImage, index) {
    
  const column = document.createElement("div");
  const card = document.createElement("div");
  const cardImage = document.createElement("div");
  const figure = document.createElement("figure");
  const image = document.createElement("img");

  column.classList.add("column");
  card.classList.add("card");
  cardImage.classList.add("card-image");
  figure.classList.add("image");
  figure.classList.add("is-4by3");

  image.src = pokemonImage;
  card.id = index;

  card.addEventListener("click", showModal.bind(card));

  figure.append(image);
  cardImage.append(figure);
  card.append(cardImage);
  column.append(card);

  return column;
}

function createRow() {
  const columns = document.createElement("div");
  columns.classList.add("columns");
  return columns;
}

function getFirstPage() {
  var requestOptions = {
    method: "GET",
    //   redirect: "follow",
  };

  fetch("https://pokeapi.co/api/v2/pokemon/?limit=25", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      pokemon = result;
      let columns = createRow();
      const body = document.querySelector("body");
      pokemon.results.forEach((pokemonItem, index) => {
        const column = createColumn(
          `https://projectpokemon.org/images/normal-sprite/${pokemonItem.name}.gif`,
          index
        );
        columns.append(column);
        if ((index + 1) % 4 == 0) {
          body.append(columns);
          columns = createRow();
        }
      });
    })
    .catch((error) => console.log("error", error));
}