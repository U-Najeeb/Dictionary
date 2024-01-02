// Selecting elements from the DOM
const inputField = document.querySelector(".search--field");
const searchButton = document.querySelector(".search--button");
const word = document.querySelector(".word");
const phonetics = document.querySelector(".phonetics");
const definition = document.querySelector(".definition");
const audio = document.querySelector(".audio");
const speaker = document.querySelector(".speaker--image");
const audioSource = document.querySelector(".audio--source");
const example = document.querySelector(".example");
const hidden = document.querySelector(".hidden");


// Function to update the UI with data from the API
const updateUI = (data) => {
  
  const responseObj = data[0];
  
  // Extracting information from the data
  const searchedWord = responseObj.word;
  const searchedPhonetics =
    responseObj.phonetics[0]?.text ||
    responseObj.phonetics[1]?.text ||
    "No phonetics available"; // Using a fallback for the case when the first phonetic entry is not available
  const searchedDefinition = responseObj.meanings[0].definitions[0].definition;

  let arrayForExamples
  responseObj.meanings.forEach(element => {
    arrayForExamples = element.definitions
  });
  const examples = arrayForExamples.map((examples) => examples.example)
  const searchedExample = examples.find((eg) => eg)
  

  // Updating the UI elements with the extracted information
  word.textContent = searchedWord;
  phonetics.textContent = searchedPhonetics;
  definition.textContent = searchedDefinition;
  example.textContent = searchedExample
    ? searchedExample
    : "No example available";


  // Extracting audio source and setting up the click event for the speaker image
  let source
  responseObj.phonetics.forEach((element) =>{
    source = element.audio
  })
  if (source) {
    speaker.addEventListener("click", (e) => {
      e.preventDefault();
      audio.src = source;
      audio.play();
    });
  }
};


// Function to fetch data from the API
const fetchApi = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
      updateUI(data);
      hidden.style.opacity = 1;
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
};


// Event listener for the search button
searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const inputFieldValue = inputField.value;
  fetchApi(inputFieldValue);
});
