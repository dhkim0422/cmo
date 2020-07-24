<template>

    <div class="wizard-step" ng-class="css.body(3)" ng-controller="OmicsWizardStep3">
        <h2 class="h2">오믹스 파일등록</h2>

        <!-- 탭 -->
        <ul class="tab-menu nav-justified">
            <li class="menu-item"><a class="menu-link" ng-class="display.head(1)" ng-click="display.tab(1)">원천데이터</a></li>
            <li class="menu-item"><a class="menu-link" ng-class="display.head(2)" ng-click="display.tab(2)">{{ omics | groupNm }}</a></li>
        </ul>

        <!-- 탭내용 -->
        <div class="tab-content">
            <div class="tab-pane fade show" ng-class="display.body(1)">
                <span class="sr-only">원천데이터</span>

                <div ng-repeat="type in omics.rawdataTypes">
                    <h2 class="h2">{{ type.name | uppercase }} 파일</h2>
                    <!--jsp:include page="TOreoOmicsFileList.jsp"/-->
                </div>
                <table class="data-table" ng-hide="omics.rawdataTypes.length > 0">
                    <tbody>
                    <tr><td class="text-center">선택된 파일 유형이 없습니다.</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- ###### 탭내용 2-2 ########## -->
            <div class="tab-pane fade show" ng-class="display.body(2)">
                <span class="sr-only">{{ omics | groupNm }}</span>

                <div ng-repeat="type in omics.processedTypes">
                    <h2 class="h2">{{ type.name | uppercase }} 파일</h2>
                    <!--jsp:include page="TOreoOmicsFileList.jsp"/-->
                </div>
                <table class="data-table" ng-hide="omics.processedTypes.length > 0">
                    <tbody>
                    <tr><td class="text-center">선택된 파일 유형이 없습니다.</td></tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "OmicsDataStep3",
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
        }
    }
</script>

<style scoped>

</style>
