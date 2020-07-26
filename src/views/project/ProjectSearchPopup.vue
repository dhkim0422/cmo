<template>
    <b-modal id="projectSearchPopup" size="xl" title="연구과제 목록" hide-footer>
        <div class="">
            <!-- modal-body -->
            <div class="modal-body">

                <!-- list filter -->
                <div class="filter-group">
                    <div class="group-item">
                        <total-record-count :result-list="resultList"/>
                    </div>
                    <div class="group-item">
                        <div class="search-input-group">
                            <input class="search-input" type="text" placeholder="검색어" ref="focusThis"
                                   v-model="params.keyword" @keydown.enter="search()"/>
                            <button class="search-btn" @click="search()">
                                <span class="sr-only">조회</span>
                                <i class="xi-search"/>
                            </button>
                        </div>

                        <page-unit :page-unit="resultList.data.numberOfRows" @onChangePageUnit="search"/>
                        <!--<button class="btn-primary-sm" type="button" @click="select()">
                            <i class="xi-file-add"></i>
                            <span class="sr-only">선택</span>
                        </button>-->
                    </div>
                </div>
                <div>
                <b-table
                        ref="selectableTable"
                        selectable
                        select-mode="single"
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
                </b-table>
                <b-col class="my-1">
                    <b-pagination v-model="resultList.data.currentPage" :per-page="resultList.data.numberOfRows"
                                  :total-rows="resultList.data.total" size="sm" align="center"
                                  @change="changePageNo"
                    />
                </b-col>
                </div>
                <!--<table class="data-table custom-table-scrollable">
                    <caption class="sr-only">목록</caption>
                    <thead>
                    <tr>
                        <th class="fixed-x" style="width: 70px;">
                            <div class="custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="searchProjectAll"
                                       ng-model="modelHandler.checkedAll" ng-disabled="true"
                                       ng-change="modelHandler.selectAll(modelHandler.checkedAll)" />
                                <label class="custom-control-label" for="searchProjectAll">
                                    <span class="sr-only">모두선택</span>
                                </label>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr ng-repeat="item in modelHandler.getItems()">
                        <td class="fixed-x">
                            <div class="custom-checkbox">
                                <input type="checkbox" class="custom-control-input"
                                       checklist-model="modelHandler.selectedIdList"
                                       checklist-value="item.id" ng-change="modelHandler.select(item, true)" />
                                <label class="custom-control-label" >
                                    <span class="sr-only">선택</span>
                                </label>
                            </div>
                        </td>

                    </tr>
                    </tbody>
                </table>-->
            </div>

            <!-- modal-footer -->
            <div class="modal-footer">
                <button type="reset" class="btn-outline-secondary" @click="close">취소하기</button>
                <button type="submit" class="btn-primary" ng-click="select()"
                        ng-disabled="!modelHandler.hasSelectedItems()">선택하기
                </button>
            </div>
        </div>

    </b-modal>

</template>

<script>
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";
    import PageUnit from "../../components/PageUnit";

    export default {
        name: "ProjectSearchPopup",
        components: {PageUnit, TotalRecordCount},
        data() {
            return {
                selected: [],

                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: []
                    }
                },
                fields: [
                    {key: 'selected', label: '선택'},
                    {key: 'accession', label: '등록번호'},
                    {key: 'uniqueNo', label: 'KEITI 고유번호'},
                    {key: 'program', label: '사업명'},
                    {key: 'unitProgram', label: '단위사업'},
                    {key: 'middleRealm', label: '중분야'},
                    {key: 'name', label: '연구과제 제목'},
                    {key: 'institute', label: '주관기관'},
                    {key: 'charger', label: '주관책임자'}
                ],
                items: [],
                params: {keyword: ''}
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
            select() {
                this.$emit('onProjectSelected',this.selected)
                this.close()
            },
            async search( page = 1) {
                let url = '/isg-oreo/api/clinic-studies'
                const params = new URLSearchParams();

                //params.append('fields', row.id)
                params.append('keyword', this.params.keyword)

                params.append('ownerId', 7)
                params.append('omicsType', this.omicsType)
                params.append('firstIndex', 0)
                params.append('pageSize', this.resultList.data.numberOfRows)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)
                this.resultList = await axios.get(url, {params: params});
                this.items = this.resultList.data.list

            },
            close(){
                this.$bvModal.hide('projectSearchPopup')
            }
        }
    }
</script>

<style scoped>

</style>
