<template>
    <div>
        <div class="filter-group">
            <div class="group-item">
                <total-record-count :result-list="resultList"/>
            </div>
            <div class="group-item">

                <div class="search-input-group">
                    <input class="search-input" type="text" placeholder="검색어"
                           ng-model="filter.keyword" @keydown.enter="search()"/>
                    <button class="search-btn" @click="search()">
                        <span class="sr-only">조회</span>
                        <i class="xi-search"/>
                    </button>
                </div>
                <!--<div class="dropdown" ng-class="tune.css()" data-toggle="tooltip" data-placement="top"
                     title="파일유형">">
                    <button class="btn-outline-secondary-sm" type="button" @click="toggle()">
                        <i class="xi-tune"/>
                        <span class="sr-only">
                        필터
                        </span>
                    </button>
                    <div class="dropdown-menu" ng-class="css()">
                        <div class="form-inline">
                            <div ng-repeat="handler in handlerList" ng-hide="handler.isEmpty()">
                                <div class="form-title">{{ handler.name }}</div>
                                <div class="form-group">
                                    <div class="custom-checkbox" ng-repeat="item in handler.items">
                                        <input type="checkbox"
                                               class="custom-control-input"
                                               ng-model="item.selected"
                                               ng-change="select($index)"/>
                                        <label class="custom-control-label">{{ item.label }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-footer" style="border-top: none; padding-top: 0px;">
                                <button class="btn-outline-secondary" @click="cancel()">
                                    취소하기
                                </button>
                                <button class="btn-primary" @click="submit()">
                                    검색하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>-->
                <select
                        @change="select()"
                        v-model="resultList.data.numberOfRows"
                        class="length"
                        aria-invalid="false"
                >
                    <option label="10개씩 보기" value="10">10개씩 보기</option>
                    <option label="25개씩 보기" value="25">25개씩 보기</option>
                    <option label="50개씩 보기" value="50">50개씩 보기</option>
                    <option label="100개씩 보기" value="100">100개씩 보기</option>
                </select>
                <!--<select class="length" ng-model="pageHandler.numberOfRows"
                        ng-options="volume.value as volume.label for volume in pageHandler.volumes"
                        ng-change="search()">
                </select>-->
            </div>
        </div>
        <table class="data-table">
            <thead>
            <tr>

                <th>
                    등록번호
                </th>
                <th>
                    연구샘플
                </th>
                <th>
                    파일유형
                </th>
                <th>
                    파일종류
                </th>
                <th>
                    파일명
                </th>
                <th>
                    파일사이즈
                </th>
            </tr>
            </thead>
            <tbody>
            <tr ng-hide="modelHandler.size() > 0">
                <td colspan="8" class="text-center">
                    데이터가 없습니다.
                </td>
            </tr>
            <tr v-for="item in resultList.data.list">

                <td>{{ item.accession }}</td>
                <td>{{ item.sample.accession }}</td>
                <td>{{ item | groupNm }}</td>
                <td>{{ item.type }}</td>
                <td class="text-ellipsis-200"><a class="link-more" @click="download(item)">{{ item.name }}</a></td>
                <td>{{ item.size | bytes }}</td>
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
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";

    export default {
        name: "OmicsDataFileList",
        components: {TotalRecordCount},
        created() {
        },
        data() {
            return {
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 100,
                        list: [],
                    },
                }
            }
        },
        props:['id'],
        methods: {
            changePageNo(pageNo) {
                this.currentPageNo = pageNo;
                this.selectList();
            },
            download() {

            },
            async search() {
                let resultListData = await axios.get('isg-oreo/api/omics/11/files/' + this.id ,{})
                this.resultList = resultListData.data;

            },
            cancel() {

            },
            submit() {

            },
            toggle(){

            },
            select(index) {

            }
        }
    }
</script>


