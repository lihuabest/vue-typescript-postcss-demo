<template>
    <div class="datepicker-component">
        <div class="weekLabels">
            <span v-for="label in datepickerOptions.weekLabels" v-bind:key="label">{{ label }}</span>
        </div>
        <div class="dayLabels">
            <span v-for="date in time.dates" v-bind:key="date.id">
                <span v-bind:class="{ checked: date.checked, disabled: date.disabled, now: date.now }" v-on:click="dateClick(date)">{{ date.date }}<div class="ignore" v-if="date.dot"></div></span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import moment from 'moment';
    import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';

    export interface DatepickerOptions {
        weekLabels?: string[];
        format?: string | 'YYYY/MM/DD';
    }

    export interface DateInterface {
        year: number;
        month: number;
        date: number;
        hour: number;
        minute: number;
        second: number;
        now: boolean;
        checked: boolean;
        disabled: boolean;
        dot: boolean;
    }

    @Component({
        components: {}
    })
    export default class Datepicker extends Vue {

        @Prop() options!: DatepickerOptions; // 参数配置


        datepickerDefaultOptions = {
            weekLabels: ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'],
            format: 'YYYY/MM/DD HH:mm:ss',
        } as DatepickerOptions;              // 默认参数配置

        datepickerOptions!: DatepickerOptions; // 合并配置参数值

        @Prop()
        @Model('change') value!: Date;       // 时间值，双向绑定

        time = {
            year: 0,
            month: 0,
            date: 0,
            hour: 0,
            minute: 0,
            second: 0,
            dates: Array<DateInterface>(),
            dot: false
        };

        @Watch('value', { deep: true })     // 监测时间值变化，更新UI
        watchValue(newVal: any, oldVal: any) {
            if (newVal !== oldVal) {
                this.initTime(moment(newVal));
            }
        }

        created() {
            this.datepickerOptions = Object.assign(this.options || {}, this.datepickerDefaultOptions); // 合并配置值
            if (this.value) {
                this.initTime(moment(this.value));
            } else {
                this.$emit('change', new Date());
            }
        }

        timeAdd() {
            this.$emit('change', new Date());
        }

        /**
         * 初始化时间对象
         * @param date
         */
        initTime(date: any) {
            // 初始化当前时间
            this.time.year = date.year();
            this.time.month = date.month();
            this.time.date = date.date();
            this.time.hour = date.hour();
            this.time.minute = date.minute();
            this.time.second = date.second();

            // 初始化当月日期集合
            let dates = this.getMonthDate(this.time.month),
                nowDay = moment(new Date());
            this.time.dates.length = 0;

            for (let i = 1; i <= dates; i++) {
                this.time.dates.push({
                    year: this.time.year,
                    month: this.time.month,
                    date: i,
                    hour: this.time.hour,
                    minute: this.time.minute,
                    second: this.time.second,
                    now: nowDay.year() === this.time.year && nowDay.month() === this.time.month && nowDay.date() === i,
                    checked: this.time.date === i,
                    disabled: false,
                    dot: Math.random() > 0.5 // 是否有小红点，做个假的演示
                });
            }

            // 补充当前月 前面几天
            let firstDate = this.time.dates[0],
                firstDateM = moment([firstDate.year, firstDate.month, firstDate.date, firstDate.hour, firstDate.minute, firstDate.second]),
                firstDay = firstDateM.day();
            if (firstDay > 0) {
                for (let i = firstDay - 1; i >= 0; i--) {
                    firstDateM = firstDateM.add(-1, 'day');
                    this.time.dates.unshift({
                        year: firstDateM.year(),
                        month: firstDateM.month(),
                        date: firstDateM.date(),
                        hour: firstDateM.hour(),
                        minute: firstDateM.minute(),
                        second: firstDateM.second(),
                        now: false,
                        checked: false,
                        disabled: true,
                        dot: false
                    });
                }
            }

            // 补充当前月 后面几天
            let lastDate = this.time.dates[this.time.dates.length - 1],
                lastDateM = moment([lastDate.year, lastDate.month, lastDate.date, lastDate.hour, lastDate.minute, lastDate.second]),
                maxDates = 42;
            if (this.time.dates.length < maxDates) {
                for (let i = this.time.dates.length; i < maxDates; i++) {
                    lastDateM = lastDateM.add(1, 'day');
                    this.time.dates.push({
                        year: lastDateM.year(),
                        month: lastDateM.month(),
                        date: lastDateM.date(),
                        hour: lastDateM.hour(),
                        minute: lastDateM.minute(),
                        second: lastDateM.second(),
                        now: false,
                        checked: false,
                        disabled: true,
                        dot: false
                    });
                }
            }
        }

        /**
         * 返回指定月份的天数
         * @param {number} month
         * @returns {number}
         */
        getMonthDate(month: number) {
            if (this.isLeapYear(this.time.year)) {
                return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            } else {
                return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            }
        }

        /**
         * 判定是否是闰年
         * @param year
         * @returns {boolean} true 是闰年，false 不是闰年
         */
        isLeapYear(year: any) {
            return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
        }

        /**
         * 日期点击
         * @param {DateInterface} date
         */
        dateClick(date: any) {
            let d = new Date();
            d.setFullYear(date.year);
            d.setMonth(date.month);
            d.setDate(date.date);
            d.setHours(date.hour);
            d.setMinutes(date.minute);
            d.setSeconds(date.second);

            this.$emit('change', d);
        }
    }
</script>

<style lang="postcss">
    @import url(../../../assets/styles/variables.css);

    .datepicker-component {
        font-size: 22px;
        text-align: center;
        padding: 0 20px;
        & .weekLabels {
            padding: 20px 0 10px 0;
            & > span {
                width: 14.285%;
                display: inline-block;
                color: color(var(--text-color) a(0.5));
            }
        }
        & .dayLabels {
            padding: 10px 0;
            & > span {
                width: 14.285%;
                margin-bottom: 15px;
                display: inline-block;
                & > span {
                    width: 70px;
                    line-height: 70px;
                    border-radius: 50%;
                    display: inline-block;
                    transition: all 0.2s ease;
                    position: relative;
                    &.now {
                        background: color(#000 a(0.05));
                    }
                    &.disabled {
                        color: color(var(--text-color) a(0.3));
                    }
                    &.checked {
                        background: var(--green-color);
                        color: #fff;
                    }
                    // vm单位下 小部分的正方形渲染会失败 所以这里还是采用原始的px渲染
                    .ignore {
                        width: 4px;
                        height: 4px;
                        background: var(--red-color);
                        border-radius: 50%;
                        position: absolute;
                        left: 50%;
                        top: 75%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
    }
</style>
