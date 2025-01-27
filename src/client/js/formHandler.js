/* Global variables */
const errorElement = document.getElementById('error');
const scoreElement = document.getElementById('score');
const agreementElement = document.getElementById('agreement');
const subjectivityElement = document.getElementById('subjectivity');
const confidentElement = document.getElementById('confidence');
const ironyElement = document.getElementById('irony');
const textElement = document.getElementById('text');

// Aylien API URL and credentials from environment variables
const aylienAPIUrl = 'https://api.aylien.com/api/v1/sentiment';
const aylienAPIKey = process.env.AYLIEN_API_KEY; // Load from .env
const aylienAPIAppId = process.env.AYLIEN_APP_ID; // Load from .env

/* Function to handle form submission */
const handleSubmit = async (event) => {
    console.log("::: Form Submitted ::: -> handleSubmit event");
    event.preventDefault();

    // Clear results from the last submit
    clearUI();

    const userInputURL = document.getElementById('name').value;

    // Validate the URL
    if (checkForUrl(userInputURL)) {
        console.log('[Client] URL input is valid!');

        // Post the URL to the Aylien API
        try {
            const data = await getSentimentData(userInputURL);
            if (data) {
                // Update the UI with the server response
                updateUI(data);
            }
        } catch (error) {
            console.error('[Client] Error during fetch:', error);
            displayError('An error occurred while fetching data. Please try again.');
        }
    } else {
        // Display an error message for invalid URL
        displayError('Invalid URL. Please make sure the URL has no spaces and starts with http:// or https://');
        console.log('[Client] Invalid URL');
    }
};

/* Function to GET data from the Aylien API */
const getSentimentData = async (url) => {
    console.log("[Client] getSentimentData");

    const response = await fetch(aylienAPIUrl, {
        method: 'POST',
        headers: {
            'X-AYLIEN-APIKEY': aylienAPIKey,
            'X-AYLIEN-APPLICATION-ID': aylienAPIAppId,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
    });

    try {
        const newData = await response.json();
        console.log('[Client] Data received:', newData);
        return newData;
    } catch (error) {
        console.error('[Client] Error on getSentimentData:', error);
        throw error;
    }
};


/* Function to update the UI with the server response */
const updateUI = (data) => {
    // Clear any previous error
    clearError();

    // Update the UI elements with the received data
    scoreElement.innerHTML = 'Polarity: ' + parseScoreValue(data.polarity);
    agreementElement.innerHTML = `Agreement: ${data.agreement}`;
    subjectivityElement.innerHTML = `Subjectivity: ${data.subjectivity}`;
    confidentElement.innerHTML = `Confidence: ${data.confidence}`;
    ironyElement.innerHTML = `Irony: ${data.irony}`;
    textElement.innerHTML = `Text: ${data.text || "No text available"}`;
};

/* Function to clear the UI results */
const clearUI = () => {
    errorElement.innerHTML = '';
    scoreElement.innerHTML = '';
    agreementElement.innerHTML = '';
    subjectivityElement.innerHTML = '';
    confidentElement.innerHTML = '';
    ironyElement.innerHTML = '';
    textElement.innerHTML = '';
};

/* Function to display error messages */
const displayError = (message) => {
    errorElement.innerHTML = message;
    errorElement.classList.add('error');
};

/* Function to clear errors */
const clearError = () => {
    errorElement.innerHTML = '';
    errorElement.classList.remove('error');
};

/* Function to describe score values */
function parseScoreValue(score) {
    switch (score) {
        case "positive":
            return "Positive";
        case "neutral":
            return "Neutral";
        case "negative":
            return "Negative";
        default:
            return "No sentiment";
    }
}

// Export the necessary functions
export {
    handleSubmit,
    parseScoreValue
};
