import Datepicker from './components/datepicker/Datepicker.vue';

export default {
    install: (Vue: any) => {
        // 注册
        // 自定义组件
        Vue.component('datepicker-component', Datepicker);
    }
};
