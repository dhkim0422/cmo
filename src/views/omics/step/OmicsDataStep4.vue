<template>
    <!-- Step 4 -->
    <div class="wizard-step" ng-class="css.body(4)" ng-controller="OmicsWizardStep4">

        <h2 class="h2">오믹스 데이터 등록 절차</h2>
        <div class="form-card">
            <div class="card-body-bg">
                <h3 class="h3">오믹스 데이터 등록절차 도식도</h3>
                <!--<img src="../images/oreo-logo.png" alt="">-->
            </div>
            <div class="card-text text-left mt-3">
                오믹스 데이터 등록 동의서 다운로드: <i class="xi-paperclip"></i>
                <input class="btn-link" type="button" value="등록동의서.hwp"><br>
                제3자 정보제공 동의서: <i class="xi-paperclip"></i>
                <input class="btn-link" type="button" value="제3자정보제공동의서.hwp">
            </div>
        </div>

        <h2 class="h2">오믹스 데이터 등록 절차</h2>
        <table class="view-table">
            <caption class="sr-only">오믹스 데이터 등록 절차</caption>
            <tbody>
            <tr>
                <th scope="row">등록 동의서</th>
                <td>
                    <div ng-show="hasDepositFile()">
                        <input class="btn-link" type="button" style="margin-top: 7px;"

                               ng-click="download(depositFile)" />
                        <!--value="{{ depositFile.name }} ({{ depositFile.size | bytes }})"-->
                        <button class="btn-outline-secondary" style="float: right;"
                                data-toggle="tooltip" data-placement="top" title="삭제"
                        ng-click="remove(depositFile)">
                        <i class="xi-trash"></i><span class="sr-only">삭제</span>
                        </button>
                    </div>
                    <div class="custom-file" ng-hide="hasDepositFile()">
                        <label class="custom-file-label" data-toggle="tooltip" data-placement="top" title="업로드">
                        <div style="width: 90%" ng-repeat="file in depositUploader.fileList">
                            <!--uib-progressbar class="progress-striped active" value="file.progress">{{ file.progress }} %</uib-progressbar-->
                            <b-progress class="progress-striped" :value="file.progress" :max="max" show-progress animated>{{ file.progress }} </b-progress>

                        </div>
                        <span ng-hide="depositUploader.fileList.length > 0" style="color: gray;">파일을 선택해 주세요</span>
                        <input type="file" ng-hide="true" ng-model="depositUploader.files"
                               ng-change="depositUploader.upload()" ngf-multiple="false" ngf-select />
                        </label>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row">제3자 정보제공 동의서</th>
                <td>
                    <div ng-show="hasProvideFile()">
                        <input class="btn-link" type="button" style="margin-top: 7px;"

                               ng-click="download(provideFile)"/>
                        <!--VALUE="{{ PROVIDEFILE.NAME }} ({{ PROVIDEFILE.SIZE | BYTES }})"-->
                        <button class="btn-outline-secondary" style="float: right;"
                                data-toggle="tooltip" data-placement="top" title="삭제"
                        ng-click="remove(provideFile)">
                        <i class="xi-trash"></i><span class="sr-only">삭제</span>
                        </button>
                    </div>
                    <div class="custom-file" ng-hide="hasProvideFile()">
                        <label class="custom-file-label" data-toggle="tooltip" data-placement="top" title="업로드">
                        <div style="width: 90%" ng-repeat="file in provideUploader.fileList">
                            <!--uib-progressbar class="progress-striped active" value="file.progress">{{ file.progress }} %</uib-progressbar-->
                            <b-progress class="progress-striped" :value="file.progress" :max="max" show-progress animated>{{ file.progress }} </b-progress>
                        </div>
                        <span ng-hide="provideUploader.fileList.length > 0" style="color: gray;">파일을 선택해 주세요</span>
                        <input type="file" ng-hide="true" ng-model="provideUploader.files"
                               ng-change="provideUploader.upload()" ngf-multiple="false" ngf-select />
                        </label>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "OmicsDataStep4",
        props:['omics'],
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
