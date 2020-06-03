<template>
    <div class="profile-block" v-if="CURRENT_USER.id">
        <div class="row">
            <q-icon
                class="profile-icon"
                name="img:statics/icons/happiness.png"
            ></q-icon>

            <div
                class="profile-hello"
                v-html="`Здравствуйте, <br>${CURRENT_USER.login}`"
            ></div>
        </div>
        <div
            class="favorives-text"
            v-html="`Избранные квартиры: ${FAVORITES_LIST.length}`"
        ></div>
        <q-btn
            class="profile-button glossy"
            rounded
            color="deep-orange"
            label="Личный кабинет"
            no-caps
            @click="togglePrivateSpace(true)"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Profile',

    data() {
        return {};
    },

    methods: {
        ...mapActions(['TOGGLE_PRIVATE_SPACE']),

        togglePrivateSpace(value) {
            this.TOGGLE_PRIVATE_SPACE(value);
        }
    },

    computed: {
        ...mapGetters(['CURRENT_USER', 'FAVORITES_LIST'])
    },

    mounted() {}
};
</script>

<style lang="scss">
@import './Profile.scss';
</style>
