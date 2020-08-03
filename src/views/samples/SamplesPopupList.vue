<template>
    <b-modal id="SamplesPopupList" size="xl" :title="title()" hide-footer>

        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <!-- modal-header -->
                <!--<div class="modal-header">
                    <h5 class="modal-title"><spring:message code="sample.연구샘플_검색"/></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
-->
                <!-- modal-body -->
                <div class="modal-body">
                    <h2 class="h2">연구샘플 목록</h2>
                    <!-- list filter -->
                    <div class="filter-group">
                        <div class="group-item">
                            <total-record-count :result-list="resultList"/>
                        </div>
                        <div class="group-item">
                            <div class="search-input-group">
                                <input class="search-input" type="text" placeholder="검색어"
                                       v-model="filter.keyword" @keypress.enter="search()">
                                <button class="search-btn" type="submit" @click="search()">
                                    <span class="sr-only"></span><i class="xi-search"></i>
                                </button>
                            </div>
                            <page-unit :page-unit="resultList.data.numberOfRows"
                                       @onChangePageUnit="onChangePageUnit"></page-unit>


                            <button class="btn-primary-sm" type="button" data-toggle="tooltip"
                                    data-placement="top" title="선택" @click="select()"
                            >
                                <span>선택</span>
                            </button>
                        </div>
                    </div>

                    <table class="data-table custom-table-scrollable">
                        <caption class="sr-only">목록</caption>
                        <thead>
                        <tr>
                            <th class="fixed-x" style="width: 70px;">
                                <div class="custom-checkbox">
                                    <b-form-checkbox
                                            v-model="allSelected"
                                            :indeterminate="indeterminate"
                                            @change="toggleAll"
                                    >
                                        <label class="custom-control-label" for="searchSampleAll">
                                        <span class="sr-only">
                                            전체선택
                                        </span>
                                        </label>
                                    </b-form-checkbox>
                                </div>
                            </th>
                            <th class="fixed-x">등록번호</th>
                            <th>연구대상자 등록번호</th>
                            <th>성별</th>
                            <th>샘플 고유번호</th>
                            <th>샘플유래</th>
                            <th>샘플명</th>
                            <th>샘플구분</th>
                            <th>질환명</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-show="!modelHandler.size() > 0">
                            <td colspan="9">검색된 결과가 없습니다.</td>
                        </tr>
                        <tr v-for="item in resultList.data.list">
                            <td class="fixed-x">
                                <div class="custom-checkbox">
                                    <!--<input type="checkbox" class="custom-control-input" id="searchSmple{{item.id}}"
                                           checklist-model="modelHandler.selectedIdList"
                                           checklist-value="item.id" ng-change="modelHandler.select(item, onlyOne)" />-->
                                    <label class="custom-control-label" :for="'searchSmple'+item.id">
                                        <span class="sr-only">선택</span>
                                    </label>
                                </div>
                            </td>
                            <td class="fixed-x">{{ item.accession }}</td>
                            <td>{{ item.target && item.target.accession }}</td>
                            <td>{{ item.target && item.target.gender }}</td>
                            <td>{{ item.uniqueNo }}</td>
                            <td>{{ item.origin && item.origin.name }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.type && item.type.name }}</td>
                            <td>{{ item.disease }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <!-- modal-footer -->
                <div class="modal-footer">
                    <button type="reset" class="btn-outline-secondary" @click="cancle()">취소하기</button>
                    <button type="submit" class="btn-primary" @click="select()">선택하기</button>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import TotalRecordCount from "../../components/TotalRecordCount";
    import PageUnit from "../../components/PageUnit";

    export default {
        name: "SamplesPopupList",
        components: {PageUnit, TotalRecordCount},
        data() {
            return {
                allSelected: false,
                indeterminate: false,
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: [],
                    },
                },
                selected: [],
                filter: {
                    keyword: ''
                }

            }
        },
        watch: {
            selected(newVal, oldVal) {
                // Handle changes in individual flavour checkboxes
                if (newVal.length === 0) {
                    this.indeterminate = false
                    this.allSelected = false
                } else if (newVal.length === this.resultList.data.list.length) {
                    this.indeterminate = false
                    this.allSelected = true
                } else {
                    this.indeterminate = true
                    this.allSelected = false
                }
            }
        },
        methods: {
            toggleAll() {

            },
            onChangePageUnit(pageUnit) {
                this.resultList.data.numberOfRows = pageUnit
                this.search()
            },
            select() {

            },
            search(page = 1) {

            },
            cancle() {

            }
        }

    }
</script>

<style scoped>

</style>
