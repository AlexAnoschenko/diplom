import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import ApartmentsMock from '../pages/apartmentsMock';

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
    const Store = new Vuex.Store({
        state: {
            isModalOpen: false,
            apartments: null,
            currentApartment: null,
            favorites: [],
            user: {
                id: null,
                login: null,
                firstName: null,
                lastName: null,
                email: null
            },
            isPrivateSpace: false
        },

        mutations: {
            // Открыть\закрыть модалку --------------------------------------------
            CHANGE_MODAL: (state, payload) => {
                if (payload) {
                    state.isModalOpen = !state.isModalOpen;
                    state.currentApartment = payload;
                } else {
                    state.isModalOpen = !state.isModalOpen;
                }
            },

            // Загрузка списка квартир ---------------------------------------------
            CHANGE_APARTMENTS: (state, payload) => {
                if (payload) {
                    state.apartments = payload;
                } else {
                    state.apartments = null;
                }
            },

            // Загрузка избранного -------------------------------------------------
            CHANGE_FAVORITES: (state, payload) => {
                state.favorites = payload;
            },

            // Авторизация юзера ---------------------------------------------------
            CHANGE_USER: (state, payload) => {
                if (payload) {
                    state.user.id = payload.id;
                    state.user.login = payload.attributes.username;
                    state.user.firstName = payload.attributes.first_name;
                    state.user.lastName = payload.attributes.last_name;
                    state.user.email = payload.attributes.email;
                } else {
                    state.user.id = null;
                    state.user.login = null;
                    state.user.firstName = null;
                    state.user.lastName = null;
                    state.user.email = null;
                }
            },

            // Личный кабинет -------------------------------------------------------
            CHANGE_PRIVATE_SPACE: (state, payload) => {
                state.isPrivateSpace = payload;
            }
        },

        actions: {
            // Открыть\закрыть модалку --------------------------------------------
            TOGGLE_MODAL({ commit }, payload) {
                commit('CHANGE_MODAL', payload);
            },

            // Загрузка списка квартир ---------------------------------------------
            async GET_APARTMENTS({ commit }, payload) {
                if (!payload) {
                    return;
                }
                let response = await Axios.get(
                    'https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?',
                    {
                        params: {
                            country: 'uk',
                            pretty: 1,
                            action: 'search_listings',
                            encoding: 'json',
                            listing_type: 'buy',
                            place_name: payload
                        }
                    }
                )
                    .then(response => {
                        return response;
                    })
                    .catch(() => {
                        return 404;
                    });

                if (response === 404) {
                    commit(
                        'CHANGE_APARTMENTS',
                        ApartmentsMock.response.listings
                    );
                } else {
                    commit('CHANGE_APARTMENTS', response.response.listings);
                }
            },

            // Загрузка избранного ---------------------------------------------
            async ADD_FAVORITES({ commit }, payload) {
                let response = await Axios.post(
                    'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/favourites',
                    {
                        user_id: payload.id,
                        favourite_object: JSON.stringify(
                            payload.currentApartment
                        )
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(response => {
                        console.log(
                            '------------ ADD_FAVORITES ----------------------'
                        );
                        console.log(response);
                        console.log(
                            '-------------------------------------------------'
                        );
                        return response.data.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                commit('CHANGE_FAVORITES', response);
            },

            // Удаление избранного -------------------------------------------------
            async DELETE_FAVORITES({ commit }, payload) {
                let response = await Axios.delete(
                    `https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/favourites/${payload}`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(response => {
                        console.log(
                            '------------- DELETE_FAVORITES -------------------'
                        );
                        console.log(response);
                        console.log(
                            '--------------------------------------------------'
                        );
                        return response.data.data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                commit('CHANGE_FAVORITES', response);
            },

            // Авторизация ----------------------------------------------------------
            async LOGIN_USER({ commit }, payload) {
                let response = await Axios.post(
                    'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/sign_in',
                    {
                        login: payload.login,
                        password: payload.password
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(response => {
                        console.log(
                            '--------- LOGIN_USER -------------------------'
                        );
                        console.log(response);
                        console.log(
                            '----------------------------------------------'
                        );
                        return response;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                commit('CHANGE_USER', response.data.data);
                commit('CHANGE_FAVORITES', response.data.included);
            },

            // Логаут ---------------------------------------------------------------
            LOGOUT_USER({ commit }) {
                console.log('----------- LOGOUT_USER ---------------------');

                commit('CHANGE_USER');
                commit('CHANGE_APARTMENTS');
            },

            // Открыть\закрыть личный кабинет ---------------------------------------
            TOGGLE_PRIVATE_SPACE({ commit }, payload) {
                commit('CHANGE_PRIVATE_SPACE', payload);
            }
        },

        getters: {
            // Состояние модалки -------------------------------------------
            MODAL_STATE(state) {
                return state.isModalOpen;
            },

            // Список квартир ----------------------------------------------
            APARTMENTS_STATE(state) {
                return state.apartments;
            },

            // Текущая квартира --------------------------------------------
            CURRENT_APARTMENT(state) {
                return state.currentApartment;
            },

            // Текущий юзер ------------------------------------------------
            CURRENT_USER(state) {
                return state.user;
            },

            // Массив избранного -------------------------------------------
            FAVORITES_LIST(state) {
                return state.favorites;
            },

            PRIVATE_SPACE_STATE(state) {
                return state.isPrivateSpace;
            }
        }
    });

    return Store;
}
