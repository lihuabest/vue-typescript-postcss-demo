<template>
    <router-view/>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class HelloWorld extends Vue {

    }
</script>

<style lang="postcss">
    @import url(./assets/styles/global.css);
</style>
