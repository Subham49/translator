const countries = {
    "hi": "Hindi",
    "en": "English",
    "am": "Amharic",
    "ar": "Arabic",
    "be": "Bielarus",
    "bem": "Bemba",
    "bi": "Bislama",
    "bjs": "Bajan",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan",
    "cop": "Coptic",
    "cs": "Czech",
    "cy": "Welsh",
    "da": "Danish",
    "dz": "Dzongkha",
    "de": "German",
    "dv": "Maldivian",
    "el": "Greek",
    "es": "Spanish",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "fi": "Finnish",
    "fn-": "Fanagalo",
    "fo": "Faroese",
    "fr": "French",
    "gl": "Galician",
    "gu": "Gujarati",
    "ha": "Hausa",
    "he": "Hebrew",
    "hr": "Croatian",
    "hu": "Hungarian",
    "id": "Indonesian",
    "is": "Icelandic",
    "it": "Italian",
    "ja": "Japanese",
    "kk": "Kazakh",
    "km": "Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "ku": "Kurdish",
    "ky": "Kyrgyz",
    "la": "Latin",
    "lo": "Lao",
    "lv": "Latvian",
    "men": "Mende",
    "mg": "Malagasy",
    "mi": "Maori",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Burmese",
    "ne": "Nepali",
    "niu": "Niuean",
    "nl": "Dutch",
    "no": "Norwegian",
    "ny": "Nyanja",
    "ur": "Pakistani",
    "pau": "Palauan",
    "pa": "Panjabi",
    "ps": "Pashto",
    "pis": "Pijin",
    "pl": "Polish",
    "pt": "Portuguese",
    "rn": "Kirundi",
    "ro": "Romanian",
    "ru": "Russian",
    "sg": "Sango",
    "si": "Sinhala",
    "sk": "Slovak",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tet": "Tetum",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tongan",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "zu": "Zulu"
}

const translateButton = document.getElementById("translateButton");
const fromSelector = document.getElementById("from")
const toSelector = document.getElementById("to")
const myTextBox = document.getElementById("fromText");
const toTextBox = document.getElementById("toText")

const detectLanguage = (value) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9dcdf9a8ddmsh2a5eda761e17e9bp1d6017jsn26fab8289d47',
            'X-RapidAPI-Host': 'translo.p.rapidapi.com'
        }
    };

    fetch(`https://translo.p.rapidapi.com/api/v3/detect?text=${value}`, options)
        .then(response => response.json())
        .then((response) => {
            // console.log(response.lang)
            fromSelector.value = response.lang;
            if (fromSelector.value == '') {
                const optionElement = document.createElement("option");
                optionElement.value = response.lang;
                optionElement.text = countries[response.lang];
                fromSelector.appendChild(optionElement);
                fromSelector.value = response.lang;
            }
        })
        .catch(err => console.error(err));
}

myTextBox.addEventListener("change", (event) => {
    console.log("Textbox value changed: ", event.target.value);
    detectLanguage(event.target.value)
});


for (const countryCode in countries) {
    const optionElement = document.createElement("option");
    optionElement.value = countryCode;
    optionElement.text = countries[countryCode];
    toSelector.appendChild(optionElement);
}

translateButton.addEventListener('click', () => {
    // console.log(from+" "+to)
    const word = document.getElementById("fromText").value;
    // console.log(word)
    const encodedParams = new URLSearchParams();
    encodedParams.append("from", fromSelector.value);
    encodedParams.append("to", toSelector.value);
    encodedParams.append("text", word);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '9dcdf9a8ddmsh2a5eda761e17e9bp1d6017jsn26fab8289d47',
            'X-RapidAPI-Host': 'translo.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://translo.p.rapidapi.com/api/v3/translate', options)
        .then(response => response.json())
        .then((data) => {
            // console.log(data.translated_text);
            toTextBox.value = data.translated_text
        })
        .catch(err => console.error(err));
})

const swapBtn = document.getElementById("Swap")
swapBtn.addEventListener('click', () => {
    // console.log('swap')
    const temp = toSelector.value;
    toSelector.value = fromSelector.value;
    fromSelector.value = temp;

    const tem = myTextBox.value
    myTextBox.value = toTextBox.value;
    toTextBox.value = tem

    detectLanguage(myTextBox.value)
})

const copyBtn = document.getElementById("Copy")
copyBtn.addEventListener('click', () => {
    toTextBox.select();
    navigator.clipboard.writeText(toTextBox.value);
    // alert("Copied the text: " + toTextBox.value);
})