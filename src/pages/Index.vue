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

        <Modal></Modal>
    </q-page>
</template>

<script>
import Bar from '../components/Bar/Bar';
import Modal from '../components/Modal/Modal';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PageIndex',
    components: {
        Bar,
        Modal
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
        ...mapActions(['TOGGLE_MODAL', 'GET_APARTMENTS']),

        // Открыть\закрыть модалку
        toggleModal(apartnemt) {
            this.TOGGLE_MODAL(apartnemt);
        },

        // Запрос на сервер
        getApartments(city) {
            this.GET_APARTMENTS(city);
        }
    },

    computed: {
        // Получение геттеров из стора
        ...mapGetters(['MODAL_STATE', 'APARTMENTS_STATE'])
    },

    mounted() {}
};
</script>

<style lang="scss">
@import '../css/index.scss';
</style>
