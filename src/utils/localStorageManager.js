const localStorageManager = {
    saveUserDataToLocalStorage: (user) => {
        try {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        } catch (error) {
            console.error("Could not save user data to localStorage:", error);
        }
    },

    getLoggedInUserFromLocalStorage: () => {
        try {
            const userString = localStorage.getItem("loggedInUser");
            if (!userString) {
                return null;
            }
            const user = JSON.parse(userString);
            return user;
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            localStorage.removeItem("loggedInUser");
            return null;
        }
    },
    clearUserDataFromLocalStorage: () => {
        try {
            localStorage.removeItem("loggedInUser");
        } catch (error) {
            console.error("Could not clear user data from localStorage:", error);
        }
    }
}

export default localStorageManager;