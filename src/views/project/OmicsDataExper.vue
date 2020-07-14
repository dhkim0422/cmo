<template>
    <div>

        <h2 class="h2">
            환경 유해성 연구
        </h2>
        <table class="view-table">
            <caption class="sr-only">상세</caption>
            <tbody>
            <tr>
                <th scope="row">등록번호</th>
                <td>{{ study.accession }}</td>
                <th scope="row">임상연구 고유번호</th>
                <td>{{ study.uniqueNo }}</td>
            </tr>
            <tr>
                <th scope="row">연구제목</th>
                <td colspan="3">{{ study.name }}</td>
            </tr>
            <tr>
                <th scope="row">연구목적</th>
                <td class="pre" colspan="3">{{ study.purpose }}</td>
            </tr>
            <tr>
                <th scope="row">연구대상 표현형/질환</th>
                <td colspan="3">
                    (국문) {{ study.disease.koreanName }},
                    (영문) {{ study.disease.englishName }}
                </td>
            </tr>
            <!--<tr>
                <th scope="row">노출정보</th>
                <td colspan="3">{{ study.materials}}</td>
            </tr>-->
            </tbody>
        </table>

        <h2 class="h2" v-show="isNgs(omics)">NGS 실험정보</h2>
        <table class="view-table" v-show="isNgs(omics)">
            <caption class="sr-only">상세</caption>
            <tbody>
            <tr>
                <th scope="row">등록번호</th>
                <td>{{ omics.accession }}</td>
                <th scope="row">데이터 유형</th>
                <td>{{ omics.experType.name }}</td>
            </tr>
            <tr>
                <th scope="row">실험제목</th>
                <td colspan="3">{{ omics.name }}</td>
            </tr>
            <tr>
                <th scope="row">실험설계</th>
                <td class="pre" colspan="3">{{ omics.design }}</td>
            </tr>
            <tr>
                <th scope="row">시퀸싱 기관</th>
                <td>{{ omics.attributes.sequencingOrgan }}</td>
                <th scope="row">반복실험 유형</th>
                <td>{{ omics.attributes.replicate }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2" v-show="isNgs(omics)">라이브러리 정보</h2>
        <table class="view-table" v-show="isNgs(omics)">
            <caption class="sr-only">상세</caption>
            <tbody>
            <tr>
                <th scope="row">시퀸스 플랫폼</th>
                <td>{{ omics.attributes.platform }}</td>
                <th scope="row">Read length</th>
                <td>{{ omics.attributes.readLength }}</td>
            </tr>
            <tr>
                <th scope="row">Insert size</th>
                <td>{{ omics.attributes.insertSize }}</td>
                <th scope="row">Read layout</th>
                <td>{{ omics.attributes.readLayout }}</td>
            </tr>
            <tr>
                <th scope="row">라이브러리 구축 정보</th>
                <td class="pre" colspan="3">{{ omics.attributes.library }}</td>
            </tr>
            <tr>
                <th scope="row">어댑터 시퀸스</th>
                <td colspan="3" class="text-break">{{ omics.attributes.adapterSequence }}</td>
            </tr>
            <tr>
                <th scope="row">Quality score version</th>
                <td colspan="3">{{ omics.attributes.qcVersion }}</td>
            </tr>
            <tr>
                <th scope="row">Base calling program</th>
                <td colspan="3">{{ omics.attributes.baseCallingProgram }}</td>
            </tr>
            </tbody>
        </table>


        <table class="view-table" v-show="isMicroarray(omics)">
            <caption class="sr-only">NGS 실험정보</caption>
            <tbody>
            <tr>
                <th scope="row">등록번호</th>
                <td>{{ omics.accession }}</td>
                <th scope="row">데이터 유형</th>
                <td>{{ omics.experType.name }}</td>
            </tr>
            <tr>
                <th scope="row">실험제목</th>
                <td colspan="3">{{ omics.name }}</td>
            </tr>
            <tr>
                <th scope="row">실험설계</th>
                <td class="pre" colspan="3">{{ omics.design }}
                </td>
            </tr>
            <tr>
                <th scope="row">
                    플랫폼
                </th>
                <td>{{ omics.attributes.platform }}</td>
                <th scope="row">
                    제작사
                </th>
                <td>{{ omics.attributes.manufacturer }}</td>
            </tr>
            <tr>
                <th scope="row">
                    표지자
                </th>
                <td colspan="3">{{ omics.attributes.marker }}</td>
            </tr>
            <tr>
                <th scope="row">
                    유전자 표지 방법
                </th>
                <td class="pre" colspan="3">{{ omics.attributes.labeling }}</td>
            </tr>
            <tr>
                <th scope="row">반복실험 유형</th>
                <td colspan="3">{{ omics.attributes.replicate }}</td>
            </tr>
            <tr>
                <th scope="row">
                    혼성화 방법
                </th>
                <td class="pre" colspan="3">{{ omics.attributes.hybridization }}</td>
            </tr>
            </tbody>
        </table>


        <h2 class="h2" v-show="isMetabolome(omics)">
            대사체 실험정보
        </h2>
        <table class="view-table" v-show="isMetabolome(omics)">
            <caption class="sr-only">
                실험정보
            </caption>
            <tbody>
            <tr>
                <th scope="row">등록번호</th>
                <td>{{ omics.accession }}</td>
                <th scope="row">
                    오믹스 종류
                </th>
                <td>{{ omics.omicsType }}</td>
            </tr>
            <tr>
                <th scope="row">실험제목</th>
                <td colspan="3">{{ omics.name }}</td>
            </tr>
            <tr>
                <th scope="row">실험설계</th>
                <td class="pre" colspan="3">{{ omics.design }}</td>
            </tr>
            <tr>
                <th scope="row">Sample preparation protocol</th>
                <td class="pre" colspan="3">{{ omics.attributes.protocol }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2" v-show="isMetabolome(omics)">Mass spectrometry</h2>
        <table class="view-table" v-show="isMetabolome(omics)">
            <caption class="sr-only">질량분석</caption>
            <tbody>
            <tr>
                <th scope="row">Type</th>
                <td colspan="3">{{ omics.attributes.spectrometry }}</td>
            </tr>
            <tr>
                <th scope="row">Instrument model</th>
                <td>{{ omics.attributes.instrument }}</td>
                <th scope="row">Instrument manufacture</th>
                <td>{{ omics.attributes.manufacturer }}</td>
            </tr>
            <tr>
                <th scope="row">Ionization source</th>
                <td>{{ omics.attributes.ionization }}</td>
                <th scope="row">Analyzer</th>
                <td>{{ omics.attributes.analyzer }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2">데이터 파일 유형</h2>
        <table class="view-table">
            <caption class="sr-only">데이터 파일 유형</caption>
            <tbody>
            <tr>
                <th scope="row">원천 데이터</th>
                <td>{{ omics.rawdataTypes | fileType }}</td>
            </tr>
            <tr>
                <th scope="row">{{ omics | groupNm }}</th>
                <td>{{ omics.processedTypes | fileType }}</td>
            </tr>
            </tbody>
        </table>

        <h2 class="h2">데이터 공개</h2>
        <table class="view-table">
            <caption class="sr-only">상세</caption>
            <tbody>
            <tr>
                <th scope="row">공개날짜</th>
                <td>{{ omics.publicDate | date}}</td>
            </tr>
            </tbody>
        </table>


        <!--div class="filter-group" style="margin-bottom: 0px;">
            <div class="group-item">
                <h2 class="h2">심의결과</h2>
            </div>
            <div class="btn-toolbar-right" v-show="editable()">
                <button class="btn-outline-secondary-sm" data-toggle="tooltip" data-placement="top" title="삭제하기"
                        @click="removeReview()" ng-disabled="!modelHandler.hasSelectedItems()"
                        ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다.">
                    <i class="xi-trash"></i><span class="sr-only">삭제하기</span>
                </button>
                <button class="btn-outline-secondary-sm" data-toggle="tooltip" data-placement="top" title="등록하기"
                        @click="onClickOmicsReview()">
                    <i class="xi-file-add"></i><span class="sr-only">등록하기</span>
                </button>

                <button class="btn-primary-sm" data-toggle="tooltip" data-placement="top" title="완료하기"
                        @click="completeReview()" ng-disabled="!completable()"
                        ng-confirm-click="심의를 완료하겠습니까?">
                    <i class="xi-check-circle"></i><span class="sr-only">완료하기</span>
                </button>
            </div>
        </div>

        <table class="data-table" v-show="visible()">
            <thead>
            <tr>
                <th class="custom-checkbox">
				<span v-show="editable()">
					<input type="checkbox" id="chkOmicsReviewAll" class="custom-control-input"
                           v-model="checkedAll"
                           ng-change="modelHandler.selectAll(modelHandler.checkedAll)"/>
					<label class="custom-control-label" for="chkOmicsReviewAll"><span
                            class="sr-only">전체선택</span></label>
				</span>
                    <span ng-hide="editable()">순번</span>
                </th>
                <th>제목</th>
                <th>심의내용</th>
                <th>첨부파일</th>
                <th>심의상태</th>
                <th>심의날짜</th>
            </tr>
            </thead>
            <tbody>
            <tr v-hide="reviews.list > 0">
                <td colspan="6" class="text-center">심의 결과가 없습니다</td>
            </tr>
            <tr v-for="item in reviews.list">
                <td class="custom-checkbox">
				<span v-show="editable()">
					<input type="checkbox" class="custom-control-input" v-model="checked"/>
					<label class="custom-control-label">
                        <span class="sr-only">선택</span>
                    </label>
				</span>

                </td>
                <td><a class="link-more" @click="onClickOmicsReview(item)">{{ item.name }}</a></td>
                <td>{{ item.comment }}</td>
                <td><a class="link-more" @click="download(item.attachment)">{{ item.attachment.name }}</a></td>
                <td>{{ item.status == "ACCEPT" ? '정상':'지원필요' }}</td>
                <td>{{ item.date | date}}</td>
            </tr>
            </tbody>
        </table>

        <div class="filter-group" style="margin-bottom: 0px;">
            <div class="group-item">
                <h2 class="h2">승인결과</h2>
            </div>
            <div class="btn-toolbar-right" v-show="editable()">
                <button class="btn-outline-secondary-sm" data-toggle="tooltip" data-placement="top" title="저장히기"
                        @click="update()">
                    <i class="xi-save"></i><span class="sr-only">저장히기</span>
                </button>
                <button class="btn-primary-sm" type="button" data-toggle="tooltip" data-placement="top" title="완료하기"
                        @click="confirm()" ng-disabled="!completable()"
                        ng-confirm-click="승인처리를 완료하겠습니까">
                    <i class="xi-check-circle"></i><span class="sr-only">완료하기</span>
                </button>
            </div>
        </div>
        <table class="view-table">
            <caption class="sr-only">
                승인정보
            </caption>
            <tbody v-show="editable()">
            <tr>
                <th scope="row">승인상태</th>
                <td>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="confirm-accept" name="confirm-statue" class="custom-control-input"
                               v-model="omics.confirmstate.status" value="ACCEPT"/>
                        <label class="custom-control-label" for="confirm-accept">승인</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="confirm-reject" name="confirm-statue" class="custom-control-input"
                               v-model="omics.confirmstate.status" value="REJECT"/>
                        <label class="custom-control-label" for="confirm-reject">반려</label>
                    </div>
                </td>
                <th scope="row">승인날짜</th>
                <td>
                    <div class="date-input-group">
                        <input class="date-input" id="lightpick33" type="text" placeholder="YYYY-MM-DD" required/>
                        <span class="date-icon"><i class="xi-calendar-list"></i></span>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    승인/반려 내용
                </th>
                <td colspan="3">
                <textarea class="form-control" cols="30" rows="3" title="승인/반려 내용"
                          placeholder="작성하여주세요"
                          v-model="omics.confirmstate.comment"
                ></textarea>
                </td>
            </tr>
            </tbody>
            <tbody ng-hide="editable()">
            <tr>
                <th scope="row">승인상태</th>
                <td>{{ (omics.confirmstate.status == 'REJECT')? '반려' : '승인' }}</td>
                <th scope="row">승인날짜</th>
                <td>{{ omics.confirmstate.date | date}}</td>
            </tr>
            <tr>
                <th scope="row">{{ (omics.confirmstate.status == 'REJECT')? '반려' : '승인' }} 내용</th>
                <td colspan="3">{{ omics.confirmstate.comment }}</td>
            </tr>
            </tbody>
        </table-->


<!--
        <h2 class="h2">연관 데이터</h2>
-->

       <!-- <ul class="tab-menu m-t-75">
            <li class="menu-item active">
                <a data-toggle="tab" class="menu-link" href="#tab1">연구대상자</a>
            </li>
            <li class="menu-item">
                <a data-toggle="tab" class="menu-link" href="#tab2">연구샘플</a>
            </li>
        </ul>


        <div class="tab-content">
            <div id="tab1" class="tab-pane active">
                <span class="sr-only">연구대상자</span>
                111
            </div>
            <div id="tab2" class="tab-pane">
                <span class="sr-only">연구샘플</span>
                2222
            </div>
        </div>
-->
        <!--<h2 class="h2"><spring:message code="main.연관_데이터"/></h2>-->

        <!--    &lt;!&ndash; 탭 &ndash;&gt;-->
        <!--    <ul class="tab-menu nav-justified">-->
        <!--        <li class="menu-item"><a class="menu-link" ng-class="tab.sub.css(1)" @click="tab.sub.click(1)"><spring:message code="main.연구대상자"/></a></li>-->
        <!--        <li class="menu-item"><a class="menu-link" ng-class="tab.sub.css(2)" @click="tab.sub.click(2)"><spring:message code="main.연구샘플"/></a></li>-->
        <!--    </ul>-->

        <!--    &lt;!&ndash; 탭 내용 &ndash;&gt;-->
        <!--    <div class="tab-content">-->
        <!--        <div class="tab-pane fade show" ng-class="tab.sub.css(1)">-->
        <!--            <span class="sr-only"><spring:message code="main.연구대상자"/></span>-->
        <!--            <jsp:include page="../clincTrgter/TOreoClincTrgterTable.jsp"/>-->
        <!--        </div>-->

        <!--        <div class="tab-pane fade show" ng-class="tab.sub.css(2)">-->
        <!--            <span class="sr-only"><spring:message code="main.연구샘플"/></span>-->
        <!--            <jsp:include page="../clincSample/TOreoClincSmpleTableMeasure.jsp"/>-->
        <!--        </div>-->

        <!--    </div>-->
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        name: "OmicsDataExper",
        data() {
            return {
                checkedAll: '',
                checked: [],
                reviews: {},
                study: {
                    disease: {
                        koreanName: '',
                        englishName: ''

                    }
                },
                omics: {
                    accession: ''
                    , attributes: ''
                    , confirmState: ''
                    , design: ''
                    , disease: ''
                    , experType: ''
                    , id: ''
                    , name: ''
                    , omicsType: ''
                    , processedTypes: ''
                    , project: ''
                    , publicDate: ''
                    , publicYn: ''
                    , rawdataTypes: ''
                    , registDate: ''
                    , registStatus: ''
                    , registUser: ''
                    , reviewState: ''
                    , study: ''
                    , submitState: ''
                    , verifyState: ''
                    , writingState: ''
                }
            }
        },
        props: ['id'],
        async created() {
            await this.initData(this.id)
        },

        methods: {
            editable() {

            },
            onClickOmicsReview() {

            },
            download() {

            },
            visible() {

            },
            completeReview() {

            },
            completable() {
            },
            removeReview() {

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
            async initData(id) {
                console.log('log2', id)


                let omicsData = await axios.get(
                    "/isg-oreo/api/omics/" + id,
                    {}
                );
                console.log('omicsData', omicsData)
                let studyData = await axios.get(
                    "/isg-oreo/api/clinic-studies/" + omicsData.data.study.id,
                    {}
                );

                console.log('studyData', studyData)
                let reviewsData = await axios.get(
                    "/isg-oreo/api/omics/" + id + "/reviews",
                    {}
                );

                console.log('reviewsData', reviewsData)
                this.reviews = reviewsData.data
                console.log('this.reviews', this.reviews)

                this.omics = omicsData.data
                this.study = studyData.data

            },

        }
    }
</script>

<style scoped>

</style>
