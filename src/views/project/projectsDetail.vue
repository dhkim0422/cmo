<template>
    <div class="container" id="content">
        <form>
            <!-- 요약 -->
            <ul class="summary offset-t">
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-business"></i>
                        환경_유해성_연구
                    </div>
                    <div class="summary-num">{{ this.summary.study }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-users"></i>
                        연구대상자
                    </div>
                    <div class="summary-num">{{ this.summary.target }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-opacity"></i>
                        연구샘플
                    </div>
                    <div class="summary-num">{{ this.summary.sample }}</div>
                </li>
                <li class="summary-item">
                    <div class="summary-title">
                        <i class="xi-sdcard"></i>
                        오믹스 데이터
                    </div>
                    <div class="summary-num">{{ this.summary.omics }}</div>
                </li>
            </ul>


            <div class="filter-group" style="margin-bottom: 0px;">
                <div class="group-item">
                    <h2 class="h2">연구과제정보</h2>
                </div>
                <div class="group-item">
                <span
                        data-toggle="tooltip"
                        data-placement="top"
                        title="연구과제 삭제"
                >
                    <b-button lass="btn-outline-secondary-sm" title="삭제" @click="remove">
                        <i class="xi-trash"></i><span class="sr-only">삭제</span>
                    </b-button>
                </span>
                    <span data-toggle="tooltip" data-placement="top" title="연구과제 수정">
                    <b-button class="btn-primary-sm" v-b-modal.projectPopup variant="primary">
                        <i class="xi-file-add"></i><span class="sr-only">수정</span>
                    </b-button>
                        <!--크리에이티드에 로드를 하도록 설정되어있어 v-if 로 처리 -->
                    <project-merge :project-info="model" @saveOK="updateOK"/>
                </span>
                </div>
            </div>

            <table class="view-table">
                <caption class="sr-only">
                    basicinfo
                </caption>
                <tbody>
                <tr>
                    <th scope="row">등록번호</th>
                    <td>{{ model.accession }}</td>
                    <th scope="row">KEITI 고유번호</th>
                    <td>{{ model.uniqueNo }}</td>
                </tr>
                <tr>
                    <th scope="row">사업명</th>
                    <td colspan="3">{{ model.program }}</td>
                </tr>
                <tr>
                    <th scope="row">단위사업</th>
                    <td colspan="3">{{ model.unitProgram }}</td>
                </tr>
                <tr>
                    <th scope="row">중분야</th>
                    <td>{{ model.middleRealm }}</td>
                    <th scope="row">연구상태</th>
                    <td>{{ model.projectStatus === undefined ? '' : model.projectStatus.name }}</td>
                </tr>
                <tr>
                    <th scope="row">과제명</th>
                    <td colspan="3">{{ model.name }}</td>
                </tr>
                <tr>
                    <th scope="row">주관기관</th>
                    <td>{{ model.institute }}</td>
                    <th scope="row">주관책임자</th>
                    <td>{{ model.charger }}</td>
                </tr>
                <tr>
                    <th scope="row">참여기업</th>
                    <td>{{ model.participants }}</td>
                    <th scope="row">총 연구기간</th>
                    <td>{{ model.begin | date }} ~ {{ model.end | date }}</td>
                </tr>
                <tr>
                    <th scope="row">연구개발 목표</th>
                    <td colspan="3" class="pre">{{ model.purpose }}</td>
                </tr>
                <tr>
                    <th scope="row">연구개발 내용</th>
                    <td colspan="3" class="pre">{{ model.contents }}</td>
                </tr>
                </tbody>
            </table>

            <h2 class="h2">연구개발 결과</h2>
            <table class="view-table">
                <caption class="sr-only">
                    연구개발 결과
                </caption>
                <tbody>
                <tr>
                    <th scope="row">개발내용 및 결과</th>
                    <td class="pre">{{ model.conclusion }}</td>
                </tr>
                <tr>
                    <th scope="row">키워드</th>
                    <td>{{ model.keywords }}</td>
                </tr>
                <tr>
                    <th scope="row">개발기술의 특징, 장점</th>
                    <td class="pre">{{ model.features }}</td>
                </tr>
                <tr>
                    <th scope="row">기대효과</th>
                    <td class="pre">{{ model.expectation }}</td>
                </tr>
                <tr>
                    <th scope="row">적용분야</th>
                    <td class="pre">{{ model.appliedTo }}</td>
                </tr>
                </tbody>
            </table>


        </form>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import ProjectMerge from "./ProjectMerge";

    export default {
        name: "ProjectsDetail",
        components: {ProjectMerge},
        data() {
            return {
                model: {
                    projectStatus: {},
                    unitProgram: '',

                },
                summary: {
                    study: 0,
                    target: 0,
                    sample: 0,
                    omics: 0,
                },
            };
        },
        async created() {

            await this.initData();
        },
        methods: {
            async initData() {
                let id = this.$route.params.id;
                let projectData = await axios.get("/isg-oreo/api/projects/" + id, {});
                let summayrData = await axios.get(
                    "/isg-oreo/statistics/summary/projects/" + id,
                    {}
                );
                this.model = projectData.data;
                this.summary = summayrData.data;
            },
            updateOK() {
                this.initData()
            },
            async remove() {
                let id = this.$route.params.id;
                const response = await axios.delete('/isg-oreo/api/projects/' + id, {});
                console.log(response)
                if (response.status == 200) {
                    await this.$alert(
                        '',
                        '[' + response.data.accession + ']가 삭제 되었습니다.',
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
            }
        },
        computed: {},
    };
</script>
