import api from "./api";
import API_PATHS from "./apiPaths";

export const spotifyLogin = () => {
    window.location.href = API_PATHS.AUTH.SPOTIFY_LOGIN;
}

export const getCurrentUser = async () => {
    try {
        const { data } = await api.get(API_PATHS.AUTH.GET_USER);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch user data");
    }
}

export const deleteAccount = async () => {
    try {
        await api.delete(API_PATHS.AUTH.DELETE_ACCOUNT);
    } catch (error) {
        throw new Error("Failed to delete account");
    }
}