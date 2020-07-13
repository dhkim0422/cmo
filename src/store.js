import Vue from 'vue'
import Vuex from 'vuex'
import axios from './utils/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        LABEL: 1,
        ICON: 2,
        HIGHLIGHT: 3,

        userInfo: {},
        loginAt: false,
        menuList: [], // 사용자 메뉴 리스트
        resultList: [], //목록을 위한 배열
        paginationInfo: {}, //페이징을 위한 배열
        params: {}, //조회조건을 유지하기 위한 object
        loading: true,
        result: {}, //상세화면
        checkIdList: [],  //테이블의 checkbox에 바인딩 된 id list
        analysisList: [], //통계 내역의 상위 태이블정보
        genericList: [],
        codeArr: [],
        STATUS: {
            READY: 'READY',
            WAIT: 'WAIT',
            RUNNING: 'RUNNING',
            FAILED: 'FAILED',
            SUCCESS: 'SUCCESS',
            REVIEW: 'REVIEW', 			// 심의 중
            CONFIRM: 'CONFIRM', 		// 승인대기
            COMPLETED: 'COMPLETED',	// 승인완료
            REJECT: 'REJECT',			// 반려
            ACCEPT: 'ACCEPT', 			// 승인
            RELEASED: 'RELEASED',
            CLOSED: 'CLOSED', 			// 분양완료일 때 사용
        },
        DATA_TYPE: {
            DISEASE: 'disease',
            USER: 'user',
            CODE: 'code',
            PROJECT: 'project',
            CLINIC_TARGET: 'target',
            CLINIC_SAMPLE: 'sample',
            CLINIC_STUDY: 'study',
            OMICS_DATA: 'omics',
            DISTIBUTE: 'distb',
        },
        DATA_SCOPE: {
            PUBLIC: 'PUBLIC',
            USER: 'USER',
            CONFIRM: 'CONFIRM',
            SYSTEM: 'SYSTEM',
        },
        ACTION: {
            CREATE: 'CREATE',
            CHANGE: 'CHANGE',
            REMOVE: 'REMOVE',
            SEARCH: 'SEARCH',
        },
        OMICS_TYPE: {
            ALL: 'ALL',
            NGS: 'NGS',
            Microarray: 'Microarray',
            Metabolome: 'Metabolome',
            Proteome: 'Proteome',
        }
    },
    getters: {
        geteCodeArr(state) {
            return state.codeArr
        },
        resultList(state) {
            console.log('getters.resultList', state.resultList)
            return state.resultList
        },
        paginationInfo(state) {
            console.log('getters.paginationInfo', state.paginationInfo)
            return state.paginationInfo
        },
        totalRecordCount(state) {
            console.log('getters.paginationInfo.totalRecordCount', state.paginationInfo.totalRecordCount)
            return state.paginationInfo.totalRecordCount
        },
        params(state) {
            console.log('getters.params', state.params)
            return state.params
        },
        loading(state) {
            console.log('getters.loading', state.loading)
            return state.loading
        },
        result(state) {
            console.log('getters.result', state.result)
            return state.result
        },
        genericList(state) {
            console.log('getters.genericList', state.genericList)
            return state.genericList
        },
        checkIdList(state) {
            return state.checkIdList
        },
        menuList(state) {
            return state.menuList
        },
        analysisList(state) {
            return state.analysisList
        },
        loginAt(state) {
            return state.loginAt
        }
    },
    mutations: {
        updatePaginationAndList(state, data) {
            // console.log('updatePaginationAndList', data)
            state.resultList = data.resultList
            state.paginationInfo = data.paginationInfo
        },
        updateLoadingState(state, loading) {
            state.loading = loading
        },

        setParams(state, params) {
            state.params = params
        },
        updateOne(state, data) {
            state.result = data
        },
        updateList(state, data) {
            state.result = data
        },
        updateGenericList(state, data) {
            state.genericList = data
        },
        updateCheckIdList(state, data) {
            state.checkIdList = data
        },
        updateMenuList(state, data) {
            state.menuList = data
        },
        updateAnalysisList(state, data) {
            state.analysisList = data
        },
        updateLoginAt(state, data) {
            state.loginAt = data
        },
        updateCodeArr(state, data) {
            state.codeArr = data
        }

    },
    actions: {
        async setCodeArr({commit}, payload) {

            let codeList = ['SNS', 'GEN', 'USR', 'PST', 'ARA', 'SSE', 'SOR', 'RSTYPE1', 'RSTYPE2', 'RSTYPE2B', 'STEP', 'IRBSTEP', 'OEXPER_N', 'OEXPER_E', 'MATR', 'RUTE']
            let dataList = {}
            for (const item of codeList) {

                let url = '/isg-oreo/ajax/codeGroups/' + item
                await axios.get(url, {params: payload.params}).then((response) => {
                    console.log(item, response.data.data.resultList)
                    dataList[item] = response.data.data.resultList
                })
            }
            console.log('codeList', dataList)
            commit('updateLoginAt', dataList)

        },
        setIsLoginAt({commit}, payload) {
            commit('updateLoginAt', payload)
        },
        //페이징 처리를 해야하는 목록
        loadPaginationAndList({commit}, payload) {
            let url = ''
            let isGet = true
            let componentName = payload.componentName
            if (componentName === 'ResistanceGenes')
                url = '/api/database/selectResistanceGeneList.do'
            else if (componentName === '') {
                url = '/common/code/getUserMenuList.json'

            }
            if (isGet) {
                return axios.get(url, {params: payload.params}).then((response) => {
                    commit('updatePaginationAndList', response.data)
                })
            } else {
                return axios.post(url, payload.params).then((response) => {
                    commit('updatePaginationAndList', response.data)
                })
            }
        },
        setParams({commit}, payload) {
            commit('setParams', payload)
        },

        //상세화면
        loadOne({commit}, payload) {

            axios.get(payload.url, {params: payload.params}).then((response) => {
                commit('updateOne', response.data)
            })
        },
        //페이징이 없는 목록조회
        loadGenericList({commit}, payload) {

            if (payload.method == 'post') {
                axios.post(payload.url, payload.params).then((response) => {
                    commit('updateGenericList', response.data)
                })
            } else {
                axios.get(payload.url, {params: payload.params}).then((response) => {
                    commit('updateGenericList', response.data)
                })
            }
        },

        //목록 변수와 pagination 초기화
        initPaginationAndList({commit}, payload) {
            commit('updatePaginationAndList', payload)
        },

        //테이블 checkbox id 초기화
        initCheckIdList({commit}, payload) {
            commit('updateCheckIdList', payload)
        },
        //테이블 checkbox id 초기화
        initMenuList({commit}, payload) {
            return axios.post(payload.url, payload.params).then((response) => {
                commit('updateMenuList', response.data)
            })
        },

        //테이블 checkbox id 초기화
        initAnalysisList({commit}, payload) {
            return axios.get(payload.url, payload.params).then((response) => {
                commit('updateAnalysisList', response.data)
            })
        },


    }


})
