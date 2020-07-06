<template>
    <div class="container">
        <form>
            <!-- 요약 -->
            <ul class="summary">
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-receipt"></i>
                        연구과제
                    </div>
                    <div class="summary-num">{{ result.project }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-users"></i>
                        연구대상자
                    </div>
                    <div class="summary-num">{{ result.target }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-opacity"></i>
                        연구샘플
                    </div>
                    <div class="summary-num">{{ result.sample }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-business"></i>
                        환경 유해성 연구
                    </div>
                    <div class="summary-num">{{ result.study }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-chip"></i>NGS
                    </div>
                    <div class="summary-num">{{ result.NGS }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-chart-pie"></i>Microarray
                    </div>
                    <div class="summary-num">{{ result.Microarray }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-spa"></i>
                        대사체
                    </div>
                    <div class="summary-num">{{ result.Metabolome }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-globus"></i>
                        환경유해물질
                    </div>
                    <div class="summary-num">{{ result.material }}</div>
                </li>
            </ul>
        </form>
        <div class="mT-60">
            <h3 class="h2 text-center mT-0 mB-20">오믹스 유형별 현황</h3>
            <bar-chart :data="chartDatas"></bar-chart>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import barChart from './chart/BarChart'

    export default {
        name: 'Home',
        components: {
            barChart
        },
        data() {
            return {
                chartDatas: {}
            }
        },
        created() {
            this.$store.dispatch('loadGenericList', {
                url: '/isg-oreo/deposit-statistics/omics'
            })
            //통계 정보를 가져온다.
            this.$store.dispatch('loadOne', {
                url: '/isg-oreo/statistics/summary'
            })
            this.axios.defaults.headers.common['x-auth-token'] = headers['x-auth-token']


        },
        computed: {
            ...mapGetters(['result', 'genericList']),
        },
        watch: {
            genericList(newList) {

                console.log('newList', newList)
                let dataSet = {
                    labels: [],
                    datasets: [
                        {
                            label: '전체',
                            data: [0]
                        }
                    ]
                }

                newList.forEach((item, index) => {
                    console.log('item', item)
                    dataSet.labels[index] = item.name
                    dataSet.datasets[0].data[index] = item.totalCount
                });

                this.chartDatas = dataSet
            }
        },

    }
</script>

