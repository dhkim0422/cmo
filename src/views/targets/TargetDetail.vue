<template>
    <div class="container" id="content">
        <!-- 요약 -->
        <ul class="summary offset-t">
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-business"></i>환경 유해성 연구
                </div>
                <div class="summary-num">{{ summary.study }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-opacity"></i>연구샘플
                </div>
                <div class="summary-num">{{ summary.sample }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-sdcard"></i>
                    오믹스 데이터
                </div>
                <div class="summary-num">{{ summary.omics }}</div>
            </li>
        </ul>

        <!-- 아티클 제목 -->
        <div class="filter-group" style="margin-bottom: 0px;">
            <div class="group-item">
                <h2 class="h2">
                    연구대상자_정보
                </h2>
            </div>
            <div class="group-item">
                <span data-toggle="tooltip" data-placement="top" title="연구대상자 삭제">
                <button class="btn-outline-secondary-sm" type="button"
                        ng-disabled="!removable()" ng-click="remove()"
                        ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다.">
                <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </button>
                </span>
                <span data-toggle="tooltip" data-placement="top" title="연구대상자 수정">
                <button class="btn-primary-sm" type="button" @click="onClickChangeLink()">
                    <i class="xi-pen"></i><span class="sr-only">삭제</span>
                </button>
                </span>
            </div>
        </div>
        <table class="view-table">
            <caption class="sr-only">
                기본정보
            </caption>
            <tbody>
            <tr>
                <th>
                    등록번호
                </th>
                <td>{{ model.accession }}</td>
                <th>
                    연구대상자 고유번호
                </th>
                <td>{{ model.uniqueNo }}</td>
            </tr>
            <tr>
                <th scope="row">
                    나이
                </th>
                <td>{{ (model.unknownAge == 'true') ? '나이불명' : model.age }}
                </td>
                <th scope="row">
                    성별
                </th>
                <td>{{ model.genderName }}</td>
            </tr>
            <tr>
                <th scope="row">연구대상자 제공 동의서</th>
                <td colspan="3">{{ model.agreeProvide? "있음" : "없음" }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        name: "TargetsDetail",
        data() {
            return {
                model: {},
                summary: {
                    study: 0,
                    target: 0,
                    sample: 0,
                    omics: 0
                }
            }
        },
        async created() {
            let id = this.$route.params.id
            await this.initData(id)
        },
        methods: {
            async initData(id) {
                let projectData = await axios.get('/isg-oreo/api/clinic-targets/' + id, {});
                let summayrData = await axios.get('/isg-oreo/statistics/summary/targets/' + id, {});
                this.model = projectData.data
                this.summary = summayrData.data
            },
            onClickChangeLink() {

            }
        },
        computed: {},
    }
</script>
