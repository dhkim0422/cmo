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
                        ng-disabled="!removable()" @click="remove()"
                        ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다.">
                <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </button>
                </span>
                <span data-toggle="tooltip" data-placement="top" title="연구대상자 수정">
                    <b-button class="btn-primary-sm" v-b-modal.registPopup variant="primary" @click="showUpdataPage()">
                        <i class="xi-file-add"></i><span class="sr-only">수정</span>
                    </b-button>
                    <!--크리에이티드에 로드를 하도록 설정되어있어 v-if 로 처리 -->
                    <targets-merge :target-info="model" @insertOK="insertOK" v-if="isUpdate"/>
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
    import TargetsMerge from "./TargetsMerge";

    export default {
        name: "TargetsDetail",
        components: {TargetsMerge},
        data() {
            return {
                isUpdate: false,
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

            await this.initData()
        },
        methods: {
            async initData() {
                let id = this.$route.params.id
                let projectData = await axios.get('/isg-oreo/api/clinic-targets/' + id, {});
                let summayrData = await axios.get('/isg-oreo/statistics/summary/targets/' + id, {});
                this.model = projectData.data
                this.summary = summayrData.data
            },
            onClickChangeLink() {
                this.$router.push('/targets/targetsUpdate/' + id)
            },
            async remove() {
                const response = await axios.delete('/isg-oreo/api/clinic-targets/' + id, {});
                console.log(response)
                if (response.status == 200) {
                    await this.$alert(
                        '',
                        response.data.accession + '가 삭제 되었습니다.',
                        'info'
                    );
                } else {
                    await this.$alert(
                        '문제가 계속 발생하면 관리자에게 문의해 주세요',
                        '다시 시도 해주세요',
                        'error'
                    );
                }
                this.$router.go(-1)
            },
            showUpdataPage(){
                this.isUpdate = true
            },
            insertOK(){
                this.initData()
                //false를 해주어야 다시 쇼할때 데이터를 리로딩한다.
                this.isUpdate = false
            }
        },
        computed: {},
    }
</script>
