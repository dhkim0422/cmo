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
                <button class="btn-outline-secondary-sm" type="button"
                        data-toggle="tooltip" data-placement="top" title="del"
                        ng-click="remove()" ng-disabled="!modelHandler.hasSelectedItems()"
                        ng-confirm-click="confirmDel">
                    <i class="xi-trash"></i><span class="sr-only">삭제</span>
                </button>
                <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
                <page-unit :page-unit="resultList.data.numberOfRows = 10" @onChangePageUnit="onChangePageUnit"></page-unit>
                <span data-toggle="tooltip" data-placement="top" title="연구대상자_등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.registPopup variant="primary">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
                    <!--등록을 위한 페잊 컴포넌트-->
                    <targets-merge :target-info="target" @insertOK="selectList"/>
                <div>
                </div>
                </span>
            </div>
        </div>

        <table class="data-table">
            <thead>
            <tr>
                <th class="custom-checkbox">
                    <input type="checkbox" id="chkTargetAll" class="custom-control-input"
                           ng-model="modelHandler.checkedAll"
                           ng-change="modelHandler.selectAll(modelHandler.checkedAll)"/>
                    <label class="custom-control-label" for="chkTargetAll"><span class="sr-only">전체선택</span></label>
                </th>
                <th>등록번호</th>
                <th>연구대상자_고유번호</th>
                <th>나이</th>
                <th>성별</th>
                <th>샘플개수</th>
            </tr>
            </thead>
            <tbody>
            <tr v-show="resultList.data.list.length == 0">
                <td colspan="7" class="text-center">nodata</td>
            </tr>
            <tr v-for="item in resultList.data.list">
                <td class="custom-checkbox">
                    <input type="checkbox" id="chkTrgt" class="custom-control-input"
                           checklist-model="modelHandler.selectedIdList" checklist-value="item.id"
                           ng-change="modelHandler.select()"/>
                    <label class="custom-control-label" for="chkTrgt"><span class="sr-only">select</span></label>
                </td>
                <td><a class="link-more" @click="onClickDetailLink(item);">{{ item.accession }}</a></td>
                <td><a class="link-more" @click="onClickDetailLink(item);">{{ item.uniqueNo }}</a></td>
                <td>{{ (item.unknownAge == 'true') ? '나이불명' : item.age }}</td>
                <td>{{ item.genderName }}</td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <Pagination
                @changePageNo="changePageNo"
                :currentPageNo="resultList.data.currentPage"
                :totalRecordCount="resultList.data.total"
                :pageUnit="resultList.data.numberOfRows"
        ></Pagination>


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
                isMerge: false,
                isDetail: false,
                target: {},
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
                params: {}

            }

        },
        methods: {
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
                this.params["firstIndex"] = (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows;
                this.params['currentPage'] = page
                this.resultList = await axios.get(url, {params: this.params});
            },
            onClickDetailLink(target) {
                this.target = target
                this.$router.push({path: '/targets/targetsDetail/' + target.id})

            }
        },
    };
</script>
