<template>
    <b-modal id="sampleSavePopup" size="xl" :title="this.title" hide-footer>
        <div class="container" id="content">
            <h2 class="h2">연구샘플 기본정보</h2>
            <table class="view-table">
                <caption class="sr-only">연구샘플_기본정보</caption>
                <tbody>
                <tr v-if="model.accession != ''">
                    <th>등록번호</th>
                    <td colspan="3">
                        {{ model.accession == '' ? '등혹 후 상세내역에서 출력됩니다.' : model.accession}}
                    </td>
                </tr>
                <tr>
                    <th>연구샘플 고유번호</th>
                    <td colspan="3">
                        <b-input class="form-control"
                               type="text"
                               title="연구샘플 고유번호"
                               name="연구샘플 고유번호"
                               placeholder="작성하여주세요"
                               v-model="model.uniqueNo"
                        />
                    </td>
                </tr>
                <tr>
                    <th>샘플명</th>
                    <td>
                        <b-input class="form-control"
                               type="text"
                               title="샘플명"
                               name="샘플명"
                               placeholder="작성하여주세요"
                               v-model="model.name"
                        />
                    </td>
                    <th>샘플유래</th>
                    <td>
                        {{model.origin}}
                        <b-select class="form-control"
                                placeholder="작성하여주세요."
                                v-model="model.origin && model.origin.code"
                                aria-invalid="false" style="">
                            <option label="인체유래" value="S01">인체유래</option>
                            <option label="세포주(cell line)" value="S02" selected="selected">세포주(cell line)</option>
                        </b-select>
                    </td>

                </tr>
                <tr>
                    <th>샘플구분</th>
                    <td>
                        <select class="form-control"
                                placeholder="선택하여주세요."
                                v-model="model.type && model.type.code"
                                aria-invalid="false" style="">
                            <option value="" class="">해당없음</option>
                            <option label="Control" value="CONTROL">Control</option>
                            <option label="Patient" value="PATIENT">Patient</option>
                        </select>
                    </td>
                    <th>질환명</th>
                    <td>
                        <b-input class="form-control"
                               type="text"
                               title="질환명"
                               name="disease"
                               placeholder="작성하여주세요"
                               v-model="model.disease"
                        />
                    </td>
                </tr>

                <tr>
                    <th>샘플_설명</th>
                    <td colspan="3">
                        <b-textarea class="form-control" cols="30" rows="3"
                                  title="샘플 설명" placeholder="작성하여주세요."
                                  v-model="model.description"
                                  aria-invalid="false">
                        </b-textarea>
                    </td>
                </tr>
                </tbody>
            </table>

            model.target.id: {{model.target.id}}
            <div v-if="model.target.id != ''">
                <h2 class="h2">객체 정보

                    <button class="search-btn" @click="targetRemove">
                        <span class="sr-only">조회</span>
                        <i class="xi-search"/>
                    </button>
                </h2>
                <table class="view-table">
                    <caption class="sr-only">객체 기본정보</caption>
                    <tbody>
                    <tr>
                        <th>등록번호</th>
                        <td>{{ model.target && model.target.accession }}</td>
                        <th>객체고유번호</th>
                        <td>{{ model.target && model.target.uniqueNo }}</td>
                    </tr>
                    <tr>
                        <th scope="row">나이</th>
                        <td>{{ (model.target && model.target.unknownAge) ? '나이불명' : model.target && model.target.age }}</td>
                        <th scope="row">상별</th>
                        <td>{{ model.target && model.target.genderName}}</td>
                    </tr>
                    <!--<tr>
                        <th scope="row">객체 제공 동의서</th>
                        <td colspan="3">{{ model.target && model.target.agreeProvide? "제공" : "없음" }}</td>
                    </tr>-->
                    </tbody>
                </table>
            </div>
            <div v-if="model.target && model.target.id == ''">
                <targets-select-list :selectType="'single'" @targetSelect="targetSelect"/>
            </div>

            <!-- modal-footer -->
            <div class="modal-footer">
                <b-button class="btn-outline-secondary" variant="outline-danger" @click="close()">
                    취소하기
                </b-button>
                <b-button class="btn-primary" @click="submit">
                    저장하기
                </b-button>
            </div>

        </div>
    </b-modal>
</template>

<script>
    import axios from "../../utils/axios";
    import TargetsMerge from "../targets/TargetsMerge";
    import TargetsSelectList from "../targets/TargetsSelectList";

    export default {
        name: "samplesMerge",
        components: {TargetsSelectList, TargetsMerge},
        props: ['samplesInfo'],
        created() {
            this.title = (this.isCreateForm() ? '연구샘플 등록' : '연구샘플 수정')
        },
        watch:{
            samplesInfo(newProps){
                if(newProps == 'REG') {
                    console.log('등록')


                }else{
                    this.model = this.samplesInfo
                    console.log('수정',this.model)
                }
            }
        },
        data() {
            return {
                title: '',
                model: {
                    accession: '',
                    collectAddress: '',
                    collectLocal: '',
                    description: '',
                    disease: '',
                    id: '',
                    name: '',
                    origin: {},
                    provider: "",
                    registDate: null,
                    registUser: null,
                    specimen: '',
                    target: {id: '', accession: '',},
                    type: {name:'',code:''},
                    uniqueNo: ''
                },
                codes: {}
            }
        },
        methods: {
            isCreateForm() {//true 면 등록 false 면 수정
                return this.samplesInfo == 'REG'
            },
            async initData() {



            },
            async submit() {
                //벨리데이션 체크 여부 확인
                //const success = await this.$refs.form.validate()
                //벨리데이션 문제가 없으면 저장 실행
                //if (success) {
                let insertData = ""
                this.model['collectAddress'] = '1'
                this.model['collectLocal'] = '1'


                if (this.isCreateForm()) { //없데이트 유무를 검사하여 진행
                    insertData = await axios.post('/isg-oreo/api/clinic-samples', this.model)
                } else {
                    insertData = await axios.put('/isg-oreo/api/clinic-samples/' + this.model.id, this.model)
                }
                this.model = insertData.data //인서트 혹은 업데이트 후 등록 변경된 내역을 조회 후 내려준다.
                await this.$alert(
                    '',
                    '저장되었습니다.',
                    'info'
                );
                this.close()

                //} else {
                /*  await this.$alert(
                      '출력된 경고 처리 후 진행이 가능합니다.',
                      '입력한 내용을 확인해 주세요',
                      'error'
                  );
                  */
                //}
                //완료 이벤트 부모 컴포넌트에 이벤트로 전달
                this.$emit('saveOK', 'OK')

            },
            targetSelect(param) {
                this.model.target = param[0]
                console.log("????????", this.model.target);
            },
            targetRemove() {
                this.model.target.id = ''
            },
            close() {
                this.$bvModal.hide('sampleSavePopup')
            },

        }
    }
</script>

