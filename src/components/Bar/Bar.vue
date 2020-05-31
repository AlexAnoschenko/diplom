<template>
    <div class="bar-block">
        <div class="bar-logo-icon-group">
            <q-icon
                class="bar-logo"
                name="img:statics/icons/home_logo.png"
            ></q-icon>
            <span class="bar-text">ENGLISH FLATS</span>
        </div>
        <div class="registration-text" @click="registration = true">
            Регистрация
        </div>
        <div class="authorization-text" @click="authorization = true">
            Авторизация
        </div>
        <!-- <Registration></Registration> -->

        <!-- ФОРМА РЕГИСТРАЦИИ ------------------------------------------------------------->
        <q-dialog v-model="registration">
            <q-card class="registration-block">
                <q-input filled square v-model="user.username" hint="Login" />
                <q-input
                    filled
                    square
                    v-model="user.firstName"
                    hint="First name"
                />
                <q-input
                    filled
                    square
                    v-model="user.lastName"
                    hint="Last name"
                />
                <q-input
                    v-model="user.password"
                    filled
                    type="password"
                    hint="Password"
                />
                <q-input
                    v-model="user.passwordConfirmation"
                    filled
                    type="password"
                    hint="Password"
                />
                <q-input
                    v-model="user.email"
                    filled
                    type="email"
                    hint="Email"
                />
                <q-btn color="primary" label="Send" @click="sendUser(user)" />
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
                    hint="Password"
                />
                <q-btn
                    color="primary"
                    label="Enter"
                    @click="authoUser(authoData)"
                />
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Axios from 'axios';
// import Registration from "../Registration/Registration";

export default {
    name: 'Bar',
    // components: {
    //     Registration,
    // },
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

        // ОТПРАВКА ДАННЫХ ДЛЯ АВТОРИЗАЦИИ ---------------------------
        authoUser(authoData) {
            Axios.post(
                'https://cors-anywhere.herokuapp.com/http://3.128.24.28:3000/sign_in',
                {
                    login: authoData.authoLoginEmail,
                    password: authoData.authoPassword
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
        }
    }
};
</script>

<style lang="scss">
@import './Bar.scss';
</style>
