<template>
    <div class="container">

        <!-- 검색폼 -->
        <search-box :filters="filters" @searchClick="changeParams"></search-box>
        <!-- 검색 목록 -->
        <div class="filter-group">
            <div class="group-item">
                <div class="info">
                    전체 <span class="num">{{this.resultList.data.total}}</span>개,
                    페이지 <span class="num">{{this.resultList.data.currentPage}}</span> /
                    <span class="num">{{this.resultList.data.total / this.resultList.data.numberOfRows }}</span>
                </div>
            </div>
            <div class="group-item">
                <button class="btn-outline-secondary-sm" type="button"
                        data-toggle="tooltip" data-placement="top" title="del"
                        ng-click="remove()" ng-disabled="!modelHandler.hasSelectedItems()"
                        ng-confirm-click="confirmDel">
                    <i class="xi-trash"></i><span class="sr-only">del</span>
                </button>
                <select
                        @change="selectList"
                        v-model="resultList.data.numberOfRows"
                        class="length"
                        aria-invalid="false"
                >
                    <option label="10개씩 보기" value="10">10개씩 보기</option>
                    <option label="25개씩 보기" value="25">25개씩 보기</option>
                    <option label="50개씩 보기" value="50">50개씩 보기</option>
                    <option label="100개씩 보기" value="100">100개씩 보기</option>
                </select>
                <span data-toggle="tooltip" data-placement="top" title="연구대상자_등록">
                <button class="btn-primary-sm" type="button" ng-click="onClickCreateLink()">
                    <i class="xi-file-add"></i><span class="sr-only">regist</span>
                </button>
                </span>
            </div>
        </div>

        <table class="data-table">
            <thead>
            <tr>
                <th class="custom-checkbox">
                    <input type="checkbox" id="chkTargetAll" class="custom-control-input"
                           ng-model="modelHandler.checkedAll" ng-change="modelHandler.selectAll(modelHandler.checkedAll)" />
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
                           ng-change="modelHandler.select()" />
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
    import searchBox from '../../components/SearchBox'
    import axios from "../../utils/axios";

    export default {
        name: 'TargetsList',
        components: {
            searchBox
        },
        data() {
            return {

                summary:{
                    study:0,
                    omics:0,
                    omicsFile:0
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
                params:{}

            }

        },
        methods: {
            //Pagination 컴포넌트의 change emit
            changePageNo(pageNo) {
                this.resultList.data.currentPage = pageNo

                console.log('page' , this.resultList.data.currentPage +",,,"+ pageNo)
                this.selectList();
            },
            changeParams(params) {
                this.params = params;
                this.selectList();
            },
            async selectList() {
                let url = '/isg-oreo/api/clinic-targets'
                this.params["rowSize"] = this.resultList.data.numberOfRows;
                this.params["firstIndex"] = (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows;
                this.params['currentPage'] = this.resultList.data.currentPage
                this.resultList = await axios.get(url, {params: this.params});
            },
            onClickDetailLink(target) {
                this.$router.push({path: '/targets/targetsDetail/' + target.id})
            },

        },
    };
</script>
