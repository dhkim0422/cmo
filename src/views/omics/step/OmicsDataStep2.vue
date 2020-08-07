<template>
    <div class="wizard-step" ng-class="css.body(2)" ng-controller="OmicsWizardStep2">

        <h2 class="h2">연구과제 정보</h2>
        <div class="btn-toolbar-right">
            <span data-toggle="tooltip" data-placement="top" title="연구과제 검색">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.ProjectSearchPopup variant="primary">
                        <i class="xi-search"></i><span class="sr-only">검색></span>
                    </b-button>
                    <project-search-popup @onProjectSelected="select"/>

            </span>
        </div>

        <table class="view-table">
            <caption class="sr-only">
                basicinfo
            </caption>
            <tbody>
            <tr>
                <th scope="row">등록번호</th>
                <td>{{ omics.project.accession }}</td>
                <th scope="row">ATIS 고유번호</th>
                <td>{{ omics.project.uniqueNo }}</td>
            </tr>
            <tr>
                <th scope="row">사업명</th>
                <td colspan="3">{{ omics.project.program }}</td>
            </tr>
            <tr>
                <th scope="row">대분야</th>
                <td colspan="3">{{ omics.project.unitProgram }}</td>
            </tr>
            <tr>
                <th scope="row">중분야</th>
                <td>{{ omics.project.middleRealm }}</td>
                <th scope="row">연구상태</th>
                <td>{{ omics.project.projectStatus && omics.project.projectStatus.name }}</td>
            </tr>
            <tr>
                <th scope="row">과제명</th>
                <td colspan="3">{{ omics.project.name }}</td>
            </tr>
            <tr>
                <th scope="row">주관기관</th>
                <td>{{ omics.project.institute }}</td>
                <th scope="row">주관책임자</th>
                <td>{{ omics.project.charger }}</td>
            </tr>
            <tr>
                <th scope="row">참여기업</th>
                <td>{{ omics.project.participants }}</td>
                <th scope="row">총 연구기간</th>
                <td>{{ omics.project.begin | date }} ~ {{ omics.project.end | date }}</td>
            </tr>
            <tr>
                <th scope="row">연구개발 목표</th>
                <td colspan="3" class="pre">{{ omics.project.purpose }}</td>
            </tr>
            <tr>
                <th scope="row">연구개발 내용</th>
                <td colspan="3" class="pre">{{ omics.project.contents }}</td>
            </tr>
            </tbody>
        </table>

        <!--<h2 class="h2">노출정보</h2>
        <table class="data-table">
            <caption class="sr-only">노출정보 목록</caption>
            <thead>
            <tr>

                <th style="width: 30%;">노출물질</th>
                <th style="width: 30%;">노출경로</th>
                <th>노출량</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="!omics.project.materials.length > 0">
                <td colspan="4">노출정보가</td>
            </tr>
            <tr v-for="item in omics.project.materials">
                <td>{{ item.material.name }}</td>
                <td>{{ item.route.name }}</td>
                <td>{{ item.quantity }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2">임상연구윤리(IRB)</h2>
        <table class="view-table">
            <caption class="sr-only">임상연구윤리(IRB)</caption>
            <tbody>
            <tr>
                <th scope="row">승인단계</th>
                <td>{{ omics.project.irbConfirmStep.name }}</td>
                <th scope="row">승인번호</th>
                <td>{{ omics.project.irbConfirmNo }}</td>
            </tr>
            <tr>
                <th scope="row">승인날짜</th>
                <td colspan="3">{{ omics.project.irbConfirmDate | date }}</td>
            </tr>
            </tbody>
        </table>
        -->
    </div>
</template>

<script>
    import ProjectSearchPopup from "../../project/ProjectSearchPopup";
    import ClinicSudiesSearchPopup from "../../clinicStudies/clinicSudiesSearchPopup";

    export default {
        name: "OmicsDataStep2",
        props: ['omics'],
        components: {ClinicSudiesSearchPopup, ProjectSearchPopup},
        methods: {
            isCreateForm() {
                return this.omics.id == '' ? true : false
            },
            async select(param) {
                this.$emit('onSaveOmicsData',param[0])
            }

        }
    }
</script>

<style scoped>

</style>
