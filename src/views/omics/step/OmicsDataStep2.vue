<template>
    <div class="wizard-step" ng-class="css.body(2)" ng-controller="OmicsWizardStep2">

        <h2 class="h2">환경 유해성 연구 정보</h2>
        <div class="btn-toolbar-right">
            <span data-toggle="tooltip" data-placement="top" title="연구과제 검색">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.projectSearchPopup variant="primary" @click="onClickRegist">
                        <i class="xi-search"></i><span class="sr-only">검색></span>
                    </b-button>
                <!--등록을 위한 페잊 컴포넌트-->
                    <clinic-studies-popup @saveOK="selectList" v-if="isRegist"/>
            </span>
        </div>

        <table class="view-table">
            <caption class="sr-only">환경 유해성 연구</caption>
            <tbody>
            <tr>
                <th>등록번호</th>
                <td>{{ study.accession }}</td>
                <th>임상연구 고유번호</th>
                <td>{{ study.uniqueNo }}</td>
            </tr>
            <tr>
                <th>연구제목</th>
                <td colspan="3">{{ study.name }}</td>
            </tr>
            <tr>
                <th>연구목적</th>
                <td colspan="3" class="pre">{{ study.purpose }}</td>
            </tr>
            <tr>
                <th>연구대상 표현형/질환</th>
                <td colspan="3">(국문) {{ study.disease.koreanName }}, (영문) {{ study.disease.englishName }}</td>
            </tr>
            <tr>
                <th>연구유형</th>
                <td colspan="3">{{ study.largeClass.name }} ({{ study.smallClass.name }})</td>
                <!-- <th>임상시험단계</th>
                <td>{{ study.phase.name }}</td> -->
            </tr>
            <tr>
                <th>실험설계및방법</th>
                <td colspan="3" class="pre">{{ study.design }}</td>
            </tr>
            <tr>
                <th>연구결과</th>
                <td colspan="3" class="pre">{{ study.result }}</td>
            </tr>
            <tr>
                <th>연구대상자 선정기준</th>
                <td colspan="3" class="pre">{{ study.inclusionCriteria }}</td>
            </tr>
            <tr>
                <th>연구대상자 제외기준</th>
                <td colspan="3" class="pre">{{ study.exclusionCriteria }}</td>
            </tr>
            <tr>
                <th>영문검사항목</th>
                <!--<td colspan="3">{{ study.measures | models }}</td>-->
                <td colspan="3">{{ study.measures }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2">노출정보</h2>
        <table class="data-table">
            <caption class="sr-only">노출정보 목록</caption>
            <thead>
            <tr>
                <th style="width: 80px;">순번</th>
                <th style="width: 30%;">노출물질</th>
                <th style="width: 30%;">노출경로</th>
                <th>노출량</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="!study.materials.length > 0">
                <td colspan="4">노출정보가</td>
            </tr>
            <tr v-for="item in study.materials">
                <td>{{$index+1}}</td>
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
                <td>{{ study.irbConfirmStep.name }}</td>
                <th scope="row">승인번호</th>
                <td>{{ study.irbConfirmNo }}</td>
            </tr>
            <tr>
                <th scope="row">승인날짜</th>
                <td colspan="3">{{ study.irbConfirmDate | date }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import ClinicStudiesPopup from "../../project/projectSearchPopup";
    export default {
        name: "OmicsDataStep2",
        components: {ClinicStudiesPopup},
        data() {
            return {
                study: {
                    irbConfirmStep:{},
                    materials:{},
                    name:'',
                    accession: '',
                    largeClass: {},
                    smallClass:{},

                    disease: {
                        koreanName:'',
                        englishName:'',

                        disease: {},

                    }
                }

            }
        },
        methods: {
            isCreateForm() {
                return true
            },
            isNgs(omics) {
                return (omics.omicsType == 'NGS');
            },

            isMicroarray(omics) {
                return (omics.omicsType == 'Microarray');
            },

            isMetabolome(omics) {
                return (omics.omicsType == 'Metabolmoe');
            },
            openStudySearchPopup(){

            }
        }
    }
</script>

<style scoped>

</style>
