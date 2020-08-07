<template>
    <b-modal id="ProjectSearchPopup" size="xl" title="연구과제 목록" hide-footer>
        <!-- 검색폼 -->

        <search-box :filters="filters" @searchClick="changeParams"></search-box>
        <!-- 검색 목록 -->

        <div class="filter-group">
            <div class="group-item">
                <div>

                    <!--<b-form-checkbox
                            v-model="allSelected"
                            :indeterminate="indeterminate"
                            @change="toggleAll"
                    >
                    <label for="chkPrjAll">
                        <span class="sr-only">전체선택</span>
                    </label>
                    </b-form-checkbox>
                    -->

                </div>
                <total-record-count :result-list="resultList"/>
            </div>
            <div class="group-item">

                <page-unit :page-unit="resultList.data.numberOfRows" @onChangePageUnit="onChangePageUnit"></page-unit>
            </div>
        </div>

        <b-form-checkbox-group id="checkbox-group" v-model="selected" name="itemId">
            <div
                    v-for="(result, index) in resultList.data.list"
                    class="data-card"
                    :key="`result-${index}`"
            >
                <div class="card-header">
                    <div class="block-group">
                        <div class="block">
                            <div style="width: 270px">

                                <b-form-checkbox :value="result" size="lg">
                                    <i class="xi-receipt"></i>
                                    {{ result.accession }}
                                </b-form-checkbox>

                            </div>
                        </div>
                        <div class="block" style="width: 800px; margin-left: 55px">
                            {{ result.program }}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="view-table">
                        <caption class="sr-only">
                            상세정보
                        </caption>
                        <tbody>
                        <tr>
                            <th scope="row">대분야</th>
                            <td>{{ result.unitProgram }}</td>
                            <th scope="row">ATIS 고유번호</th>
                            <td>{{ result.uniqueNo }}</td>
                        </tr>
                        <tr>
                            <th scope="row">과제명</th>
                            <td colspan="3">{{ result.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">중분야</th>
                            <td>{{ result.middleRealm }}</td>
                            <th scope="row">연구상태</th>
                            <td>{{ result.projectStatus == undefined ? "상태값 이상" : result.projectStatus.name }}</td>
                        </tr>
                        <tr>
                            <th scope="row">주관기관</th>
                            <td>{{ result.institute }}</td>
                            <th scope="row">주관책임자</th>
                            <td>{{ result.charger }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-show="resultList.data.list.length !== 0" class="text-center"></div>
            <div></div>

            <div
                    v-show="resultList.data.list.length === 0"
                    class="data-card"
                    aria-hidden="true"
                    style
            >
                <div class="card-body text-center">검색 결과가 없습니다</div>
            </div>

            <b-pagination v-model="resultList.data.currentPage"
                          :per-page="resultList.data.numberOfRows"
                          :total-rows="resultList.data.total"
                          size="sm"
                          align="center"
                          @change="changePageNo"
            />
        </b-form-checkbox-group>
        <!-- modal-footer -->
        <div class="modal-footer">
            <button type="reset" class="btn-outline-secondary" @click="close">취소하기</button>
            <button type="submit" class="btn-primary" @click="select()">선택하기</button>
        </div>
    </b-modal>
</template>

<script>
    import axios from "../../utils/axios";
    import ProjectRegist from "./ProjectMerge";
    import PageUnit from "../../components/PageUnit";

    export default {
        name: "ProjectList",
        components: {PageUnit, ProjectRegist},
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
        data() {
            return {
                selected: [],
                allSelected: false,
                indeterminate: false,
                isRegist: false,
                currentPageNo: 1,
                filter: {
                    keyword: "",
                },
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 10,
                        list: [],
                    },
                },
                filters: {
                    fields: [
                        {id: "", name: "전체"},
                        {id: "projectNo", name: "일련번호"},
                        {id: "projectName", name: "과제명"},
                        {id: "uniqueNo", name: "ATIS 고유번호"},
                        {id: "program", name: "사업명"},
                        {id: "unitProgram", name: "대분야"},
                        {id: "middleRealm", name: "과제중분류"},
                        {id: "status", name: "연구상태"},
                        {id: "institute", name: "주관기관"},
                        {id: "charger", name: "주관책임자"},
                        {id: "participants", name: "참여기업"},
                        {id: "purpose", name: "연구개발 목표"},
                        {id: "contents", name: "연구개발 내용"},
                        {id: "objective", name: "최종목표"},
                        {id: "conclusion", name: "연구내용"},
                        {id: "features", name: "개발기술 특징"},
                        {id: "expectation", name: "기대효과"},
                        {id: "appliedTo", name: "적용분야"},
                        {id: "keywords", name: "키워드"},
                    ],
                    params: {},
                },
            };
        },
        methods: {
            onChangePageUnit(pageUnit) {
                this.resultList.data.numberOfRows = pageUnit
                this.selectList()
            },
            toggleAll(checked) {
                this.selected = checked ? this.resultList.data.list.slice() : []
            },
            //Pagination 컴포넌트의 change emit
            changePageNo(pageNo) {
                this.currentPageNo = pageNo;
                this.selectList();
            },
            changeParams(params) {
                this.params = params;
                this.selectList();
            },
            async selectList(page = 1) {
                this.isRegist = false
                let url = "/isg-oreo/api/projects";
                const params = new URLSearchParams();
                if (this.params.keyword != '') {
                    for (const row of this.params.fields) {
                        if (row.id !== '') params.append('fields', row.id)
                    }
                    params.append('keyword', this.params.keyword)
                }
                params.append('ownerId', 7)
                params.append('firstIndex', (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows)
                params.append('rowSize', this.resultList.data.numberOfRows)
                params.append('currentPage', page)
                this.resultList = await axios.get(url, {params: params});

            },
            close() {
                this.$bvModal.hide('ProjectSearchPopup')
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
                this.$emit('onProjectSelected', this.selected)
                this.selected = [];//저장된 데이터 제거
                this.close()
            },

        },
    };
    /*
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


                    this.$emit('onProjectSelected', this.selected)
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
                    this.$bvModal.hide('ProjectSearchPopup')
                }
            }
        }
    */
</script>


