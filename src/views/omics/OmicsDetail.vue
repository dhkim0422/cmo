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

        <b-tabs content-class="mt-3">
            <b-tab title="실험 정보" active class="menu-item">
                <span class="sr-only">실험 정보 </span>
                <omics-data-exper :id="this.$route.params.id"/>
            </b-tab>
            <b-tab title="파일 목록"  class="menu-item">
                <span class="sr-only">파일 목록</span>
                <omics-data-file-list :id="this.$route.params.id"/>
            </b-tab>
        </b-tabs>
    </div>

</template>

<script>
    import axios from "../../utils/axios";
    import OmicsDataExper from "../project/OmicsDataExper";
    import OmicsDataFileList from "./OmicsDataFileList";

    export default {
        name: "OmicsDetail",
        components: {OmicsDataFileList, OmicsDataExper},
        created() {
            let id = this.$route.params.id;
            console.log('log', id)
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
                console.log('log2', id)
                let summayrData = await axios.get(
                    "/isg-oreo/statistics/summary/omics/" + id,
                    {}
                );
                this.summary = summayrData.data;
            },

        }
    }

</script>

