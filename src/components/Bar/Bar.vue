<template>
    <div class="bar-block">
        <div class="bar-logo-icon-group">
            <q-icon
                class="bar-logo"
                name="img:statics/icons/home_logo.png"
            ></q-icon>
            <span class="bar-text">ENGLISH FLATS</span>
        </div>
        <div v-if="!CURRENT_USER.id">
            <div class="registration-text" @click="registration = true">
                Регистрация
            </div>
            <div class="authorization-text" @click="authorization = true">
                Авторизация
            </div>
        </div>

        <div
            class="authorization-text"
            v-if="CURRENT_USER.id"
            @click="logoutUser"
        >
            Выйти
        </div>

        <!-- ФОРМА РЕГИСТРАЦИИ ------------------------------------------------------------->
        <q-dialog v-model="registration">
            <q-card class="registration-block">
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.username"
                    label="Login"
                />
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.firstName"
                    label="First name"
                />
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.lastName"
                    label="Last name"
                />
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.password"
                    type="password"
                    label="Password"
                />
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.passwordConfirmation"
                    type="password"
                    label="Password Confirmation"
                />
                <q-input
                    class="input-data"
                    rounded
                    outlined
                    v-model="user.email"
                    type="email"
                    label="Email"
                />
                <q-btn
                    class="registration-button"
                    color="primary"
                    label="Send"
                    @click="sendUser(user)"
                />
            </q-card>
        </q-dialog>

        <!-- ФОРМА АВТОРИЗАЦИИ ------------------------------------------------------------->
        <q-dialog v-model="authorization">
            <q-card class="authorization-block">
                <q-input
                    filled
                    square
                    v-model="authoData.authoLoginEmail"
                    hint="Login or Email"
                />
                <q-input
                    filled
                    square
                    v-model="authoData.authoPassword"
                    type="password"
                    hint="Password"
                />
                <q-btn
                    color="primary"
                    label="Enter"
                    @click="
                        loginUser({
                            login: authoData.authoLoginEmail,
                            password: authoData.authoPassword
                        })
                    "
                />
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Bar',

    data() {
        return {
            // ФОРМЫ ------------------------------------------------
            registration: false,
            authorization: false,

            // ДАННЫЕ ДЛЯ РЕГИСТРАЦИИ -------------------------------
            user: {
                username: null,
                firstName: null,
                lastName: null,
                password: null,
                passwordConfirmation: null,
                email: null
            },

            // ДАННЫЕ ДЛЯ АВТОРИЗАЦИИ -------------------------------
            authoData: {
                authoLoginEmail: null,
                authoPassword: null
            }
        };
    },
    methods: {
        // ОТПРАВКА ДАННЫХ ДЛЯ РЕГИСТРАЦИИ ---------------------------
        sendUser(user) {
            Axios.post(
                'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/sign_up',
                {
                    username: user.username,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    password: user.password,
                    password_confirmation: user.passwordConfirmation,
                    email: user.email
                },
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

        ...mapActions(['LOGIN_USER', 'LOGOUT_USER']),

        loginUser({ login, password }) {
            this.LOGIN_USER({
                login,
                password
            });
        },

        logoutUser() {
            this.LOGOUT_USER();
        }
    },

    computed: {
        ...mapGetters(['CURRENT_USER'])
    }
};
</script>

<style lang="scss">
@import './Bar.scss';
</style>
