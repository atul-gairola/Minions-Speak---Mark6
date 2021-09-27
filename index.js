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

function handleError(err) {
  console.log(err);
  alert("Only 5 conversion per hour are allowed. They have been exceded. Please try after 1 hour.");
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

  fetch(constructURL(value))
    .then((response) => response.json())
    .then((data) => {
      const { translated } = data.contents;
      setOutput(translated);
      updateLoading(false);
    })
    .catch((err) => {
      handleError(err);
      updateLoading(false);
    });
});
