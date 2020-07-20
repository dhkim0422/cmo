<template>
    <div class="container">
        <!-- 검색폼 -->

        <search-box :filters="filters" @searchClick="changeParams"></search-box>
        <!-- 검색 목록 -->
        <div class="filter-group">
            <div class="group-item">
                <total-record-count :result-list="resultList"/>
            </div>
            <div class="group-item">
                <b-button lass="btn-outline-secondary-sm" title="삭제" @click="remove">
                    <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </b-button>
                <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
                <page-unit :page-unit="resultList.data.numberOfRows"
                           @onChangePageUnit="onChangePageUnit"></page-unit>
                <span data-toggle="tooltip" data-placement="top" title="연구샘플_등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.sampleSavePopup variant="primary" @click="onClickCreateLink">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
                    <!--등록을 위한 페잊 컴포넌트-->
                    <samples-merge @saveOK="selectList" v-if="isRegist"/>
                <div>
                </div>
                </span>
            </div>
        </div>

        <b-table
                ref="selectableTable"
                selectable
                select-mode="multi"
                class="data-table"
                :items="items"
                :fields="fields"
                @row-selected="onRowSelected"

        >
            <template v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
            <template v-slot:cell(accession)="data">
                <a :href="'samplesDetail/' + data.item.id">{{data.value}}</a>
            </template>
            <template v-slot:cell(agreeProvide)="data">
                {{data.value == true ? '있음' : '없음'}}
            </template>
            <template v-slot:cell(age)="data">
                {{data.item.unknownAge == true ? '나이불명' : data.value}}
            </template>
        </b-table>
        <b-pagination v-model="resultList.data.currentPage" :per-page="resultList.data.numberOfRows"
                      :total-rows="resultList.data.total" size="sm" align="center"
                      @change="changePageNo"
        />
    </div>
</template>

<script>

    import axios from "../../utils/axios";
    import SamplesMerge from "./SamplesMerge";

    export default {
        name: "SamplesList",
        components: {SamplesMerge},
        data() {
            return {
                isRegist: false,
                fields: [
                    {
                        key: 'selected',
                        label: '선택'
                    },
                    {key: 'accession', name: '등록번호'},
                    {
                        key: 'target.accession',
                        label: '연구샘플 등록번호'
                    },
                    {
                        key: 'target.genderName',
                        label: '성별'
                    },
                    {
                        key: 'uniqueNo',
                        label: '샘플 고유번호 '

                    },
                    {
                        key: 'origin.name',
                        label: '샘플유래'
                    },
                    {
                        key: 'name',
                        label: '샘플명'
                    },
                    {
                        key: 'type.name',
                        label: '샘플구분'
                    },
                    {
                        key: 'disease',
                        label: '질환명'
                    }
                ],
                items: [],
                selected: '',
                currentPageNo: 1,
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        currentPageNo: 0,
                        pageSize: 10,
                        list: [],
                        target: {},
                        origin: {},
                        collectLocal: {},
                        type: {},
                    },
                },
                filters: {
                    //해당 내역을 서치박스의 셀렉트 리스트가 생성됩니다.
                    fields: [
                        {id: "", name: "전체"},
                        {id: "sampleNo", name: "등록번호"},
                        {id: "uniqueNo", name: "고유번호"},
                        {id: "sampleName", name: "샘플명"},
                        {id: "target", name: "연구샘플"},
                        {id: "disease", name: "질환명"},
                    ],
                    params: {},
                },
            };
        },
        methods: {
            onChangePageUnit(unit) {
                this.resultList.data.numberOfRows = unit
                this.selectList()
            },
            onRowSelected(items) {
                this.selected = items
            },
            //Pagination 컴포넌트의 change emit
            changePageNo(pageNo) {
                this.currentPageNo = pageNo;
                this.selectList(pageNo);
            },
            changeParams(params) {
                this.params = params;
                this.selectList()
            },
            async selectList(page = 0) {

                this.isRegist = false
                let url = "/isg-oreo/api/clinic-samples";
                this.params["rowSize"] = this.resultList.data.numberOfRows;
                this.params["firstIndex"] = 1;
                this.params['currentPage'] = page
                this.resultList = await axios.get(url, {params: this.params});
                this.items = this.resultList.data.list
            },
            onClickDetailLink(target) {
                this.$router.push({path: "/samples/SamplesDetail/" + target.id});
            },
            onClickCreateLink() {
                this.isRegist=true
            },
            remove() {

            },

        },
    };
</script>
