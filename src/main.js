import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "@/utils/axios.js";
import Default from "./layout/Default.vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

var eventBus = new Vue();
/*
부트스트랩
*/
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
/*
alert 셋팅
*/
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);



/*
vee-validate 3.3 설정
 */
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'; //
import ko from 'vee-validate/dist/locale/ko.json';
import * as rules from 'vee-validate/dist/rules';


// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

localize('ko', ko);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);


const requireComponent = require.context(
    // 컴포넌트들이 있는 폴더
    "./components",
    // 하위 폴더까지 포함할 지 여부
    false,
    // 기본 컴포넌트를 찾는데 사용할 정규표현식
    /\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
    // 컴포넌트 설정 가져오기
    const componentConfig = requireComponent(fileName);

    // 컴포넌트의 파스칼표기법 이름 가져오기
    const componentName = upperFirst(
        camelCase(
            // 파일이름 앞의 `./` 등 파스칼표기법 이름에 들어갈 필요없는
            // 기호들을 제거
            fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
        )
    );

    // 컴포넌트를 전역적으로 등록
    Vue.component(
        componentName,
        // `export default`를 이용한 컴포넌트는 `.default`로 컴포넌트
        // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
        componentConfig.default || componentConfig
    );
});


import moment from "moment";

Vue.component("default-layout", Default);

//전역 필터 정의
//3자리 콤마
Vue.filter("money", (value) => {
    if (!value) return value;

    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
});

//60자리 마다 <br> 태그 삽입
Vue.filter("htmlSeqFormat", (value) => {
    if (!value) return "";
    return value.replace(/(\w{60})/g, "$1<br>");
});

Vue.filter("date", (val) => {

    if(undefined === val) return
    var date = new Date(val);  //입력 파라메터로 Date 객체를 생성합니다

    var yyyy=date.getFullYear().toString(); // '연도'를 뽑아내고
    var mm = (date.getMonth()+1).toString(); // '월'을 뽑아내고
    var dd = date.getDate().toString(); // '일'을 뽑아냅니다

    var Str = '';

    //스트링 배열의 앞자리가 두자리 수가 아닌 한자리 수일 경우
    // 두자리로 표시하기 위해 0을 채웁니다(lpad 와 동일한 역할)
    // (ex : '1' -> '01' )
    Str += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +(dd[1] ? dd : '0' + dd[0]);

    return Str;
});

Vue.filter("byte", (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number')
    }

    var exponent
    var unit
    var neg = num < 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    if (neg) {
        num = -num
    }
    if (num < 1) {
        return (neg ? '-' : '') + num + ' B'
    }
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = (num / Math.pow(1000, exponent)).toFixed(2) * 1
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
});

Vue.filter("fileType", (data) => {
    var list = [];
    for (let i = 0; i < data.length; i++) {
        var txt = (data[i].name) ? data[i].name : "-";
        txt += (data[i].count) ? "(" + data[i].count + ")" : "(0)";
        list.push(txt);
    }

    return list.join(", ");

});

Vue.filter('groupNm', function (data, group) {

    var fileGroup = data;
    var omicsType = 'NGS';

    if (data.omicsType == '') { // 오믹스 파일인 경우
        return "";
    }else if (data.omicsType == 'NGS') { // 오믹스 파일인 경우
        omicsType = data.omicsType;
        fileGroup = group;
    }else if (data.omicsType == 'Metabolome') { // 오믹스 파일인 경우
        omicsType = data.omicsType;
        fileGroup = group;
    }else if (data.omicsType == 'Microarray') { // 오믹스 파일인 경우
        omicsType = data.omicsType;
        fileGroup = group;
    }else if (data.omicsType == 'Proteome') { // 오믹스 파일인 경우
        omicsType = data.omicsType;
        fileGroup = group;
    }else{
        omicsType = data.omics.omicsType;
        fileGroup = data.group;
    }

    if (fileGroup == 'rawdata')
        return "원천데이터";

    return (omicsType == 'Metabolome') ? "결과 데이터" : "가공 데이터";

});

Vue.config.productionTip = false;

// axios.defaults.baseURL = '/cmo'
Vue.prototype.$axios = axios;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");


