<template>
    <div class="container" id="content">
        <div class="wizard-content">
            <validation-observer ref="form">
                <form @submit.prevent="submit" name="targetForm">
                    <!-- modal-body -->
                    <div class="">
                        <h2 class="h2">
                            연구 대상자 기본정보
                        </h2>
                        <table class="view-table">
                            <caption class="sr-only">
                                연구 대상자 기본정보
                            </caption>
                            <tbody>
                            <tr>
                                <th class="form-group required control-label">
                                    <label>{{ isCreateForm() ? "연구대상자 고유정보" : "등록번호" }}</label>
                                </th>
                                <td v-show="!isCreateForm()">{{ this.model.accession }}</td>
                                <th class="form-group required control-label" v-show="!isCreateForm()">
                                    <label>
                                        연구대상자 고유번호
                                    </label>
                                </th>
                                <td :colspan="isCreateForm() ? 3 : 1 ">

                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <input class="form-control"
                                               type="text"
                                               title="연구대상자 고유번호"
                                               name="연구대상자 고유번호"
                                               placeholder="작성하여주세요"
                                               v-model="model.uniqueNo"
                                        />
                                        <span>{{ errors[0] }}</span>
                                    </validation-provider>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label">
                                    <label>
                                        나이
                                    </label>
                                </th>
                                <td>
                                    <div class="date-range">
                                        <div class="date-input-group">
                                            <validation-provider rules="required" v-slot="{ errors }">
                                                <input class="form-control"
                                                       type="text"
                                                       title="나이"
                                                       name="나이"
                                                       placeholder="작성하여주세요"
                                                       v-model="model.age"
                                                       :disabled="model.unknownAge"
                                                       maxlength="3"/>
                                                <span>{{ errors[0] }}</span>
                                            </validation-provider>

                                        </div>
                                        <div class="date-range-dash"></div>
                                        <div class="date-input-group">
                                            <div class="custom-checkbox">
                                                <input type="checkbox" id="chk-unknown-age"
                                                       class="custom-control-input"
                                                       v-model="model.unknownAge"

                                                />
                                                <label class="custom-control-label" for="chk-unknown-age">
                                                    나이불명
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <th scope="row" class="form-group required control-label"><label>
                                    성별
                                </label></th>
                                <td>
                                    <validation-provider rules="required" v-slot="{ errors }">
                                        <select class="form-control" placeholder="성별을 선택하세요" v-model="model.gender"
                                                name="성별">
                                            <option value="">선택</option>
                                            <option v-for="code in codes.GEN" :value="code.code">
                                                {{ code.name }}
                                            </option>
                                        </select>
                                        <span>{{ errors[0] }}</span>
                                    </validation-provider>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="form-group required control-label"><label>
                                    제3자 정보제공 동의서
                                </label></th>
                                <td colspan="3">
                                    <validation-provider rules="required" v-slot="{ errors }">

                                        <div class="custom-control custom-radio custom-control-inline"
                                             v-for="code in codes.offerAgreeYn">

                                            <input type="radio" :value="code.code"
                                                   name="제3자 정보제공 동의서"
                                                   v-model="model.agreeProvide"


                                            />
                                            <label>
                                                {{code.name }}
                                            </label>
                                        </div>

                                        <span>{{ errors[0] }}</span>
                                    </validation-provider>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- modal-footer -->
                    <div class="modal-footer">
                        <button type="reset" class="btn-outline-secondary" @click="cancle" >
                            취소하기
                        </button>
                        <button type="submit" class="btn-primary">
                            저장하기
                        </button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        name: "TargetsRegist",

        created() {
            this.codes = this.$store.getters.getCodes
            this.initData()





        },
        computed: {},
        data() {
            return {
                model: {
                    accession: '',
                    age: '',
                    agreeProvide: false,
                    birthday: '',
                    gender: '',
                    genderName: '',
                    id: '',
                    uniqueNo: '',
                    unknownAge: false
                },
                codes: {}

            }
        },
        methods: {
            isCreateForm() {//true 면 등록 false 면 수정
                let accession = this.model.accession
                return (typeof accession == "undefined" || accession == null || accession == "")
            },
            async initData() {
                let codeList = ['GEN']
                let dataList = {}
                for (const item of codeList) {

                    let url = '/isg-oreo/ajax/codeGroups/' + item
                    let codeData = await axios.get(url, {})

                    console.log(item, codeData.data.data.resultList)
                    this.codes[item] = codeData.data.data.resultList
                    console.log(' ' + item, this.codes)
                }

                let paramId = this.$route.params.id
                if(!(typeof paramId == "undefined" || paramId == null || paramId == "")){
                    let targetsData = await axios.get('/isg-oreo/api/clinic-targets/' + paramId, {});
                    this.model = targetsData.data
                }

            },
            async submit() {
                //벨리데이션 체크 여부 확인
                const success = await this.$refs.form.validate()
                //벨리데이션 문제가 없으면 저장 실행
                if (success) {
                    let insertData = ""
                    if(this.isCreateForm()){
                        console.log('C')
                        insertData = await axios.post('/isg-oreo/api/clinic-targets', this.model)
                    }else{
                        console.log('U')
                        insertData = await axios.put('/isg-oreo/api/clinic-targets/'+this.model.id, this.model)
                    }

                    console.log('insertData', insertData)
                    this.model = insertData.data
                    await this.$alert(
                        '',
                        '저장되었습니다.',
                        'info'
                    );
                    this.$router.go(-1)

                } else {
                    this.$alert(
                        '출력된 경고 처리 후 진행이 가능합니다.',
                        '입력한 내용을 확인해 주세요',
                        'error'
                    );
                }
            },
            cancle(){
                this.$router.go(-1)
            }
        }
    }

</script>

