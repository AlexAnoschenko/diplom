<template>
    <div class="private-block">
        <div class="private-window column">
            <div class="private-head row">
                <div class="head-left row">
                    <q-icon
                        class="head-left-icon"
                        name="img:statics/icons/happiness.png"
                    ></q-icon>
                    <div class="head-left-text">{{ CURRENT_USER.login }}</div>
                </div>
                <div
                    class="head-right"
                    v-html="
                        `Имя: ${CURRENT_USER.firstName} <br> 
                        Фамилия: ${CURRENT_USER.lastName} <br> 
                        Почта: ${CURRENT_USER.email}`
                    "
                ></div>
            </div>
            <div
                class="favorites-list row"
                v-for="item in FAVORITES_LIST"
                :key="item.id"
            ></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'PrivateSpace',

    data() {
        return {};
    },

    methods: {
        ...mapActions([])
    },

    computed: {
        ...mapGetters(['CURRENT_USER', 'FAVORITES_LIST'])
    },

    mounted() {}
};
</script>

<style lang="scss">
@import './PrivateSpace.scss';
</style>
