<template>
    <div class="modal fade" id="project-form-popup" tabindex="-1"
         role="dialog" ng-controller="ProjectFormController">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">

                <form ng-submit="submit()" name="prjForm">
                    <!-- modal-header -->
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title() }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- modal-body -->
                    <div class="modal-body">
                        <h2 class="h2">기본정보</h2>
                        <table class="view-table">
                            <caption class="sr-only">기본정보</caption>
                            <tbody>
                            <tr>
                                <th class="form-group required control-label"><label>{{ isCreateForm()? "KEITI 고유번호" :
                                    "등록번호" }}</label></th>
                                <td ng-hide="isCreateForm()">{{ model.accession }}</td>
                                <th ng-hide="isCreateForm()" class="form-group required control-label"><label>KEITI
                                    고유번호</label></th>
                                <td colspan="{{ isCreateForm()? 3 : 1 }}">
                                    <input class="form-control" type="text" title="KEITI 고유번호" name="uniqueNo"
                                           placeholder="write"
                                           ng-model="model.uniqueNo" ng-required="true" ng-maxlength="45"
                                           ng-minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.uniqueNo)">
                                        <div ng-show="prjForm.uniqueNo.$error.minlength">short3</div>
                                        <div ng-show="prjForm.uniqueNo.$error.maxlength">long45</div>
                                        <div ng-show="prjForm.uniqueNo.$error.required">required</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>사업명</label></th>
                                <td colspan="3">
                                    <input class="form-control" type="text" title="사업명" placeholder="write"
                                           name="program"
                                           ng-model="model.program" ng-required="true" maxlength="255" minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.program)">
                                        <div ng-show="prjForm.program.$error.minlength">short3</div>
                                        <div ng-show="prjForm.program.$error.maxlength">long255</div>
                                        <div ng-show="prjForm.program.$error.required">required</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>단위사업</label></th>
                                <td colspan="3">
                                    <input class="form-control" type="text" title="단위사업" name="unitProgram"
                                           placeholder="write" ng-model="model.unitProgram" ng-required="true"
                                           ng-maxlength="255" ng-minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.unitProgram)">
                                        <div ng-show="prjForm.unitProgram.$error.minlength">short3</div>
                                        <div ng-show="prjForm.unitProgram.$error.maxlength">long255</div>
                                        <div ng-show="prjForm.unitProgram.$error.required">required</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>중분야</label></th>
                                <td>
                                    <input class="form-control" type="text" title="중분야" name="middleRealm"
                                           placeholder="write" ng-model="model.middleRealm" ng-maxlength="255"
                                           ng-required="true" ng-minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.middleRealm)">
                                        <div ng-show="prjForm.middleRealm.$error.minlength">short3</div>
                                        <div ng-show="prjForm.middleRealm.$error.maxlength">long255</div>
                                        <div ng-show="prjForm.middleRealm.$error.required">required</div>
                                    </div>
                                </td>
                                <th scope="row" class="form-group required control-label"><label>연구상태</label></th>
                                <td>
                                    <select class="form-control" ng-model="model.status" name="status"
                                            ng-options="code.code as code.name for code in codes.projectStatus"
                                            ng-required="true"></select>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.status)">
                                        <div ng-show="prjForm.status.$error.required">required</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>과제명</label></th>
                                <td colspan="3">
                                    <input class="form-control" type="text" title="과제명" name="name" placeholder="write"
                                           ng-model="model.name" ng-required="true" ng-maxlength="255"
                                           ng-minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.name)">
                                        <div ng-show="prjForm.name.$error.minlength">short3</div>
                                        <div ng-show="prjForm.name.$error.maxlength">long255</div>
                                        <div ng-show="prjForm.name.$error.required">required</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>주관기관</label></th>
                                <td>
                                    <input class="form-control" type="text" title="주관기관" name="institute"
                                           placeholder="write"
                                           ng-model="model.institute" ng-required="true" ng-maxlength="255"
                                           ng-minlength="3"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.institute)">
                                        <div ng-show="prjForm.institute.$error.minlength">short2</div>
                                        <div ng-show="prjForm.institute.$error.maxlength">long255</div>
                                        <div ng-show="prjForm.institute.$error.required">required</div>
                                    </div>
                                </td>
                                <th scope="row">주관책임자</th>
                                <td>
                                    <input class="form-control" type="text" title="주관책임자" placeholder="write"
                                           ng-model="model.charger" ng-maxlength="45" ng-minlegnth="3"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">참여기업</th>
                                <td>
                                    <input class="form-control" type="text" title="참여기업"
                                           placeholder="write" ng-model="model.participants" maxlength="255"/>
                                </td>
                                <th scope="row"><label>총_연구기간</label></th>
                                <td>
                                    <div layout="row" style="height:55px">
                                        <mdp-date-picker ng-model="model.begin"></mdp-date-picker>
                                        <mdp-date-picker ng-model="model.end"></mdp-date-picker>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">연구개발_목표</th>
                                <td colspan="3">
                                    <textarea class="form-control" cols="30" rows="5" title="연구개발_목표" name="purpose"
                                              placeholder="write" ng-model="model.purpose"
                                              ng-maxlength="2000"></textarea>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.purpose)">
                                        <div ng-show="prjForm.purpose.$error.maxlength">long2000</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">연구개발_내용</th>
                                <td colspan="3">
                                    <textarea class="form-control" cols="30" rows="5" title="연구개발_내용" name="contents"
                                              placeholder="write" ng-model="model.contents"></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <h2 class="h2">연구개발_결과</h2>
                        <table class="view-table">
                            <caption class="sr-only">연구개발_결과</caption>
                            <tbody>
                            <tr>
                                <th scope="row">개발내용_및_결과</th>
                                <td>
                                    <textarea class="form-control" cols="30" rows="5" title="개발내용_및_결과"
                                              placeholder="write" ng-model="model.conclusion"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">키워드</th>
                                <td>
                                    <input class="form-control" type="text" title="키워드" name="keywords"
                                           placeholder="write" ng-model="model.keywords" maxlength="512"/>

                                    <div class="alert alert-warning" ng-if="showMessage(prjForm.keywords)">
                                        <div ng-show="prjForm.keywords.$error.maxlength">long512</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">개발기술의_특징,_장점</th>
                                <td>
                                    <textarea class="form-control" cols="30" rows="5" title="개발기술의_특징,_장점"
                                              placeholder="write" ng-model="model.features"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">기대효과</th>
                                <td>
                                    <textarea class="form-control" cols="30" rows="5" title="기대효과"
                                              placeholder="write" ng-model="model.expectation"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">적용분야</th>
                                <td>
                                    <textarea class="form-control" cols="30" rows="5" title="적용분야"
                                              placeholder="write" ng-model="model.appliedTo"></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- modal-footer -->
                    <div class="modal-footer">
                        <button type="reset" class="btn-outline-secondary" data-dismiss="modal">docancle</button>
                        <button type="submit" class="btn-primary" >dosave</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectRegist"
    }
</script>

<style scoped>

</style>
