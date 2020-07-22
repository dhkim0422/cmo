<template>
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
    </div>
</template>

<script>
    export default {
        name: "OmicsWizard",
        props:['omicsType'],
        data() {
            return {
                slectTab: 0
            }
        },
        computed: {
            cssStep(tapNo) {
                if (tapNo == this.slectTab) {
                    return "active"
                } else if (this.slectTab < tapNo) {
                    return ""
                }
                return "on pointer"
            }
        },
        methods: {
            scrollTo(no) {
                this.slectTab = no
            }

        }
    }
</script>
