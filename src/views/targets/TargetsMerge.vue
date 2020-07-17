<template>
    <b-modal id="registPopup" size="xl" title="연구대상자">
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


                                            <b-form-radio v-model="model.agreeProvide" name="제3자 정보제공 동의서"
                                                          value="code.code">{{code.name}} >
                                            </b-form-radio>

                                            <span>{{ errors[0] }}</span>
                                        </validation-provider>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- modal-footer -->
                        <div class="modal-footer">
                            <b-button class="btn-outline-secondary" variant="outline-danger" @click="close()">
                                취소하기
                            </b-button>
                            <b-button type="submit" class="btn-primary">
                                저장하기
                            </b-button>
                        </div>
                    </form>
                </validation-observer>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        name: "TargetsMerge",
        props: ['targetInfo'],
        created() {
            this.codes = this.$store.getters.getCodes
            this.target = this.targetInfo
            this.initData()
        },
        computed: {},
        data() {
            return {
                target: {},
                model: {},
                codes: {}

            }
        },
        methods: {
            isCreateForm() {//true 면 등록 false 면 수정
                let val = this.target.id
                return (typeof val == "undefined" || val == null || val == "")
            },
            async initData() {
                let codeList = ['GEN']
                let dataList = {}
                for (const item of codeList) {

                    let url = '/isg-oreo/ajax/codeGroups/' + item
                    let codeData = await axios.get(url, {})
                    this.codes[item] = codeData.data.data.resultList
                }


                if (this.isCreateForm()) {
                    let targetsData = await axios.get('/isg-oreo/api/clinic-targets/' + this.targetInfo.id, {});
                    this.model = targetsData.data
                }

            },
            async submit() {
                //벨리데이션 체크 여부 확인
                const success = await this.$refs.form.validate()
                //벨리데이션 문제가 없으면 저장 실행
                if (success) {
                    let insertData = ""
                    if (this.isCreateForm()) { //없데이트 유무를 검사하여 진행
                        insertData = await axios.post('/isg-oreo/api/clinic-targets', this.model)
                    } else {
                        insertData = await axios.put('/isg-oreo/api/clinic-targets/' + this.model.id, this.model)
                    }
                    this.model = insertData.data //인서트 혹은 업데이트 후 등록 변경된 내역을 조회 후 내려준다.
                    await this.$alert(
                        '',
                        '저장되었습니다.',
                        'info'
                    );

                } else {
                    await this.$alert(
                        '출력된 경고 처리 후 진행이 가능합니다.',
                        '입력한 내용을 확인해 주세요',
                        'error'
                    );

                }
                this.$emit('insertOK', 'OK')
                this.close()
            },
            close() {
                this.$bvModal.hide('registPopup')
            }
        }
    }

</script>

