const apiURL = "https://api.funtranslations.com/translate/minion.json";

let loading = false;

const convertButton = document.getElementById("convertButton");
const inputText = document.getElementById("text");

function constructURL(text) {
  return `${apiURL}?text=${text}`;
}

convertButton.addEventListener("click", () => {
  loading = true;
  const { value } = inputText;
  console.log(value);

  fetch(constructURL(value))
    .then((response) => response.json())
    .then((data) => {
      const { translated } = data.contents;
      loading = false;
    })
    .catch((err) => {
      console.log(err);
      loading = false;
    });
});
