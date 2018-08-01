<template>
    <div class="login-page page">
        <img class="logo" src="../../assets/images/login-logo.png" alt="logo">
        <div class="form">
            <div class="username">
                <input type="text" placeholder="Username">
            </div>
            <div class="password">
                <input type="text" placeholder="Password">
            </div>
            <div class="forgot">
                <a>Forgot Password</a>
            </div>
        </div>
        <div class="submit" v-on:click="loginClick">Sign In</div>
        <div class="signup">
            <span>Don't have an account?</span>
            <a v-on:click="signupClick">Sign Up</a>
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

        loginClick() {
            this.$router.push({ path: '/index'});
        }

        signupClick() {
            this.$router.push({ path: '/signIn'});
        }
    }
</script>

<style lang="postcss">
    @import url(./login.css);
</style>
