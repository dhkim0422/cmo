<template>
    <div class="filter-group">
        <div class="group-item">
            <div class="custom-checkbox custom-checkbox-all">
                <input type="checkbox" class="custom-control-input"
                       v-model="this.checkedAll" @change="this.selectAll()" />
                <label class="custom-control-label" >
                    <span class="sr-only">전체선택</span>
                </label>
            </div>
            <total-record-count :result-list="resultList"/>
        </div>

        <div class="group-item">
            <div class="search-input-group">
                <input class="search-input" type="text" placeholder="검색어" @keydown.enter="search()">
                <button class="search-btn" ng-click="search()">
                    <span class="sr-only">조회</span><i class="xi-search"></i>
                </button>
            </div>
            <button class="btn-outline-secondary-sm" type="button"
                    data-toggle="tooltip" data-placement="top" title="공개"
            ng-click="release()" ng-disabled="!modelHandler.hasSelectedItems()"
            ng-confirm-click="선택된 정보들을 공개하겠습니까?">
            <i class="xi-eye"></i><span class="sr-only">공개</span>
            </button>
            <button class="btn-outline-secondary-sm" type="button"
                    data-toggle="tooltip" data-placement="top" title="삭제"
            ng-click="remove()" ng-disabled="!modelHandler.hasSelectedItems()"
            ng-confirm-click="정보를 삭제합니다. 삭제된 정보는 복구할 수 없습니다." >
            <i class="xi-trash"></i><span class="sr-only">삭제</span>
            </button>
            <select class="length" ng-model="pageHandler.numberOfRows"  ng-change="search()">
            </select>
            <span data-toggle="tooltip" data-placement="top" >
            <button class="btn-primary-sm" type="button" @click="onClickCreateLink()">
                <i class="xi-file-add"></i><span class="sr-only">등록</span>
            </button>
            </span>
        </div>

        <omics-data-list :result-list="resultList" omics-type="omicsType"></omics-data-list>
    </div>
</template>

<script>
    import OmicsDataList from "./OmicsDataList";
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";
    export default {
        name: "OmicsRegistList",
        components: {TotalRecordCount, OmicsDataList},
        props: ['omicsType'],
        data() {
            return {
                checkedAll:{},
                params:{},
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: [],
                    },
                },
            }
        },
        created() {
            this.search()
        },
        methods: {
            selectAll(){

            },
            async search(){
                let params = {}
                this.params['omicsType'] = this.omicsType

                let url = "/isg-oreo/api/omics";
                this.params["rowSize"] = this.resultList.data.numberOfRows;
                this.params["firstIndex"] =
                    (this.currentPageNo - 1) * this.resultList.data.numberOfRows;
                this.resultList = await axios.get(url, {params: this.params});
            },
            onClickCreateLink(){

            }
        },
    }

</script>
