<template>
    <b-modal id="ClinicSudiesSearchPopup" size="xl" title="연구과제 목록" hide-footer>
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
                    </div>
                </div>
                <div>
                    <b-table class=""
                             ref="selectableTable"
                             selectable
                             select-mode="single"
                             responsive
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
                        <template v-slot:cell(rt)="data">
                            {{data.item.largeClass.name }} ({{data.item.smallClass.name }})
                        </template>
                        <template v-slot:cell(rd)="data">
                            {{data.item.disease.koreanName }} ({{data.item.disease.englishName }})
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
                                <input type="checkbox" class="custom-control-input" id="searchClinicSudiesAll"
                                       ng-model="modelHandler.checkedAll" ng-disabled="true"
                                       ng-change="modelHandler.selectAll(modelHandler.checkedAll)" />
                                <label class="custom-control-label" for="searchClinicSudiesAll">
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
                <button type="submit" class="btn-primary" @click="select()">선택하기</button>
            </div>
        </div>

    </b-modal>

</template>

<script>
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";
    import PageUnit from "../../components/PageUnit";

    export default {
        name: "ClinicSudiesSearchPopup",
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
                    {key: 'uniqueNo', label: '임상 고유번호'},
                    {key: 'program.accession', label: '연구과제 등록번호'},
                    {key: 'name', label: '연구제목'},
                    {key: 'rt', label: '연구유형'},
                    {key: 'rd', label: '연구대상 표현형/질환'},
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
            async select() {
                console.log(this.selected)
                if (this.selected.length == 0) {
                    await this.$alert(
                        '항목을 선택 하신 후 진행이 가능합니다.',
                        '선택한 항목이 없습니다. ',
                        'error'
                    )
                    return
                }


                this.$emit('onClinicSudiesSelected', this.selected)
                this.selected = [];//저장된 데이터 제거
                this.close()
            },
            async search(page = 1) {
                let url = '/isg-oreo/api/clinic-studies'
                const params = new URLSearchParams();

                //params.append('fields', row.id)
                params.append('keyword', this.params.keyword)

                params.append('ownerId', 7)
                params.append('omicsType', this.omicsType)
                params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
                params.append('pageSize', this.resultList.data.numberOfRows)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)
                this.resultList = await axios.get(url, {params: params});
                this.items = this.resultList.data.list

            },
            close() {
                this.$bvModal.hide('ClinicSudiesSearchPopup')
            }
        }
    }
</script>

<style scoped>

</style>
