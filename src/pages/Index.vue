<template>
    <q-page>
        <Bar></Bar>
        <div class="input-block row">
            <q-input
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
import Bar from "../components/Bar/Bar";
import Axios from "axios";

export default {
    name: "PageIndex",
    components: {
        Bar,
    },
    data() {
        return {
            city: "london",
        };
    },
    methods: {
        // ОТПРАВКА НАЗВАНИЯ ГОРОДА ---------------------------
        getApartments(city) {
            if (!city) {
                return;
            }
            Axios.get(
                "https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api?",
                {
                    params: {
                        country: "uk",
                        pretty: 1,
                        action: "search_listings",
                        encoding: "json",
                        listing_type: "buy",
                        place_name: city,
                    },
                }
            )
                .then((response) => {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style lang="scss">
@import "../css/index.scss";
</style>
