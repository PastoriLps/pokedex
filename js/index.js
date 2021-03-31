let pokemon = null;

function createColumn(pokemonImage) {
    
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
      if (result.previous == null) {
        disablePrevious();
      }
      let columns = createRow();
      const pokeSection = document.querySelector(".pokemons-section");
      pokemon.results.forEach((pokemonItem, index) => {
        const column = createColumn(
          `https://projectpokemon.org/images/normal-sprite/${pokemonItem.name}.gif`
        );
        columns.append(column);
        if ((index + 1) % 4 == 0) {
          pokeSection.append(columns);
          columns = createRow();
        }
      });
    })
    .catch((error) => console.log("error", error));
}

function searchBar() {
  const input = document.querySelector("#search-bar");
  if(input.value != ""){
    const pokeSection = removeOldChildsAndReturnPokeSection();
    const row = createRow();
    const column = createColumn(
      `https://projectpokemon.org/images/normal-sprite/${input.value.toLowerCase()}.gif`
    );
    row.append(column);
    pokeSection.append(row);
    disableAllPagination();
  }else{
    removeOldChildsAndReturnPokeSection();
    getFirstPage();
    enableAllPagination();
  }
}

function removeOldChildsAndReturnPokeSection() {
  const pokeSection = document.querySelector(".pokemons-section");
  const childrens = [...pokeSection.children];
  childrens.forEach(function (item) {
    pokeSection.removeChild(item);
  });
  return pokeSection;
}

function disableAllPagination() {
  disablePrevious();
  disableNext();
}

function enableAllPagination() {
  enablePrevious();
  enableNext();
}

function disableNext() {
  const nextList = document.querySelectorAll(".next");
  nextList.forEach(function (link) { link.setAttribute('disabled', 'disabled'); });
}

function disablePrevious() {
  const previousList = document.querySelectorAll(".previous");
  previousList.forEach(function (link) { link.setAttribute('disabled', 'disabled'); });
}

function enablePrevious() {
  const previousList = document.querySelectorAll(".previous");
  previousList.forEach(function (link) { link.removeAttribute('disabled'); });
}

function enableNext() {
  const nextList = document.querySelectorAll(".next");
  nextList.forEach(function (link) { link.removeAttribute('disabled'); });
}

function nextPage() {
  console.log(pokemon);
  if (pokemon.next != null) {
    removeOldChildsAndReturnPokeSection();
    var requestOptions = {
      method: "GET",
      //   redirect: "follow",
    };

    fetch(pokemon.next, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        pokemon = result;
        if (result.previous == null) {
          disablePrevious();
        }else{
          enablePrevious();
        }
        let columns = createRow();
        const pokeSection = document.querySelector(".pokemons-section");
        pokemon.results.forEach((pokemonItem, index) => {
          const column = createColumn(
            `https://projectpokemon.org/images/normal-sprite/${pokemonItem.name}.gif`
          );
          columns.append(column);
          if ((index + 1) % 4 == 0) {
            pokeSection.append(columns);
            columns = createRow();
          }
        });
      })
      .catch((error) => console.log("error", error));
  }
 }

function prevPage() {
  console.log(pokemon);
  if (pokemon.previous != null) {
    removeOldChildsAndReturnPokeSection();
    var requestOptions = {
      method: "GET",
      //   redirect: "follow",
    };

    fetch(pokemon.previous, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        pokemon = result;
        if (result.previous == null) {
          disablePrevious();
        }else{
          enablePrevious();
        }
        let columns = createRow();
        const pokeSection = document.querySelector(".pokemons-section");
        pokemon.results.forEach((pokemonItem, index) => {
          const column = createColumn(
            `https://projectpokemon.org/images/normal-sprite/${pokemonItem.name}.gif`
          );
          columns.append(column);
          if ((index + 1) % 4 == 0) {
            pokeSection.append(columns);
            columns = createRow();
          }
        });
      })
      .catch((error) => console.log("error", error));
  }
}
