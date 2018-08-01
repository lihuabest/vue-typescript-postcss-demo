<template>
    <div class="login-page signIn">
        <span class="back" v-on:click="backClick"></span>
        <p class="title">Sign Up</p>
        <div class="form">
            <div class="username">
                <input type="text" placeholder="Name">
            </div>
            <div class="email">
                <input type="text" placeholder="Email">
            </div>
            <div class="password">
                <input type="text" placeholder="Password">
            </div>
            <div class="birthday">
                <input type="text" placeholder="Birthday">
            </div>
        </div>
        <div class="submit">Join</div>
        <div class="signup">
            <span>Already have an account?</span>
            <a v-on:click="backClick">Sign In</a>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {

        }
    })
    export default class HelloWorld extends Vue {
        mounted() {
            this.$el.style.height = document.body.offsetHeight + 'px';
        }

        backClick() {
            this.$router.push({ path: '/login' });
        }
    }
</script>

<style lang="postcss">
    @import url(../login/login.css);
    .login-page {
        position: relative;
        min-height: 750px;
        &.signIn {
            background: url(../../assets/images/signIn-background.png) no-repeat center scroll / cover;
            & .back {
                width: 40px;
                height: 40px;
                background: url(../../assets/images/icon-back.png) no-repeat center scroll / cover;
                position: absolute;
                left: 30px;
                top: 50px;
                padding: 10px;
            }
            & .title {
                font-size: 60px;
                color: #fff;
                width: 100%;
                position: absolute;
                padding-left: 70px;
                top: 150px;
            }
            & .form {
                top: 20%;
                & > div {
                    &.email {
                        background: url(../../assets/images/icon-email.png) no-repeat 30px center scroll / 40px;
                    }
                    &.birthday {
                        background: url(../../assets/images/icon-birthday.png) no-repeat 30px center scroll / 40px;
                    }
                }
            }
        }
    }
</style>
