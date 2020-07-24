<template>
    <!-- Step 1 -->

    <div class="wizard-step">
        <h2 class="h2" ng-show="isNgs(omics)">NGS 실험정보</h2>

        <form name="step1Form">
            <table class="view-table" v-if="isNgs(omics)">
                <caption class="sr-only">NGS 실험정보</caption>
                <tbody>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>등록번호</label></th>
                    <td>{{ isCreateForm() ? '등록번호는 자동으로 할당됩니다.' : omics.accession }}</td>
                    <th scope="row" class="form-group required control-label"><label>데이터 유형</label></th>
                    <td>
                        <select class="form-control" v-model="omics.experType">
                            <option label="RNA-Seq" value="OEXPER_N01" selected="selected">RNA-Seq</option>
                            <option label="ChIP-Seq(active)" value="OEXPER_N02">ChIP-Seq(active)</option>
                            <option label="ChIP-Seq(repression)" value="OEXPER_N03">ChIP-Seq(repression)</option>
                            <option label="SNP-Seq" value="OEXPER_N04">SNP-Seq</option>
                        </select>
                        <!--//OEX PER_N 코트 테이블에 로드하영 한다. 공수를 위해 잠시 하드하게 설정-->
                        <!--<select class="form-control" ng-model="omics.experType"
                                ng-options="code.name for code in codes.ngsType track by code.code" required>
                        </select>-->
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>실험제목</label></th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="실험제목" placeholder="작성하여주세요." name="experName"
                               ng-model="omics.name" ng-required="true" ng-minlength="3" ng-maxlength="512"/>

                    </td>
                </tr>
                <tr>
                    <th scope="row">실험설계</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="실험설계"
                                  placeholder="작성하여주세요."
                                  ng-model="omics.design"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">시퀸싱 기관</th>
                    <td>
                        <input class="form-control" type="text" title="시퀸싱 기관"
                               placeholder="작성하여주세요." maxlength="2000"
                               ng-model="omics.attributes.sequencingOrgan"/>
                    </td>
                    <th scope="row" class="form-group required control-label"><label>반복실험 유형</label></th>
                    <td>
                        <b-form-select class="form-control" v-model="omics.attributes.replicate"
                                       :options="codes.replicateType"></b-form-select>


                    </td>
                </tr>
                </tbody>
            </table>

            <h2 class="h2" v-if="isNgs(omics)">라이브러리 정보</h2>
            <table class="view-table" v-if="isNgs(omics)">
                <caption class="sr-only">라이브러리 정보</caption>
                <tbody>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>시퀀스 플랫폼</label></th>
                    <td>
                        <b-form-select class="form-control" v-model="omics.attributes.platform"
                                       :options="codes.platform"></b-form-select>
                    </td>
                    <th scope="row">Read length</th>
                    <td>
                        <input class="form-control" type="text" title="Read length"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.readLength" integer maxlength="2000"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Insert size</th>
                    <td>
                        <input class="form-control" type="text" title="Insert size"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.insertSize"/>
                    </td>
                    <th scope="row" class="form-group required control-label"><label>Read layout</label></th>
                    <td>
                        <b-form-select class="form-control" v-model="omics.attributes.readLayout"
                                       :options="codes.readLayout"></b-form-select>
                        <!--select class="form-control" ng-model="omics.attributes.readLayout" required
                                ng-options="code for code in codes.readLayout">
                        </select-->
                    </td>
                </tr>
                <tr>
                    <th scope="row">라이브러리 구축 정보</th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="라이브러리 구축 정보"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.library" maxlength="2000"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">어댑터 시퀸스</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="어댑터 시퀸스"
                                  placeholder="작성하여주세요."
                                  ng-model="omics.attributes.adapterSequence"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Quality score version</th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="Quality score version"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.qcVersion" maxlength="2000"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Base calling program</th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="Base calling program"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.baseCallingProgram" maxlength="2000"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>

        <!-- ////////////////////////////// -->
        <!-- //       Microarray         //-->
        <!-- ////////////////////////////// -->
        <h2 class="h2" v-if="isMicroarray(omics)">Microarray 실험정보</h2>
        <form name="step2Form">
            <table class="view-table" v-if="isMicroarray(omics)">
                <caption class="sr-only">NGS 실험정보</caption>
                <tbody>
                <tr>
                    <th scope="row">등록번호</th>
                    <td>{{ isCreateForm() ? '등록번호는 자동으로 할당됩니다.' : omics.accession }}</td>
                    <th scope="row">데이터 유형</th>
                    <td>
                        <select class="form-control" v-model="omics.experType">
                            <option label="RNA-Seq" value="OEXPER_N01" selected="selected">RNA-Seq</option>
                            <option label="ChIP-Seq(active)" value="OEXPER_N02">ChIP-Seq(active)</option>
                            <option label="ChIP-Seq(repression)" value="OEXPER_N03">ChIP-Seq(repression)</option>
                            <option label="SNP-Seq" value="OEXPER_N04">SNP-Seq</option>
                        </select>
                        <!--//OEXPER_N 코트 테이블에 로드하영 한다. 공수를 위해 잠시 하드하게 설정-->
                        <!--<select class="form-control" ng-model="omics.experType"
                                ng-options="code.name for code in codes.ngsType track by code.code" required>
                        </select>-->
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>실험제목</label></th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="실험제목" placeholder="작성하여주세요." name="experName"
                               ng-model="omics.name" ng-required="true" ng-minlength="3" ng-maxlength="512"/>

                    </td>
                </tr>
                <tr>
                    <th scope="row">실험설계실험설계</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="실험설계"
                                  placeholder="실험설계를 작성해주세요.작성하여주세요."
                                  ng-model="omics.design"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">플랫폼</th>
                    <td>
                        <input class="form-control" type="text" title="플랫폼" placeholder="플랫폼을 작성해 주세요."
                               ng-model="omics.attributes.platform" maxlength="2000"/>
                    </td>
                    <th scope="row">제작사</th>
                    <td>
                        <input class="form-control" type="text" title="제작사" placeholder="플랫폼 제작사를 작성해 주세요.작성하여주세요."
                               ng-model="omics.attributes.manufacturer" maxlength="2000"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">표지자</th>
                    <td colspan="3">
                        <input class="form-control" type="text" title="표지자" placeholder="표지자"
                               ng-model="omics.attributes.marker" maxlength="2000"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">유전자 표지 방법</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="유전자 표지 방법"
                                  placeholder="유전자 표지 방법을 작성해주세요.작성하여주세요."
                                  ng-model="omics.attributes.labeling"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">반복실험 유형</th>
                    <td colspan="3">
                        <b-form-select class="form-control" v-model="omics.attributes.replicate"
                                       :options="codes.replicateType"></b-form-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">혼성화 방법</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="혼성화 방법" placeholder="작성하여주세요."
                                  ng-model="omics.attributes.hybridization"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>

        <!--//////////////////////////-->
        <!--//  대사체 부분                      // -->
        <!--///////////////////////// -->
        <h2 class="h2" v-if="isMetabolome(omics)">대사체 실험정보</h2>
        <form name="step3Form">
            <table class="view-table" v-if="isMetabolome(omics)">
                <caption class="sr-only">실험정보NGS 실험정보</caption>
                <tbody>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>등록번호</label></th>
                    <td>{{ isCreateForm() ? '등록번호는 자동으로 할당됩니다.' : omics.accession }}</td>
                    <th scope="row">오믹스 유형</th>
                    <td>{{ omicsType }}</td>
                </tr>
                <tr>
                    <th scope="row" class="form-group required control-label"><label>실험제목</label></th>
                    <td colspan="3">
                        <b-input class="form-control" type="text" title="실험제목" placeholder="작성하여주세요." name="experName"
                                 ng-model="omics.name" ng-required="true" ng-minlength="3" ng-maxlength="512"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row">실험설계실험설계</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="실험설계" placeholder="작성하여주세요."
                                  ng-model="omics.design"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Sample preparation protocol</th>
                    <td colspan="3">
                        <textarea class="form-control" cols="30" rows="3" title="Sample preparation protocol"
                                  placeholder="작성하여주세요."
                                  ng-model="omics.attributes.protocol"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>

            <h2 class="h2" v-if=" isMetabolome(omics)">Mass spectrometry</h2>
            <table class="view-table" v-if="isMetabolome(omics)">
                <caption class="sr-only">질량분석</caption>
                <tbody>
                <tr>
                    <th scope="row">Type</th>
                    <td colspan="3">
                        <select class="form-control" ng-model="omics.attributes.spectrometry"
                                ng-options="code for code in codes.spectrometry" required>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Instrument model</th>
                    <td>
                        <input class="form-control" type="text" title="Instrument model"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.instrument" maxlength="2000"/>
                    </td>
                    <th scope="row">Instrument manufacture</th>
                    <td>
                        <input class="form-control" type="text" title="Instrument manufacture"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.manufacturer" maxlength="2000"/>

                    </td>
                </tr>
                <tr>
                    <th scope="row">Ionization source</th>
                    <td>
                        <input class="form-control" type="text" title="Ionization mode"
                               placeholder="작성하여주세요."
                               ng-model="omics.attributes.ionization" maxlength="2000"/>
                    </td>
                    <th scope="row">Analyzer</th>
                    <td>
                        <select class="form-control" ng-model="omics.attributes.analyzer"
                                ng-options="code for code in codes.analyzer" required maxlength="2000">
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
        <br/>
        <h2 class="h2">
            데이터 파일 유형
        </h2>
        <form name="dataFileForm">
            <table class="view-table">
                <caption class="sr-only">데이터 파일 유형</caption>
                <tbody>
                <tr>
                    <th scope="row">원천데이터</th>
                    <td>
                        <div class="custom-checkbox-inline" v-for="item in rawdataTypes" :key="item.name">
                            <b-form-checkbox
                                    :id="'checkbox-' + item.name"
                                    v-model="item.selected"
                                    name="rawdataTypes"
                            >
                                {{item.name}}
                            </b-form-checkbox>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">{{ omics | groupNm }}</th>
                    <td>
                        <div class="custom-checkbox-inline" v-for="item in processedTypes" :key="item.name">
                            <b-form-checkbox
                                    :id="'checkbox-' + item.name"
                                    v-model="item.selected"
                                    name="rawdataTypes"
                            >
                                {{item.name}}
                            </b-form-checkbox>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <h2 class="h2">데이터 공개</h2>
            <table class="view-table">
                <caption class="sr-only">데이터 공개</caption>
                <tbody>
                <tr>
                    <th scope="row">공개날짜</th>
                    <td colspan="3">
                        <div layout="row">
                            <b-form-datepicker v-model="omics.publicDate" id="omics.publicDate" size="sm" local="ko"
                                               class="mb-2"></b-form-datepicker>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

        </form>
    </div>
</template>

<script>
    export default {
        name: "OmicsDataStep1",
        props: ['omicsType'],
        data() {
            return {
                item: {},
                codes: this.$store.state.codes,
                rawdataTypes: this.$store.state.fileTypeMap[this.omicsType].rawdata,
                processedTypes: this.$store.state.fileTypeMap[this.omicsType].processed,
                omics: {
                    accession: (this.$route.params.id == undefined ? '' : this.$route.params.id),
                    omicsType: this.omicsType,
                    attributes: {
                        platform: 'Illuina-hiseq',
                        replicate: 'None',
                        readLayout:'Single-end'
                    },
                    experType: 'OEXPER_N01'


                }
            }
        },
        methods: {
            isCreateForm() {

                return this.omics.accession == ""
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
