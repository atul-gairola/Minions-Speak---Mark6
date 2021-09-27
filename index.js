const apiURL = "https://api.funtranslations.com/translate/minion.json";

let loading = false;

const convertButton = document.getElementById("convertButton");
const inputText = document.getElementById("text");
const output = document.getElementById("output");

function constructURL(text) {
  return `${apiURL}?text=${text}`;
}

function setOutput(translation) {
  output.value = translation;
}

function updateLoading(isLoading) {
  if (isLoading) {
    loading = true;
    convertButton.innerText = "Loading...";
    convertButton.disabled = true;
    convertButton.classList.add("disable");
  } else {
    loading = false;
    convertButton.innerText = "Convert";
    convertButton.disabled = false;
    convertButton.classList.remove("disable");
  }
}

convertButton.addEventListener("click", () => {
  if (loading) {
    return;
  }
  updateLoading(true);
  const { value } = inputText;
  console.log(value);

  fetch(constructURL(value))
    .then((response) => response.json())
    .then((data) => {
      const { translated } = data.contents;
      setOutput(translated);
      updateLoading(false);
    })
    .catch((err) => {
      console.log(err);
      updateLoading(false);
    });
});
