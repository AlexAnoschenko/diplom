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

        <transition-group class="apartments-list-block" name="fade" tag="div">
            <div
                class="apartment-item"
                v-show="apartments"
                v-for="item in apartmentsList"
                :key="getId(item.lister_url)"
            >
                <!-- <q-icon
                    class="apartment-img"
                    :name="`img:${item.img_url}`"
                ></q-icon> -->
                <q-card class="my-card">
                    <q-img :src="item.img_url" basic>
                        <div class="absolute-bottom text-subtitle2 text-center">
                            {{ item.title }}
                        </div>
                    </q-img>
                </q-card>
            </div>
        </transition-group>
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
                    console.log('--- Данные пришли ---');
                    return response;
                })
                .catch(function(error) {
                    return 404;
                });

            if (response === 404) {
                this.apartments = ApartmentsMock;
                console.log(this.apartments);
            } else {
                this.apartments = response;
            }
        },

        // Получение ID для key
        getId(str) {
            let subStrIndex = str.indexOf('detail-int/') + 11;
            return str.substr(subStrIndex, 25);
        }
    },

    computed: {
        // Возвращает массив квартир
        apartmentsList: function() {
            if (this.apartments) {
                return this.apartments.response.listings;
            }
            return [];
        }
    },

    mounted() {}
};
</script>

<style lang="scss">
@import '../css/index.scss';
</style>
