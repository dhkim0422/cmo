<template>
    <div class="modal" id="projectSearchPopup"
         ng-controller="ProjectListController" ng-init="init(DISPLAY_MODE.SEARCH)">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <!-- modal-header -->
                <div class="modal-header">
                    <h5 class="modal-title">연구 과제 검색</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- modal-body -->
                <div class="modal-body">
                    <h2 class="h2">연구 과제 목록</h2>
                    <!-- list filter -->
                    <div class="filter-group">
                        <div class="group-item">
                            <total-record-count :result-list="resultList" />
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

                            <select class="length" ng-model="pageHandler.numberOfRows"
                                    ng-options="volume.value as volume.label for volume in pageHandler.volumes"
                                    ng-change="search()">
                            </select>
                            <button class="btn-primary-sm" type="button" @click="select()">
                                <i class="xi-file-add"></i>
                                <span class="sr-only">선택</span>
                            </button>

                        </div>
                    </div>

                    <table class="data-table custom-table-scrollable">
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
                            <th class="fixed-x">등록번호</th>
                            <th class="fixed-x">KEITI 고유번호</th>
                            <th>사업명</th>
                            <th>단위사업</th>
                            <th>중분야</th>
                            <th>연구과제_제목</th>
                            <th>주관기관</th>
                            <th>주관책임자</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-hide="modelHandler.size() > 0">
                            <td colspan="9">데이터가 없습니다.</td>
                        </tr>
                        <tr ng-repeat="item in modelHandler.getItems()">
                            <td class="fixed-x">
                                <div class="custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="searchPrj{{item.id}}"
                                           checklist-model="modelHandler.selectedIdList"
                                           checklist-value="item.id" ng-change="modelHandler.select(item, true)" />
                                    <label class="custom-control-label" for="searchPrj{{item.id}}">
                                        <span class="sr-only">선택</span>
                                    </label>
                                </div>
                            </td>
                            <td class="fixed-x">{{ item.accession }}</td>
                            <td class="fixed-x">{{ item.uniqueNo }}</td>
                            <td>{{ item.program }}</td>
                            <td>{{ item.unitProgram }}</td>
                            <td>{{ item.middleRealm }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.institute }}</td>
                            <td>{{ item.charger }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <!-- modal-footer -->
                <div class="modal-footer">
                    <button type="reset" class="btn-outline-secondary" data-dismiss="modal">취소하기</button>
                    <button type="submit" class="btn-primary" ng-click="select()"
                            ng-disabled="!modelHandler.hasSelectedItems()">선택하기</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import TotalRecordCount from "../../components/TotalRecordCount";
    export default {
        name: "clinicStudiesPopup",
        components: {TotalRecordCount}
    }
</script>

<style scoped>

</style>
