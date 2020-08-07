<template>
    <div>
        <div class="filter-group">
            <div class="group-item">
                <div class="custom-checkbox custom-checkbox-all">
                    <!--input type="checkbox" class="custom-control-input"
                           v-model="this.checkedAll" @change="selectAll()"/>
                    <label class="custom-control-label">
                        <span class="sr-only">전체선택</span>
                    </label-->
                    <!--<b-form-checkbox
                            v-model="allSelected"
                            :indeterminate="indeterminate"
                            aria-describedby="flavours"
                            aria-controls="flavours"
                            @change="toggleAll"
                    >
                        {{ allSelected ? 'Un-select All' : 'Select All' }}
                    </b-form-checkbox>-->

                </div>
                <total-record-count :result-list="resultList"/>
            </div>

            <div class="group-item">
                <div class="search-input-group">
                    <input class="search-input"
                           type="text"
                           placeholder="검색어"
                           @keydown.enter="search()"
                           v-model="params.keyword">
                    <b-button class="search-btn" @click="search()">
                        <i class="xi-search"></i>
                        <span class="sr-only">조회</span>
                    </b-button>
                </div>
                <b-button class="btn-outline-secondary-sm"
                          title="공개"
                          :disabled="selected.length == 0"
                          @click="release()">
                    <i class="xi-eye"></i><span class="sr-only">공개</span>
                </b-button>
                <b-button class="btn-outline-secondary-sm"
                          title="삭제"
                          :disabled="selected.length == 0 "
                          @click="remove()">
                    <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </b-button>

                <page-unit :page-unit="resultList.data.numberOfRows"
                           @onChangePageUnit="onChangePageUnit"></page-unit>

                <span>
                    <!--<b-button class="btn-primary-sm"  @click="onClickCreateLink()">
                    <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>-->
                    <!--<b-button class="btn-primary-sm" @click="onClickCreateLink">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>-->
                    <a :href="'omicsWizard/' + this.omicsType" class="btn-primary-sm">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </a>

                </span>
            </div>
        </div>
        <div>
            <omics-data-list :result-list="resultList"
                             :omics-type="omicsType"
                             :selected="selected"
                             @checkSelected="checkSelected"
                             @currentPageNo="search"></omics-data-list>
        </div>
    </div>
</template>

<script>
    import OmicsDataList from "./OmicsDataList";
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";
    import PageUnit from "../../components/PageUnit";
    import OmicsWizard from "./OmicsWizard";

    export default {
        name: "OmicsRegistList",
        components: {OmicsWizard, PageUnit, TotalRecordCount, OmicsDataList},
        props: ['omicsType'],
        watch: {
            omicsType(newProps) {
                this.search()
            }
        },
        data() {
            return {
                allSelected: false,
                indeterminate: false,
                selected: [],
                isRegist: false,
                checkedAll: {},
                params: {},
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: [],
                    },
                },
                filters: {
                    fields: [
                        {id: "", name: "전체"},
                        {id: "projectNo", name: "일련번호"},
                        {id: "projectName", name: "과제명"},
                        {id: "uniqueNo", name: "ATIS 고유번호"},
                        {id: "program", name: "사업명"},
                        {id: "unitProgram", name: "대분야"},
                        {id: "middleRealm", name: "과제중분류"},
                        {id: "status", name: "연구상태"},
                        {id: "institute", name: "주관기관"},
                        {id: "charger", name: "주관책임자"},
                        {id: "participants", name: "참여기업"},
                        {id: "purpose", name: "연구개발 목표"},
                        {id: "contents", name: "연구개발 내용"},
                        {id: "objective", name: "최종목표"},
                        {id: "conclusion", name: "연구내용"},
                        {id: "features", name: "개발기술 특징"},
                        {id: "expectation", name: "기대효과"},
                        {id: "appliedTo", name: "적용분야"},
                        {id: "keywords", name: "키워드"},
                    ],
                    params: {},
                },
            }
        },
        created() {
            this.search()
        },
        methods: {
            toggleAll(checked) {
                this.selected = checked ? this.flavours.slice() : []
            },
            checkSelected(newVal) {
                console.log("??????????????????????????????")
                this.selected = newVal
            },
            async search(page = 1) {

                let url = "/isg-oreo/api/omics";
                const params = new URLSearchParams();

                if (!this.params.keyword == '') {
                    for (const row of this.filters.fields) {
                        if (row.id !== '') params.append('fields', row.id)
                    }
                    params.append('keyword', this.params.keyword)
                }
                params.append('ownerId', 7)
                params.append('omicsType', this.omicsType)
                params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
                params.append('pageSize', this.resultList.data.numberOfRows)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)

                this.resultList = await axios.get(url, {params: params});
                console.log('this.resultList' + this.omicsType, this.resultList)
            },
            onClickCreateLink() {

            },
            onChangePageUnit(page) {
                this.resultList.data.numberOfRows = page
                this.search()
            },
            release() {

            },
            async remove() {

                await this.$confirm('삭제된 데이터는 복구가 불가 합니다.','삭제 하시겠습니까?','question')

                const removeData = await axios.put('/isg-oreo/api/omics?action=REMOVE', this.selected);
                if (removeData.data.errorList.total == 0) {
                    this.$alert(
                        removeData.data.processedList.total + '건 삭제\n'
                        , '요청이 완료 되었습니다.', 'info')
                } else {
                    this.$alert(
                        removeData.data.processedList.total + '건 삭제\n'+
                        removeData.data.errorList.total + '건 에러\n'

                        , '요청이 완료 되었습니다.', 'info')
                }
                this.selected = {}
                this.search()
            }
        },
    }

</script>
