export const errorHandler = (error, defaultMsg = "An unexpected error occurred.", errorCodes = []) => {
    // network error
    if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
    }

    // request made but no response 
    if (!error.response) {
        throw new Error("Unable to reach server");
    }

    if (error.response.status === 500) {
        throw new Error("Server error. Please try again later.");
    }
    const err = error.response.data.error;

    if (errorCodes.includes(err?.code)) {
        throw err;
    }

    throw new Error(defaultMsg);
}