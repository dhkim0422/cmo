<template>
    <header>
        <nav class="container">
            <h1 class="navbar-brand pointer" @click="goto('/')">
                <a home>
                    <span class="sr-only">로고</span>
                </a>
            </h1>
            <ul class="menu" id="mainMenu">
                <li>
                    <a class="pointer" @click="goto('/database/resistanceGenes')" title="DATABASE">DATABASE</a>
                    <ul>
                        <li><a class="pointer" @click="goto('/database/resistanceGenes')" title="항생제 내성 유전자(ARG)">항생제 내성
                            유전자(ARG)</a></li>
                        <li><a class="pointer" @click="goto('/database/resistanceClass')" title="항생제 내성 유전자 class">항생제
                            내성 유전자 class</a></li>
                        <li><a class="pointer" @click="goto('/database/antiBiotic')" title="항생제">항생제</a></li>
                        <li><a class="pointer" @click="goto('/database/disease')" title="질병">질병</a></li>
                        <li><a class="pointer" @click="goto('/database/pathogen')" title="병원균">병원균</a></li>
                    </ul>
                </li>
                <li><a class="pointer" @click="goto('/analysis/analysis')" title="ANALYSIS">ANALYSIS</a></li>
                <li>
                    <a class="pointer" @click="goto('/blast/blastSearch')" title="내정보">내정보</a>
                    <ul>
                    </ul>
                </li>
                <li><a class="pointer" @click="goto('/project/projectList')" title="과제 목록">과제 목록</a></li>
                <li><a class="pointer" @click="goto('/target/targetList')" title="연구대상자 목록">연구대상자 목록</a></li>
                <li><a class="pointer" @click="goto('/samples/samplesList')" title="샘플 목록">샘플 목록</a></li>
                <li>


                    <a v-if="$store.getters.loginAt" class="pointer" @click="logout()" title="LOGOUT" :class="loginBtnClass">LOGOUT</a>
                    <a v-else class="pointer" @click="$router.push({name: 'login'})" title="LOG IN"
                       :class="loginBtnClass">LOG IN</a>
                </li>
            </ul>
        </nav>
        <div class="bg-container bg-sm ng-scope">
            <div class="container">
                <!-- 제목 -->
                <ol class="path">
                    <li class="path-item">대메뉴</li>
                    <li class="path-item"><h1 class="h1">제목</h1></li>
                </ol>
            </div>
        </div>
    </header>
</template>

<script>
    import axios from '@/utils/axios.js'

    export default {
        name: 'vHeader',
        created() {
            //생성시 토큰이 존재하는지 확인 후 토큰이 있으면 로그인 된것으로 판단한다.
            if (localStorage.getItem('x-auth-token') != null)
                this.$store.dispatch('setIsLoginAt', true)

            //처음에 공통코드를 전부 불러온다.
            //this.$store.dispatch('setCodeArr', {})
        },


        computed: {
            loginBtnClass() {
                return {
                    'btn btn-radius': this.$route.name === 'home',
                    'btn btn-primary btn-radius': this.$route.name !== 'home',
                }
            },
        },

        methods: {
            async logout(event) {
                localStorage.removeItem('x-auth-token')
                this.$store.dispatch('setIsLoginAt', false)
                this.$router.push({path: '/'})
            },
            goto(path) {
                if (this.$route.path !== path) {
                    this.$store.dispatch('setParams', {})
                    this.$store.dispatch('initPaginationAndList', {
                        resultList: [],
                        paginationInfo: {}
                    })
                }
                this.$router.push({path: path})
            }
        }
    }
</script>

<style>
    .pointer {
        cursor: pointer;
    }
</style>
