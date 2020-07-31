<template>
    <div class="wizard-step" ng-class="css.body(2)" ng-controller="OmicsWizardStep2">

        <h2 class="h2">환경 유해성 연구 정보</h2>
        <div class="btn-toolbar-right">
            <span data-toggle="tooltip" data-placement="top" title="연구과제 검색">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.ClinicSudiesSearchPopup variant="primary">
                        <i class="xi-search"></i><span class="sr-only">검색></span>
                    </b-button>
                    <clinic-sudies-search-popup @onClinicSudiesSelected="select"/>
            </span>
        </div>

        <table class="view-table">
            <caption class="sr-only">환경 유해성 연구</caption>
            <tbody>
            <tr>
                <th>등록번호</th>
                <td>{{ omics.study.accession }}</td>
                <th>임상연구 고유번호</th>
                <td>{{ omics.study.uniqueNo }}</td>
            </tr>
            <tr>
                <th>연구제목</th>
                <td colspan="3">{{ omics.study.name }}</td>
            </tr>
            <tr>
                <th>연구목적</th>
                <td colspan="3" class="pre">{{ omics.study.purpose }}</td>
            </tr>
            <tr>
                <th>연구대상 표현형/질환</th>
                <td colspan="3">(국문) {{ omics.study.disease.koreanName }}, (영문) {{ omics.study.disease.englishName }}
                </td>
            </tr>
            <tr>
                <th>연구유형</th>
                <td colspan="3">{{ omics.study.largeClass.name }} ({{ omics.study.smallClass.name }})</td>
                <!-- <th>임상시험단계</th>
                <td>{{ omics.study.phase.name }}</td> -->
            </tr>
            <tr>
                <th>실험설계및방법</th>
                <td colspan="3" class="pre">{{ omics.study.design }}</td>
            </tr>
            <tr>
                <th>연구결과</th>
                <td colspan="3" class="pre">{{ omics.study.result }}</td>
            </tr>
            <tr>
                <th>연구대상자 선정기준</th>
                <td colspan="3" class="pre">{{ omics.study.inclusionCriteria }}</td>
            </tr>
            <tr>
                <th>연구대상자 제외기준</th>
                <td colspan="3" class="pre">{{ omics.study.exclusionCriteria }}</td>
            </tr>
            <tr>
                <th>영문검사항목</th>
                <!--<td colspan="3">{{ omics.study.measures | models }}</td>-->
                <td colspan="3">
                    <span v-for=" item in omics.study.measures" :key="item.id">
                        {{item.name}}
                    </span>
                </td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2">노출정보</h2>
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
            <tr v-show="!omics.study.materials.length > 0">
                <td colspan="4">노출정보가</td>
            </tr>
            <tr v-for="item in omics.study.materials">
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
                <td>{{ omics.study.irbConfirmStep.name }}</td>
                <th scope="row">승인번호</th>
                <td>{{ omics.study.irbConfirmNo }}</td>
            </tr>
            <tr>
                <th scope="row">승인날짜</th>
                <td colspan="3">{{ omics.study.irbConfirmDate | date }}</td>
            </tr>
            </tbody>
        </table>
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
