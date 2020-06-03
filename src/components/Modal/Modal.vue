<template>
    <transition name="fade">
        <div
            class="modal-block row justify-center"
            v-show="MODAL_STATE"
            @click.self="toggleModal"
        >
            <div class="modal-window column">
                <div class="row">
                    <q-img
                        class="modal-image"
                        :src="CURRENT_APARTMENT.img_url"
                        basic
                    >
                    </q-img>

                    <div class="modal-info column">
                        <div class="text-h4">{{ CURRENT_APARTMENT.title }}</div>

                        <br />

                        <div class="wrap">
                            Tags: {{ CURRENT_APARTMENT.keywords }}
                        </div>

                        <br />

                        <div class="text-h5">
                            Price: {{ CURRENT_APARTMENT.price_formatted }}
                        </div>

                        <br />

                        <div class="text-h6">
                            {{ CURRENT_APARTMENT.summary }}
                        </div>
                    </div>
                </div>

                <google-map
                    :name="name"
                    :longitude="CURRENT_APARTMENT.longitude"
                    :latitude="CURRENT_APARTMENT.latitude"
                ></google-map>
            </div>
        </div>
    </transition>
</template>

<script>
import googleMap from '../GoogleMap/GoogleMap';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Modal',
    components: {
        googleMap
    },

    data() {
        return {
            name: 'map'
        };
    },

    methods: {
        ...mapActions(['TOGGLE_MODAL']),

        toggleModal() {
            this.TOGGLE_MODAL();
        }
    },

    computed: {
        ...mapGetters(['MODAL_STATE', 'CURRENT_APARTMENT'])
    },

    mounted() {}
};
</script>

<style lang="scss">
@import './Modal.scss';
</style>
