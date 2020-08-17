<template>
    <div class="container">
      <page-head-info :root-menu-nm="'내정보'" :menu-nm="'객체 목록'"/>
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
                <span data-toggle="tooltip" data-placement="top" title="객체 등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.registPopup variant="primary" @click="onClickRegist">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
                    <!--등록을 위한 페잊 컴포넌트-->
                    <targets-merge @saveOK="selectList" v-if="isRegist"/>
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
            <template v-slot:cell(accession)="data">
                <a :href="'targetsDetail/' + data.item.id">{{data.value}}</a>
            </template>
            <template v-slot:cell(agreeProvide)="data">
                {{data.value == true ? '있음' : '없음'}}
            </template>
            <template v-slot:cell(age)="data">
                {{data.item.unknownAge == true ? '나이불명' : data.value}}
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
        name: 'TargetsList',
        components: {
            PageUnit,
            TargetsMerge,
            TargetsDetail,
            TotalRecordCount,
            searchBox
        },
        data() {
            return {
                isRegist: false,
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
                params: {},
                selected: []
            }

        },
        methods: {
            onRowSelected(items) {
                this.selected = items
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
                this.isRegist = false
                let url = '/isg-oreo/api/clinic-targets'

                const params = new URLSearchParams();
                if (this.params.keyword != '') {
                    for (const row of this.params.fields) {
                        if (row.id !== '') params.append('fields', row.id)
                    }
                    params.append('keyword', this.params.keyword)
                }
              params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)
                this.resultList = await axios.get(url, {params: params});
                this.items = this.resultList.data.list
            },
            onClickDetailLink(target) {
                this.$router.push({path: '/targets/targetsDetail/' + target.id})

            },
            onClickRegist() {
                this.isRegist = true
            },
            async remove() {

                await this.$confirm('', "선태된 삭제 하시겠습니까?", 'error');

                if (this.selected.length == 0) {
                    this.$alert('', "선태된 내역이 없습니다.", 'error');
                    return;
                }
                let url = '/isg-oreo/api/clinic-targets?action=REMOVE'
                let response = await axios.put(url, this.selected);

                this.$alert('', '삭제 처리 되었습니다', 'info');

                this.selectList()
            }
        },
    };
</script>
