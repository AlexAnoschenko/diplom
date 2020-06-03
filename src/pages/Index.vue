<template>
    <q-page>
        <q-btn
            class="delete-button"
            round
            color="amber"
            glossy
            text-color="black"
            icon="delete"
            @click="deleteData"
        />

        <q-btn
            class="delete-fav-button"
            round
            color="amber"
            glossy
            text-color="black"
            icon="clear"
            @click="deleteFavData"
        />

        <Bar></Bar>

        <!--------------------------------- ФОН ---------------------------------->
        <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
            rel="stylesheet"
            type="text/css"
        />
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <!------------------------------------------------------------------------->

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

        <transition-group
            class="apartments-list-block"
            name="fade"
            tag="div"
            v-if="!PRIVATE_SPACE_STATE"
        >
            <div
                class="apartment-item"
                v-show="APARTMENTS_STATE"
                v-for="item in APARTMENTS_STATE"
                :key="getId(item.lister_url)"
                @click="toggleModal(item)"
            >
                <q-card class="my-card">
                    <q-img :src="item.img_url" basic>
                        <div class="absolute-bottom text-subtitle2 text-center">
                            {{ item.title }}
                        </div>
                    </q-img>
                </q-card>
            </div>
        </transition-group>

        <PrivateSpace v-if="PRIVATE_SPACE_STATE"></PrivateSpace>

        <Profile></Profile>

        <Modal></Modal>
    </q-page>
</template>

<script>
import Axios from 'axios';
import Bar from '../components/Bar/Bar';
import Modal from '../components/Modal/Modal';
import Profile from '../components/Profile/Profile';
import PrivateSpace from '../components/PrivateSpace/PrivateSpace';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PageIndex',

    components: {
        Bar,
        Modal,
        Profile,
        PrivateSpace
    },

    data() {
        return {
            city: 'London'
        };
    },

    methods: {
        // Получение ID для key ---------------------------------------------------
        getId(str) {
            let subStrIndex = str.indexOf('detail-int/') + 11;
            return str.substr(subStrIndex, 25);
        },

        // Получение экшенов из стора ----------------------------------------------
        ...mapActions([
            'TOGGLE_MODAL',
            'GET_APARTMENTS',
            'TOGGLE_PRIVATE_SPACE'
        ]),

        togglePrivateSpace(value) {
            this.TOGGLE_PRIVATE_SPACE(value);
        },

        // Открыть\закрыть модалку
        toggleModal(apartnemt) {
            this.TOGGLE_MODAL(apartnemt);
        },

        // Запрос на сервер
        getApartments(city) {
            this.togglePrivateSpace(false);
            this.GET_APARTMENTS(city);
        },

        // ОЧИСТКА БАЗЫ ДАННЫХ ------------------------------------------------------
        deleteData() {
            Axios.get(
                'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/delete_data',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        deleteFavData() {
            Axios.get(
                'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/delete_all_favourites',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(response => {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },

    computed: {
        // Получение геттеров из стора
        ...mapGetters([
            'MODAL_STATE',
            'APARTMENTS_STATE',
            'PRIVATE_SPACE_STATE'
        ])
    },

    mounted() {}
};
</script>

<style lang="scss">
@import '../css/index.scss';
</style>
