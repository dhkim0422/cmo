import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/utils/axios.js'
import Default from './layout/Default.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import vuetify from './vuetify'


const requireComponent = require.context(
    // 컴포넌트들이 있는 폴더
    './components',
    // 하위 폴더까지 포함할 지 여부
    false,
    // 기본 컴포넌트를 찾는데 사용할 정규표현식
    /\w+\.(vue|js)$/
)


requireComponent.keys().forEach(fileName => {
    // 컴포넌트 설정 가져오기
    const componentConfig = requireComponent(fileName)

    // 컴포넌트의 파스칼표기법 이름 가져오기
    const componentName = upperFirst(
        camelCase(
            // 파일이름 앞의 `./` 등 파스칼표기법 이름에 들어갈 필요없는
            // 기호들을 제거
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    )

    // 컴포넌트를 전역적으로 등록
    Vue.component(
        componentName,
        // `export default`를 이용한 컴포넌트는 `.default`로 컴포넌트
        // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
        componentConfig.default || componentConfig
    )
})


let Bootstrap = require('bootstrap');
import moment from 'moment'

Vue.component('default-layout', Default);

//전역 필터 정의
//3자리 콤마
Vue.filter('money', value => {
    if (!value)
        return value

    return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
})

//60자리 마다 <br> 태그 삽입
Vue.filter('htmlSeqFormat', value => {
    if (!value)
        return ''

    return value.replace(/(\w{60})/g, "$1<br>")
})

Vue.filter('date', function(value) {
    if (value) {
        return moment(String(value)).format('yyyy-MM-dd')
    }
})


Vue.config.productionTip = false;

// axios.defaults.baseURL = '/cmo'
Vue.prototype.$axios = axios

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
