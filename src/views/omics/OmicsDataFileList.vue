<template>
    <div>
        <div class="filter-group">
            <div class="group-item">
                <total-record-count :result-list="resultList"/>
            </div>
            <div class="group-item">

                <div class="search-input-group">
                    <input class="search-input" type="text" placeholder="검색어"
                           v-model="keywokd" @keydown.enter="search()"/>
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
                        @change="select(1)"
                        v-model="resultList.data.numberOfRows"
                        class="length"
                        aria-invalid="false"
                >
                    <option label="10개씩 보기" value="10">10개씩 보기</option>
                    <option label="25개씩 보기" value="25">25개씩 보기</option>
                    <option label="50개씩 보기" value="50">50개씩 보기</option>
                    <option label="100개씩 보기" value="100">100개씩 보기</option>
                </select>

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
            <tr v-show="resultList.data.list.length == 0">
                <td colspan="8" class="text-center">
                    데이터가 없습니다.
                </td>
            </tr>

            <tr v-for="item in resultList.data.list">
                <td>{{ item.accession }}</td>
                <td>{{ item.sample.accession || "" }}</td>
                <td>{{ item | groupNm }}</td>
                <td>{{ item.type }}</td>
                <td class="text-ellipsis-200"><a class="link-more" @click="download(item)">{{ item.name }}</a></td>
                <td>{{ item.size | byte }}</td>
            </tr>
            </tbody>
        </table>
        <b-pagination v-model="resultList.data.currentPage" :per-page="resultList.data.numberOfRows"
                      :total-rows="resultList.data.total" size="sm" align="center"
                      @change="changePageNo"
        />


    </div>
</template>

<script>
    import TotalRecordCount from "../../components/TotalRecordCount";
    import axios from "../../utils/axios";

    export default {
        name: "OmicsDataFileList",
        components: {TotalRecordCount},
        created() {
            this.search(1)
        },
        data() {
            return {
                resultList: {
                    data: {
                        total: 0,
                        currentPage: 1,
                        numberOfRows: 100,
                        list: [],
                    }
                },
                keywokd: ''

            }
        },
        props: ['id'],
        methods: {
            changePageNo(pageNo) {
                this.resultList.data.currentPage = pageNo
                this.search(pageNo);
            },
            download() {

            },
            async search(pageNo = 0) {

                let param = {
                    currentPage: pageNo,
                    firstIndex: (this.resultList.data.currentPage - 1) * this.resultList.data.numberOfRows,
                    omicsId: this.id,
                    pageSize: 10,
                    rowSize: this.resultList.data.numberOfRows
                }
                param['fields'] = ['fileNo', 'fileName', 'sampleNo', 'sampleName']
                param['proTypes'] = ['BED', 'Others', 'VCF', 'BAM', 'fasta', 'fastq']
                param['keywokd'] = this.keywokd

                console.log('param', param)
                let resultListData = await axios.get('/isg-oreo/api/omics/' + this.id + '/files',
                    {params: param}
                )

                let list = []
                //sample.accession 정보가 없으면 에러가 난다
                //가지고 오는 데이터에서 sample 정보가 없으면 내역을 임시값으로 셋팅하도록 처리
                for (var i = 0; i < resultListData.data.list.length; i++) {
                    list.push(resultListData.data.list[i])
                    if (resultListData.data.list[i].sample == undefined) {
                        list[i]['sample'] = {accession: ''}
                    }
                }
                this.resultList = resultListData
                this.resultList.data.list = list

            },
            cancel() {

            },
            submit() {

            },
            toggle() {

            },
            select() {
                this.search(1)
            }
        }
    }
</script>


