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
            currentApartment: null
        },

        mutations: {
            CHANGE_MODAL: (state, payload) => {
                if (payload) {
                    state.isModalOpen = !state.isModalOpen;
                    state.currentApartment = payload;
                } else {
                    state.isModalOpen = !state.isModalOpen;
                }
            },

            CHANGE_APARTMENTS: (state, payload) => {
                state.apartments = payload;
            }
        },

        actions: {
            TOGGLE_MODAL({ commit }, payload) {
                commit('CHANGE_MODAL', payload);
            },

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
            }
        },

        getters: {
            MODAL_STATE(state) {
                return state.isModalOpen;
            },

            APARTMENTS_STATE(state) {
                return state.apartments;
            },

            CURRENT_APARTMENT(state) {
                return state.currentApartment;
            }
        }
    });

    return Store;
}
