<template>
    <q-page>
        <Bar></Bar>
        <div class="input-block row">
            <q-input
                @keydown.enter.prevent="getApartments(city)"
                class="main-input"
                rounded
                outlined
                v-model="city"
                label="Введите город"
                bg-color="grey"
            />
            <q-btn
                class="go-button"
                label="Go!"
                push
                round
                color="grey"
                @click="getApartments(city)"
            />
        </div>
    </q-page>
</template>

<script>
import ApartmentsMock from 'pages/apartmentsMock';
import Bar from '../components/Bar/Bar';
import Axios from 'axios';

export default {
    name: 'PageIndex',
    components: {
        Bar
    },

    data() {
        return {
            apartments: null,
            city: 'london',
            ex: null
        };
    },

    methods: {
        // ОТПРАВКА НАЗВАНИЯ ГОРОДА ---------------------------
        async getApartments(city) {
            if (!city) {
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
                        place_name: city
                    }
                }
            )
                .then(response => {
                    return response;
                })
                .catch(function(error) {
                    return 404;
                });

            if (response === 404) {
                this.apartments = ApartmentsMock;
            } else {
                this.apartments = response;
            }
        }
    },

    mounted() {}
};
</script>

<style lang="scss">
@import '../css/index.scss';
</style>
