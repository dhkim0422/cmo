<template>
  <b-modal id="registPopup" size="xl" :title="this.title" hide-footer>
    <div class="container" id="content">
      <div class="wizard-content">
        <validation-observer ref="form">

          <!-- modal-body -->
          <div class="">
            <h2 class="h2">
              객체 기본정보
            </h2>
            <table class="view-table">
              <caption class="sr-only">
                객체 기본정보
              </caption>
              <tbody>
              <tr v-if="!isCreateForm()">
                <th class="form-group required control-label">
                  <label>등록번호</label>
                </th>
                <td>{{ model.accession }}</td>
              </tr>
              <tr>
                <th class="form-group required control-label">
                  <label>
                    객체 고유번호
                  </label>
                </th>
                <td>
                  <validation-provider
                      name="구분"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                  >
                    <b-form-input class="form-control"
                                  placeholder="작성하여주세요"
                                  v-model="model.uniqueNo"
                                  :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
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
                      <validation-provider
                          name="나이"
                          :rules="{ required: true }"
                          v-slot="validationContext"
                      >
                        <b-form-input class="form-control"
                                      placeholder="작성하여주세요"
                                      v-model="model.age"
                                      :disabled="model.unknownAge"
                                      :state="getValidationState(validationContext)"
                        />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>

                    </div>
                    <div class="date-range-dash"></div>
                    <div class="date-input-group">
                      <div class="custom-checkbox">
                        <b-form-checkbox class="form-control"
                                         placeholder="작성하여주세요"
                                         v-model="model.unknownAge"
                        >
                          나이불명
                        </b-form-checkbox>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" class="form-group required control-label">
                  <label>
                    성별
                  </label>
                </th>
                <td>
                  <validation-provider
                      name="성별"
                      :rules="{ required: true }"
                      v-slot="validationContext"
                  >
                    <b-form-select class="form-control"
                                   v-model="model.gender"
                                   :state="getValidationState(validationContext)"
                    >
                      <option value="">선택</option>
                      <option v-for="code in codes.GEN" :value="code.code">
                        {{ code.name }}
                      </option>
                    </b-form-select>
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                  <validation-provider rules="required" v-slot="{ errors }">

                    <span>{{ errors[0] }}</span>
                  </validation-provider>
                </td>
              </tr>
              <tr v-if="model.species.id != ''">
                <th scope="row" class="form-group required control-label">
                  <label>
                    축종
                    <b-button @click="removeSpecies">
                      <i class="xi-search"></i>
                    </b-button>

                  </label>
                </th>
                <td>
                  (국문) {{ model.species.speciesNmKr }} > {{ model.species.kindNmKr }} <br>
                  (영문) {{ model.species.speciesNmEn }} > {{ model.species.kindNmEn }}

                </td>
              </tr>
              <tr v-if="model.species.id == ''">
                <th colspan="3">
                  축종 선택
                </th>
              </tr>
              <tr v-if="model.species.id == ''">
                <td colspan="3">
                  <species-inner-list @speciesSelected="speciesSelected"/>
                </td>
              </tr>
              <!--<tr>
                  <th scope="row" class="form-group required control-label">
                      <label>
                          제3자 정보제공 동의서
                      </label>
                  </th>
                  <td>
                      <validation-provider rules="required" v-slot="{ errors }">
                          <div>
                              <input type="radio" v-model="model.agreeProvide" name="제3자 정보제공 동의서"
                                     :value="true"/>
                              <label>있음</label>
                              <input type="radio" v-model="model.agreeProvide" name="제3자 정보제공 동의서"
                                     :value="false"/>
                              <label>없음</label>
                          </div>
                          <span>{{ errors[0] }}</span>
                      </validation-provider>
                  </td>
              </tr>-->
              </tbody>
            </table>
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

        </validation-observer>
      </div>
    </div>
  </b-modal>
</template>

<script>
import axios from "../../utils/axios";
import SpeciesInnerList from "@/views/species/SpeciesInnerList";

export default {
  name: "TargetsMerge",
  components: {SpeciesInnerList},
  props: ['targetInfo'],
  async created() {

    this.codes = this.$store.getters.getCodes
    this.title = (this.isCreateForm() ? '객체 등록' : '객체 수정')
    this.initCode()
  },
  watch: {
    async targetInfo(newProps) {
      console.log("새로운 데이터 확인 ", newProps)
      this.initData()
    }
  },
  data() {
    return {
      title: '',
      model: {
        accession: '',
        age: '',
        agreeProvide: true,
        birthday: '',
        gender: '',
        genderName: '',
        id: '',
        registDate: 0,
        registUser: {},
        uniqueNo: '',
        unknownAge: false,
        species:
            {
              scientificNm: '',
              speciesNmKr: '',
              kindNmKr: '',
              speciesNmEn: '',
              kindNmEn: '',
              id: '',
              inputInfo: ''
            }

      },
      codes: {GEN: {}}
    }
  },
  methods: {
    isCreateForm() {//true 면 등록 false 면 수정
      return this.targetInfo === undefined
    },
    removeSpecies() {
      this.model.species = {id: ''}
    },
    async initCode() {
      //공통코드 로드

      let url = '/isg-oreo/ajax/codeGroups/GEN'

      let codeData = await axios.get(url, {})

      this.codes['GEN'] = codeData.data.data.resultList

    },
    async initData() {
      let targetsData = await axios.get('/isg-oreo/api/clinic-targets/' + this.targetInfo.id, {});
      this.model = targetsData.data
    },
    async submit() {
      //벨리데이션 체크 여부 확인
      //const success = await this.$refs.form.validate()
      //벨리데이션 문제가 없으면 저장 실행
      //if (success) {
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
      this.$bvModal.hide('registPopup')
    },
    speciesSelected(item) {
      this.model.species = item
    },
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
  }
}

</script>

