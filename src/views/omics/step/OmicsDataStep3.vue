<template>

    <div class="wizard-step" ng-class="css.body(3)" ng-controller="OmicsWizardStep3">
        <h2 class="h2">오믹스 파일등록</h2>

        <!-- 탭 -->
        <ul class="tab-menu nav-justified">
            <li class="menu-item"><a class="menu-link" :class="head(1)" @click="scrollTo(1)">원천데이터</a></li>
            <li class="menu-item"><a class="menu-link" :class="head(2)" @click="scrollTo(2)">{{ omics | groupNm}}</a>
            </li>
        </ul>
        <!-- 탭내용 -->
        <div class="tab-content">
            <div class="tab-content" v-if="currentStep==1">
                <span class="sr-only">원천데이터</span>

                <div v-for="type in this.omics.rawdataTypes" v-if="type.selected">
                    <h2 class="h2">{{ type.name }} 파일</h2>
                    <file-upload-temp :omics="omics" :type="type" :dataType="'rawdata'"></file-upload-temp>
                </div>

            </div>
            <table class="data-table" v-show="!omics.rawdataTypes.length > 0">
                <tbody>
                <tr>
                    <td class="text-center">선택된 파일 유형이 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- ###### 탭내용 2-2 ########## -->
        <div class="tab-content" v-if="currentStep == 2">
            <span class="sr-only">{{ omics | groupNm }}</span>

            <div v-for="type in this.omics.processedTypes" v-if="type.selected">
                <h2 class="h2">{{ type.name | uppercase }} 파일</h2>
                <file-upload-temp :omics="omics" :type="type" :dataType="'processed'"/>
            </div>
        </div>
    </div>


</template>

<script>
    import OmicsFileList from "./OmicsFileList/OmicsFileList";
    import FileUploadTemp from "./OmicsFileList/FileUpload";

    function isBlank(value) {
        return !value
    }

    function getId(obj) {
        if (isObject(obj)) {
            return getId(obj['id']);
        } else if (isString(obj)) {
            if (!isBlank(obj))
                return parseInt(obj);
        } else if (isNumber(obj)) {
            return obj;
        }
    }

    export default {
        name: "OmicsDataStep3",
        components: {FileUploadTemp, OmicsFileList},
        props: ['omics'],
        data() {
            return {
                currentStep: 1,

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
            scrollTo(no) {
                this.currentStep = no
            },
            head: function (no) {
                return (no == this.currentTab) ? 'active' : '';
            },
            body: function (no) {
                return (no == this.currentTab) ? 'show active' : 'hide';
            },
            chkId: function (type, model) {
                var id = "chk";
                if (isObject(type))
                    id = type.group + type.name;

                return (id += isBlank(id) ? "All" : getId(model));
            }

        }
    }
</script>

<style scoped>

</style>
