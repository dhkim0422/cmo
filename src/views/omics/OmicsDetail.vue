<template>
    <div class="container" id="content">
        <!-- 요약 -->
        <ul class="summary">
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-users"></i>연구대상자
                </div>
                <div class="summary-num">{{ summary.target }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-opacity"></i>연구샘플
                </div>
                <div class="summary-num">{{ summary.sample }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-file"></i>오믹스 파일
                </div>
                <div class="summary-num">{{ summary.omicsFile }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-sdcard"></i>데이터 용량
                </div>
                <div class="summary-num">{{ summary.omicsSize | byte }}</div>
            </li>
        </ul>


        <!--<div class="tab-content">
            <div class="tab-pane fade show" ng-class="tab.top.css(1)">
                <jsp:include page="TOreoOmicsDataExper.jsp" />
            </div>

            <div class="tab-pane fade show" ng-class="tab.top.css(2)" ng-controller="OmicsFileController" init="init();">
                <jsp:include page="TOreoOmicsDataFileList.jsp" />
            </div>
        </div>-->
        <ul class="tab-menu m-t-75">
            <li class="menu-item active">
                <a data-toggle="tab" class="menu-link"  href="#tab1">실험 정보</a>
            </li>
            <li class="menu-item">
                <a data-toggle="tab" class="menu-link"  href="#tab2">파일 목록</a>
            </li>
        </ul>
        <div class="tab-content">
            <div id="tab1" class="tab-pane active">
                <span class="sr-only">실험 정보 </span>
                <omics-data-exper :id="this.$route.params.id"/>
            </div>
            <div id="tab2" class="tab-pane">
                <span class="sr-only">파일 목록</span>

            </div>
        </div>
    </div>

</template>

<script>
    import axios from "../../utils/axios";
    import OmicsDataExper from "../project/OmicsDataExper";

    export default {
        name: "OmicsDetail",
        components: {OmicsDataExper},
        created() {
            let id = this.$route.params.id;
            console.log('log', id )
            this.initData(id)
        },
        data() {
            return {
                summary: {
                    target: 0,
                    sample: 0,
                    omicsFile: 0,
                    omicsSize: 0
                }
            }
        },
        methods: {
            async initData(id) {
                console.log('log2', id )
                let summayrData = await axios.get(
                    "/isg-oreo/statistics/summary/omics/" + id,
                    {}
                );
                this.summary = summayrData.data;
            },

        }
    }

</script>

