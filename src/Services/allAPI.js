import { commonAPI } from "../Services/commonAPI";
import { serverUrl } from "../Services/serverUrl";

export const registerAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/register`, reqBody, "")
}

export const loginAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/login`, reqBody, "")
}

export const addMovieAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addMovie`, reqBody, "")
}

export const getAllMoviesAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllMovies`, "", "")
}

export const getAMovieAPI = async (id) => {
    return await commonAPI('get', `${serverUrl}/api/getAMovie/${id}`, "", "")
}

export const addReviewsAPI = async (id, reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addReviews/${id}`, reqBody, "")
}

export const addEventAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addEvent`, reqBody, "")
}

export const getAllEventsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllEvents`, "", "")
}

export const getAEventAPI = async (id) => {
    return await commonAPI('get', `${serverUrl}/api/getAEvent/${id}`, "", "")
}

export const addSportAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addSport`, reqBody, "")
}

export const getAllSportsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllSports`, "", "")
}

export const getASportAPI = async (id) => {
    return await commonAPI('get', `${serverUrl}/api/getASport/${id}`, "", "")
}

export const addTestimonyAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addTestimony`, reqBody, "")
}

export const addMovieBookinsAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addMBookings`, reqBody, "")
}

export const addEventBookingsAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addEBookings`, reqBody, "")
}

export const addSportBookingsAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/addSBookings`, reqBody, "")
}

export const getAllMovieBookingsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllMovieBookings`, "", "")
}

export const getAllEventBookingsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllEventBookings`, "", "")
}

export const getAllSportBookingsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllSportBookings`, "", "")
}

export const getHomeMoviesAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getHomeMovies`, "", "")
}

export const getHomeEventsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getHomeEvents`, "", "")
}

export const getHomeSportsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getHomeSports`, "", "")
}

export const organiserRegisterAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/organiser/register`, reqBody, "")
}

export const organiserLoginAPI = async (reqBody) => {
    return await commonAPI('post', `${serverUrl}/api/organiser/login`, reqBody, "")
}

export const editMovieAPI = async (id, updatedData) => {
    return await commonAPI('put', `${serverUrl}/api/editMovie/${id}`, updatedData)
}

export const deleteMovieAPI = async (id) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteMovie/${id}`);
}

export const editEventAPI = async (id, updatedData) => {
    return await commonAPI('put', `${serverUrl}/api/editEvent/${id}`, updatedData)
}

export const deleteEventAPI = async (id) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteEvent/${id}`);
}

export const editSportAPI = async (id, updatedData) => {
    return await commonAPI('put', `${serverUrl}/api/editSport/${id}`, updatedData)
}

export const deleteSportAPI = async (id) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteSport/${id}`);
}

export const getAllReviewsAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/reviews`, "", "")
}

export const deleteReviewAPI = async (movieId, reviewId) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteReview/${movieId}/${reviewId}`);
};

export const getAllUsersAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllUsers`, "", "")
}

export const getAllOrganisersAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllOrganisers`, "", "")
}

export const getAllTestimoniesAPI = async () => {
    return await commonAPI('get', `${serverUrl}/api/getAllTestimonies`, "", "")
}

export const deleteUserAPI = async (id) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteUser/${id}`);
}

export const deleteOrganiserAPI = async (id) => {
    return await commonAPI('delete', `${serverUrl}/api/deleteOrganiser/${id}`);
}