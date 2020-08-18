<template>


  <b-modal id="projectPopup" size="xl" :title="title()" hide-footer>
    <div>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form @submit.prevent="submit()" name="prjForm">
          <!-- modal-header -->


          <!-- modal-body -->
          <div class="modal-body">
            <h2 class="h2">
              기본정보
            </h2>
            <table class="view-table">
              <caption class="sr-only">
                기본정보
              </caption>
              <tbody>
              <tr v-if="!isCreateForm">
                <th class="form-group required control-label">
                  <label>
                    {{ !isCreateForm ? "ATIS 고유번호" : "등록번호" }}
                  </label>
                </th>
                <td colspan="3">{{ model.accession }}</td>
              </tr>
              <tr>
                <th class="form-group required control-label"><label>
                  ATIS 고유번호
                </label></th>
                <td colspan="3">
                  <validation-provider
                      name="ATIS 고유번호"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.uniqueNo"
                        placeholder="작성하여주세요"
                        :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <th scope="row" class="form-group required control-label">
                  <label>
                    사업명
                  </label>
                </th>
                <td colspan="3">
                  <validation-provider
                      name="사업명"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.program"
                        placeholder="작성하여주세요"
                        :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </td>
              </tr>
              <tr>
                <th scope="row" class="form-group required control-label"><label>
                  대분야
                </label></th>
                <td>
                  <validation-provider
                      name="대분야"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-select v-model="model.unitProgram" :options="projectType"
                                   :state="getValidationState(validationContext)"/>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>


                  <!--<input class="form-control" type="text" title="대분야"
                         name="unitProgram"
                         placeholder="작성하여주세요"
                         v-model="model.unitProgram"
                  />-->
                </td>

                <th scope="row" class="form-group required control-label"><label>
                  중분야
                </label></th>
                <td>
                  <validation-provider
                      name="중분야"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-select v-model="model.middleRealm" :options="subProjectType"
                                   :state="getValidationState(validationContext)"/>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </td>
                <!--<th scope="row" class="form-group required control-label">
                  <label>
                    연구상태
                  </label>
                </th>
                <td>

                  <select class="form-control" v-model="model.status" name="status">
                    <option label="성공" value="SUCCESS" selected="selected">성공</option>
                    <option label="중단" value="STOP">중단</option>
                    <option label="실패" value="FAIL">실패</option>
                    <option label="최종연구종료" value="END">최종연구종료</option>
                  </select>


                </td>-->
              </tr>
              <tr>
                <th scope="row" class="form-group required control-label"><label>
                  과제명
                </label></th>
                <td colspan="3">
                  <validation-provider
                      name="과제명"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.name"
                        placeholder="작성하여주세요"
                        :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </td>
              </tr>
              <tr>
                <th scope="row" class="form-group required control-label"><label>
                  주관기관
                </label></th>
                <td>
                  <validation-provider
                      name="주관기관"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.institute"
                        placeholder="작성하여주세요"
                        :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>
                      {{
                        validationContext.errors[0]
                      }}
                    </b-form-invalid-feedback>
                  </validation-provider>

                </td>
                <th scope="row">
                  주관책임자
                </th>
                <td>
                  <input class="form-control" type="text" title="키워드주관책임자"
                         name="charger"
                         placeholder="작성하여주세요"
                         v-model="model.charger"/>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  참여기업
                </th>
                <td>
                  <input class="form-control" type="text" title="키워드참여기업"
                         name="participants"
                         placeholder="작성하여주세요" v-model="model.participants" maxlength="255"/>
                </td>
                <th scope="row"><label>
                  총 연구기간
                </label></th>
                <td>
                  <div layout="row" style="height:55px">
                    <b-form-datepicker v-model="model.begin" id="datepicker-begin" size="sm" local="ko"
                                       class="mb-2"></b-form-datepicker>
                    <b-form-datepicker v-model="model.end" id="datepicker-end" size="sm" local="ko"
                                       class="mb-2"></b-form-datepicker>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  연구개발 목표
                </th>
                <td colspan="3">
                                <textarea class="form-control" cols="30" rows="5" title="연구개발_목표"
                                          name="purpose"
                                          placeholder="작성하여주세요" v-model="model.purpose">

                                </textarea>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  연구개발 내용
                </th>
                <td colspan="3">
                                <textarea class="form-control" cols="30" rows="5" title="연구개발 내용"
                                          name="contents"
                                          placeholder="작성하여주세요" v-model="model.contents">

                                </textarea>
                </td>
              </tr>
              </tbody>
            </table>
            <!--                    <h2 class="h2">
                                    연구개발 결과
                                </h2>
                                <table class="view-table">
                                    <caption class="sr-only">
                                        연구개발 결과
                                    </caption>
                                    <tbody>
                                    <tr>
                                        <th scope="row">
                                            개발내용_및_결과
                                        </th>
                                        <td>
                                            <textarea class="form-control" cols="30" rows="5" title="개발내용_및_결과"
                                                      name="conclusion"
                                                      placeholder="작성하여주세요"
                                                      v-model="model.conclusion">
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            키워드
                                        </th>
                                        <td>
                                            <input class="form-control" type="text" title="키워드"
                                                   name="keywords"
                                                   placeholder="작성하여주세요" v-model="model.keywords" maxlength="512"/>


                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            개발기술의 특징,장점
                                        </th>
                                        <td>
                                            <textarea class="form-control" cols="30" rows="5" title="개발기술의_특징,_장점"
                                                      name="features"
                                                      placeholder="작성하여주세요" v-model="model.features"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            기대효과
                                        </th>
                                        <td>
                                            <textarea class="form-control" cols="30" rows="5" title="기대효과"
                                                      placeholder="작성하여주세요"
                                                      name="expectation"
                                                      v-model="model.expectation"></textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            적용분야
                                        </th>
                                        <td>
                                            <textarea class="form-control" cols="30" rows="5" title="적용분야"
                                                      name="appliedTo"
                                                      placeholder="작성하여주세요" v-model="model.appliedTo"></textarea>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>-->
          </div>

          <!-- modal-footer -->
          <div class="modal-footer">
            <button type="reset" class="btn-outline-secondary" @click="close">
              취소하기
            </button>
            <button type="submit" class="btn-primary">
              저장하기
            </button>
          </div>

        </form>
      </validation-observer>
    </div>
  </b-modal>

</template>

<script>

import axios from "../../utils/axios";

export default {
  name: "ProjectMerge",
  props: ['projectInfo'],

  data() {
    return {
      subProjectType: [],
      projectType: [],
      model: {middleRealm: ''}
    }
  },
  created() {
    this.projectType = this.getProjectType()

  },
  watch: {
    'model.unitProgram': function (val, oldVal) {
      console.log('change projectType : ', val + '  /   ' + this.model.middleRealm)
      this.subProjectType = this.getProjectType(val)

    },
    projectInfo(newProps) {
      this.initData()
    }
  },
  methods: {
    isCreateForm() {
      return this.projectInfo === undefined ? true : false
    },
    async initData() {
      let id = this.projectInfo.id;
      let modelData = await axios.get(
          "/isg-oreo/api/projects/" + id,
          {}
      );
      console.log("?????????/**/")
      this.subProjectType = this.getProjectType(this.model.unitProgram)
      this.model = modelData.data;
      this.model.begin = this.setDateFormat(this.model.begin)
      this.model.end = this.setDateFormat(this.model.end)

    },
    title() {
      return this.isCreateForm() ? '과제 등록' : '과제 수정'
    },
    async submit() {
      //벨리데이션 체크 여부 확인
      //const success = await this.$refs.form.validate()
      //벨리데이션 문제가 없으면 저장 실행
      //if (success) {
      let insertData = ""
      if (this.isCreateForm()) { //없데이트 유무를 검사하여 진행
        insertData = await axios.post('/isg-oreo/api/projects', this.model)
      } else {
        insertData = await axios.put('/isg-oreo/api/projects/' + this.model.id, this.model)
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
    close() {
      this.$bvModal.hide("projectPopup")
      this.$emit('saveOK', 'OK')
    },
    setDateFormat(val) {
      if (undefined === val) return
      var date = new Date(val);  //입력 파라메터로 Date 객체를 생성합니다
      var yyyy = date.getFullYear().toString(); // '연도'를 뽑아내고
      var mm = (date.getMonth() + 1).toString(); // '월'을 뽑아내고
      var dd = date.getDate().toString(); // '일'을 뽑아냅니다

      var Str = '';


      Str += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0]);

      return Str;

    },
    getProjectType(type = '') {

      let arr = []
      this.$store.state.project_type.map((value, index) => {
        console.log('type', value.upper_value + '//' + (value.upper_value == type))
        if (value.upper_value == type) {

          arr.push(value)
        }
      })
      return arr
    },
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
  },
}

</script>

