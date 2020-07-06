<template>
    <div class="container">

        <!-- 검색폼 -->
        <search-box :filters="filters" @searchClick="selectList"></search-box>
        <!-- 검색 목록 -->
        <div class="filter-group">
            <div class="group-item">
                <div class="info">
                    전체 <span class="num">{{this.resultList.data.total}}</span>개,
                    페이지 <span class="num">{{this.resultList.data.currentPage}}</span> /
                    <span class="num">{{this.resultList.data.numberOfRows}}</span>
                </div>
            </div>
            <div class="group-item">
                <button class="btn-outline-secondary-sm" type="button"
                        data-toggle="tooltip" data-placement="top" title="del"
                        ng-click="remove()" ng-disabled="!modelHandler.hasSelectedItems()"
                        ng-confirm-click="confirmDel">
                    <i class="xi-trash"></i><span class="sr-only">del</span>
                </button>
                <select class="length" ng-model="pageHandler.numberOfRows"
                        ng-options="volume.value as volume.label for volume in pageHandler.volumes"
                        ng-change="search()">
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
                        currentPage: 0,
                        numberOfRows: 0,
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
                }
            }
        },
        methods: {
            async selectList(params) {
                let url = '/isg-oreo/api/clinic-targets'
                this.resultList = await axios.get(url, params);
                console.log(this.resultList)
            },
            onClickDetailLink(target) {

                this.$router.push({path: '/targets/targets-detail/' + target.id})
            }
        },
    };
</script>
