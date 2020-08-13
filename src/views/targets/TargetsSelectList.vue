<template>
    <div class="container">
        <!-- 검색 목록 -->
        <div class="filter-group">
            <div class="group-item">
                <total-record-count :result-list="resultList"/>
            </div>
            <div class="group-item">
                <input class="search-input" type="text" placeholder="검색어"
                       v-model="params.keywokd" @keydown.enter="selectList()"/>
                <button class="search-btn" @click="selectList()">
                    <span class="sr-only">조회</span>
                    <i class="xi-search"/>
                </button>

                <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
                <page-unit :page-unit="resultList.data.numberOfRows"
                           @onChangePageUnit="onChangePageUnit"></page-unit>

            </div>
        </div>
        <b-table
                ref="selectableTable"
                selectable
                select-mode="single"
                class="data-table"
                :items="items"
                :fields="fields"
                :busy="this.items.length == 0"
                @row-selected="onRowSelected"

        >
          <template v-slot:table-busy>
            <div class="text-center  my-2">
              <!--<b-spinner class="align-middle"></b-spinner>-->
              검색된 항목이 없습니다.
            </div>
          </template>
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
            <template v-slot:cell(agreeProvide)="data">
                {{data.value == true ? '있음' : '없음'}}
            </template>
            <template v-slot:cell(age)="data">
                {{data.item.unknownAge  == true ? '나이불명' : data.value}}
            </template>

        </b-table>
        <b-col class="my-1">
            <b-pagination v-model="resultList.data.currentPage" :per-page="resultList.data.numberOfRows"
                          :total-rows="resultList.data.total" size="sm" align="center"
                          @change="changePageNo"
            />
        </b-col>
    </div>
</template>

<script>
    import axios from "../../utils/axios";
    import searchBox from '../../components/SearchBox'
    import TotalRecordCount from "../../components/TotalRecordCount";
    import TargetsDetail from "./TargetDetail";
    import TargetsMerge from "./TargetsMerge";
    import PageUnit from "../../components/PageUnit";

    export default {
        name: 'TargetsSelectList',
        props:['selectType'],
        components: {
            PageUnit,
            TargetsMerge,
            TargetsDetail,
            TotalRecordCount,
            searchBox
        },
        data() {
            return {
                fields: [
                    {
                        key: 'selected',
                        label: '선택'
                    },
                    {key: 'accession'},
                    {
                        key: 'uniqueNo',
                        label: '고유대상 번호'
                    },
                    {
                        key: 'age',
                        label: '나이'
                    },
                    {
                        key: 'agreeProvide',
                        label: '동의여부'

                    },
                    {
                        key: 'genderName',
                        label: '성별'
                    }
                ],
                items: [],
                isMerge: false,
                isDetail: false,
                summary: {
                    study: 0,
                    omics: 0,
                    omicsFile: 0
                },
                filter: {
                    keyword: '',
                },
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: []
                    }
                },
                filters: {
                    fields: [
                        {id: '', name: '전체'},
                        {id: 'targetNo', name: '등록번호'},
                        {id: 'uniqueNo', name: '고유번호'},
                        {id: 'birthday', name: '출생일'},
                        {id: 'age', name: '나이'}
                    ]
                },
                params: {keyword:""},
                selected: []
            }

        },
        methods: {
            onRowSelected(items) {
                this.$emit('targetSelect' ,items)

            },
            //Pagination 컴포넌트의 change emit
            changePageNo(pageNo) {
                this.resultList.data.currentPage = pageNo
                this.selectList(pageNo);
            },
            onChangePageUnit(unit) {
                this.resultList.data.numberOfRows = unit
                this.selectList()
            },
            changeParams(params) {
                this.params = params;
                this.selectList()
            },
            async selectList(page = 1) {


                let url = '/isg-oreo/api/clinic-targets'
                this.params["rowSize"] = this.resultList.data.numberOfRows;


                for (const item of this.filters.fields) {
                    this.params['fileld'] = ['targetNo','uniqueNo','birthday','age']
                }

                this.params["firstIndex"] = (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows;
                this.params['currentPage'] = page
                this.resultList = await axios.get(url, {params: this.params});
                this.items = this.resultList.data.list


            },
            close() {
                this.$emit('projectSelected', this.selected);
                this.$bvModal.hide('registPopup')
            }

        },

    };
</script>
