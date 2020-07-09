<template>
    <div class="container" id="content">

        <!-- 요약 -->
        <ul class="summary offset-t">
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-business"></i>환경 유해성 연구
                </div>
                <div class="summary-num">{{ summary.study }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-sdcard"></i>omics data
                </div>
                <div class="summary-num">{{ summary.omics }}</div>
            </li>
            <li class="summary-item">
                <div class="summary-title">
                    <i class="xi-file"></i>omics file
                </div>
                <div class="summary-num">{{ summary.omicsFile }}</div>
            </li>
        </ul>


        <div class="filter-group" style="margin-bottom: 0px;">
            <div class="group-item">
                <h2 class="h2">연구샘플_정보"/></h2>
            </div>
            <div class="group-item">
                <span data-toggle="tooltip" data-placement="top" title="연구샘플 삭제">
                <button class="btn-outline-secondary-sm" type="button" @click="remove()">
                    <i class="xi-trash"></i>
                    <span class="sr-only">삭제</span>
                </button>
                </span>
                <span data-toggle="tooltip" data-placement="top" title="연구샘플 수정">
                <button class="btn-primary-sm" type="button" @click="onClickChangeLink()">
                    <i class="xi-pen"></i>
                    <span class="sr-only">수정</span>
                </button>
                </span>
            </div>
        </div>

        <table class="view-table">
            <caption class="sr-only">연구샘플_기본정보"/></caption>
            <tbody>
            <tr>
                <th>등록번호</th>
                <td>{{ this.model.accession }}</td>
                <th>연구샘플"/>unitno"/></th>
                <td>{{ this.model.uniqueNo }}</td>
            </tr>
            <tr>
                <th>샘플명"/></th>
                <td>{{ this.model.name }}</td>
                <th>샘플유래"/></th>
                <td>{{ this.model.origin.name }}</td>
            </tr>
            <tr>
                <th>샘플구분"/></th>
                <td>{{ this.model.type.name }}</td>
                <th>질환명"/></th>
                <td>{{ this.model.disease }}</td>
            </tr>
            <tr v-hide="this.model.origin.code != 'SORG_01'">
                <th>검체"/></th>
                <td>{{ this.model.specimen }}</td>
                <th>검체_샘플_제공자"/></th>
                <td>{{ this.model.provider }}</td>
            </tr>
            <tr v-hide="this.model.origin.code != 'SORG_01'">
                <th>검체_샘플_제공자"/></th>
                <td colspan="3">{{ this.model.collectLocal.name }} {{ this.model.collectAddress }}</td>
            </tr>
            <tr>
                <th>샘플_설명"/></th>
                <td colspan="3">{{ this.model.description }}</td>
            </tr>
            </tbody>
        </table>

        <div v-show="this.model.target != null">
            <h2 class="h2">연구대상자_정보"/></h2>
            <table class="view-table">
                <caption class="sr-only">연구대상자 기본정보</caption>
                <tbody>
                <tr>
                    <th>등록번호"/></th>
                    <td>{{ this.model.target.accession }}</td>
                    <th>연구대상자_고유번호"/></th>
                    <td>{{ this.model.target.uniqueNo }}</td>
                </tr>
                <tr>
                    <%--
                    <th scope="row">출생일</th>
                    <td>{{ this.model.target.birthday | date}}</td>
                    --%>
                    <th scope="row">나이"/></th>
                    <td>{{ (this.model.target.unknownAge) ? '나이불명' : this.model.target.age }}</td>
                    <th scope="row">성별"/></th>
                    <td>{{ this.model.target.genderName}}</td>
                </tr>
                <tr>
                    <th scope="row">연구대상자_제공_동의서</th>
                    <td colspan="3">{{ this.model.target.agreeProvide? "exits" : "none" }}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script>
    export default {
        name: "SamplesDetail",
        data() {
            return {
                summary: {
                    study: 0,
                    omics: 0,
                    omicsFile: 0
                },
                madel: {
                    accession: '',
                    collectAddress: '',
                    collectLocal: {code: '', name: ''},
                    description: '',
                    disease: '',
                    id: '',
                    name: '',
                    origin: {code: '', name: ''},
                    provider: '',
                    registDate: '',
                    registUser: {id: '', name: '', username: '', roles: []},
                    specimen: '',
                    target: {
                        accession: '',
                        age: '',
                        agreeProvide: '',
                        birthday: '',
                        gender: '',
                        genderName: '',
                        id: '',
                        uniqueNo: '',
                        unknownAge: ''
                    },
                    type: {
                        code: '', name: ''
                    },
                    uniqueNo: ''
                }
            }
        },
        methods: {
            onClickChangeLink() {

            },
            remove() {

            }

        },

    }
</script>

