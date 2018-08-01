<template>
    <div class="index-page">
        <span class="menu"></span>
        <span class="search"></span>
        <div class="header">
            <h1 class="title">Good Morning!</h1>
            <div class="avatar">
                <img src="../../assets/images/avatar.png" alt="">
                <span>2</span>
            </div>
            <div class="datepick-bar">
                <span class="left" v-on:click="monthClick('prev')"></span>
                <span class="month">{{ monthLabel() }}</span>
                <span class="right" v-on:click="monthClick('next')"></span>
            </div>
        </div>
        <div>
            <datepicker-component options="datepickerOptions" v-model="time"></datepicker-component>
        </div>
        <div class="notes">
            <ul>
                <li v-for="item in notes" v-bind:key="item.id"
                    v-bind:class="{overdue: item.status === 'overdue', snoozed: item.status === 'snoozed', completed: item.status === 'completed',}">
                    <img :src="item.avatar">
                    <div>{{ item.title }}</div>
                    <div class="t">{{ item.time }}</div>
                </li>
            </ul>
        </div>
        <a class="add">
            <img src="../../assets/images/icon-add.png" alt="">
        </a>
    </div>
</template>

<script lang="ts">
    import moment from 'moment';
    import { Component, Vue } from 'vue-property-decorator';
    import { DatepickerOptions } from '@/libraries/components/datepicker/Datepicker.vue';

    @Component({
        components: {

        }
    })
    export default class HelloWorld extends Vue {
        datepickerOptions = {} as DatepickerOptions;
        time = new Date();

        notes = [
            {
                avatar: require('../../assets/images/avatar-1.png'),
                title: 'New subpage for Janet',
                time: '8 - 10am',
                status: 'overdue'
            },
            {
                avatar: require('../../assets/images/avatar-2.png'),
                title: 'Catch up with Tom',
                time: '11 - 12am  Hangouts',
                status: 'snoozed'
            },
            {
                avatar: require('../../assets/images/avatar-3.png'),
                title: 'Lunch with Diane',
                time: '1pm Restaurant',
                status: 'completed'
            }
        ];

        monthClick(type: string) {
            const v = type === 'prev' ? moment(this.time).add(-1, 'M') : moment(this.time).add(1, 'M');
            this.time = new Date(v.valueOf());
        }

        monthLabel() {
            const v = moment(this.time);
            return v.year() + ' / ' + moment.months()[v.month()].toUpperCase().substr(0, 3);
        }
    }
</script>

<style lang="postcss">
    @import url(../../assets/styles/variables.css);
    .index-page {
        position: relative;
        & .menu, .search {
            position: absolute;
            width: 42px;
            height: 42px;
            display: inline-block;
            top: 50px;
            z-index: 1;
        }
        & .menu {
            left: 20px;
            background: url(../../assets/images/icon-menu.png) no-repeat center scroll / cover;
        }
        & .search {
            right: 20px;
            background: url(../../assets/images/icon-search.png) no-repeat center scroll / cover;
        }
        & .header {
            height: 700px;
            background: url(../../assets/images/index-header-background.png) no-repeat center scroll / cover;
            text-align: center;
            position: relative;
            color: #fff;
            & .title {
                position: relative;
                top: 150px;
            }
            & .avatar {
                position: relative;
                top: 230px;
                & img {
                    width: 223px;
                }
                & span {
                    width: 60px;
                    line-height: 60px;
                    position: absolute;
                    background: var(--green-color);
                    border-radius: 50%;
                    left: 58%;
                }
            }
            & .datepick-bar {
                position: relative;
                top: 320px;
                & .left, .right {
                    position: absolute;
                    width: 18px;
                    height: 33px;
                }
                & .left {
                    left: 50px;
                    background: url(../../assets/images/icon-chevron-left.png) no-repeat center scroll / cover;
                }
                & .right {
                    right: 50px;
                    background: url(../../assets/images/icon-chevron-right.png) no-repeat center scroll / cover;
                }
            }
        }
        & .notes {
            li {
                border-bottom: 1px solid #EAEAEA;
                position: relative;
                padding: 20px 0;
                border-left: 6px solid transparent;
                &.overdue {
                    border-left-color: #BA77FF;
                }
                &.snoozed {
                    border-left-color: #FBAA53;
                }
                &.completed {
                    border-left-color: var(--green-color);
                }
                &:nth-child(1) {
                    border-top: 1px solid #EAEAEA;
                }
                img {
                    position: absolute;
                    width: 93px;
                    top: 20px;
                    left: 20px;
                }
                div {
                    margin-left: 150px;
                    padding-bottom: 10px;
                    margin-top: 10px;
                    font-size: 30px;
                    &.t {
                        color: color(var(--text-color) a(0.3));
                        font-size: 24px;
                        margin-bottom: 0;
                    }
                }
            }
        }

        .add {
            width: 110px;
            height: 110px;
            position: fixed;
            right: 30px;
            bottom: 30px;
            background: var(--red-color);
            border-radius: 50%;
            text-align: center;
            img {
                width: 44px;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>
