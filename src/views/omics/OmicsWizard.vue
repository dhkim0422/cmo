<template>
    <div class="container" id="content">
        <div class="wizard-header" id="omicsMergePopup">
            <ol class="wizard-nav">
                <li class="nav-item active" :class="cssStep(1)" @click="scrollTo(1)" tabindex="0">
                    <div class="num">STEP 1</div>
                    <div class="text">실험정보 등록</div>
                </li>
                <li class="nav-item" :class="cssStep(2)" @click="scrollTo(2)" tabindex="0">
                    <div class="num">STEP 2</div>
                    <div class="text">환경 유해성 연구 선택</div>
                </li>
                <li class="nav-item" :class="cssStep(3)" @click="scrollTo(3)" tabindex="0">
                    <div class="num">STEP 3</div>
                    <div class="text">오믹스 파일 등록</div>
                </li>
                <li class="nav-item" :class="cssStep(4)" @click="scrollTo(4)" tabindex="0">
                    <div class="num">STEP 4</div>
                    <div class="text">등록 동의서 업로드</div>
                </li>
            </ol>
            <div class="wizard-content">
                <omics-data-step1 :omics-type="omicsType" v-if="currentStep==1"/>
                <omics-data-step2 v-if="currentStep==2"/>
                <omics-data-step3 v-if="currentStep==3"/>
                <omics-data-step4 v-if="currentStep==4"/>
            </div>
        </div>
        <!-- Wizard-footer -->
        <div class="wizard-footer">
            <b-button class="btn-primary" v-if="prevEnabled" @click="prev()">이전으로</b-button>
            <b-button class="btn-primary" v-if="nextEnabled" @click="next()">다음으로</b-button>
            <b-button class="btn-primary" v-if="submitEnabled" @click="submit()">저장하기</b-button>
        </div>
    </div>
</template>

<script>
    import OmicsDataStep1 from "./step/OmicsDataStep1";
    import OmicsDataStep2 from "./step/OmicsDataStep2";
    import OmicsDataStep3 from "./step/OmicsDataStep3";
    import OmicsDataStep4 from "./step/OmicsDataStep4";

    export default {
        name: "OmicsWizard",
        components: {OmicsDataStep4, OmicsDataStep3, OmicsDataStep2, OmicsDataStep1},
        data() {
            return {
                currentStep: 1,
                LAST_STEP: 4,
                omicsType: this.$route.params.omicsType
            }
        },
        computed: {
            prevEnabled() {
                return this.currentStep != 1
            },
            nextEnabled() {
                return this.currentStep < this.LAST_STEP
            },
            submitEnabled() {
                return this.currentStep == this.LAST_STEP
            },
        },
        methods: {
            prev() {
                this.currentStep -= 1
            },
            next() {
                this.currentStep  += 1
            },
            submit() {
                //제출 이후엔 정보를 변경할 수 없습니다. 제출하시겠습니까?
            },
            cssStep(tapNo) {
                if (tapNo == this.currentStep) {
                    return "active"
                } else if (this.currentStep < tapNo) {
                    return ""
                }
                return "on pointer"
            },
            scrollTo(no) {
                this.currentStep = no
            }

        }
    }
</script>
