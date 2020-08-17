<template>
  <b-modal id="SpeciesMerge" size="xl" :title="'종 ' + title()" hide-footer>
    <div class="modal-xl" role="document">
      <div class="modal-body">
        <h2 class="h2">
          종 기본정보
        </h2>
        <table class="view-table">
          <caption class="sr-only">기본정보</caption>
          <tbody>
          <tr v-if="!isCreated">
            <th>등록번호</th>
            <td colspan="3">
              {{ !isCreated() ? '등혹 후 상세내역에서 출력됩니다.' : model.id }}
            </td>
          </tr>
          <tr>
            <th>학명</th>
            <td colspan="3">
              <b-input class="form-control"
                       type="text"
                       title="학명"
                       name="학명"
                       placeholder="작성하여주세요"
                       v-model="model.scientificNm"
              />
            </td>
          </tr>
          <tr>
            <th>종명(국문)</th>
            <td>
              <b-input class="form-control"
                       type="text"
                       title="종명(국문)"
                       name="종명(국문)"
                       placeholder="작성하여주세요"
                       v-model="model.speciesNmKr"
              />
            </td>
          </tr>
          <tr>
            <th>종명(영문)</th>
            <td>
              <b-input class="form-control"
                       type="text"
                       title="종명(영문)"
                       name="종명(영문)"
                       placeholder="작성하여주세요"
                       v-model="model.speciesNmEn"
              />
            </td>

          </tr>
          <tr>
            <th>품종명(국문)</th>
            <td>
              <b-input class="form-control"
                       type="text"
                       title="품종명(국문)"
                       name="품종명(국문)"
                       placeholder="작성하여주세요"
                       v-model="model.kindNmKr"
              />
            </td>
          </tr>
          <tr>
            <th>품종명(영문)</th>
            <td>
              <b-input class="form-control"
                       type="text"
                       title="품종명(영문)"
                       name="품종명(영문)"
                       placeholder="작성하여주세요"
                       v-model="model.kindNmEn"
              />
            </td>
          </tr>

          </tbody>
        </table>
        <div class="modal-footer">
          <b-button class="btn-outline-secondary" variant="outline-danger" @click="close()">
            취소하기
          </b-button>
          <b-button class="btn-primary" @click="submit">
            저장하기
          </b-button>
        </div>
      </div>
      {{ model }}
    </div>
  </b-modal>

</template>

<script>
export default {
  name: "GenogramMerge",
  props: ['species'],
  created() {
    this.reset = this.model
    if (this.$route.params.id != undefined) {
      this.model.id = this.$route.params.id
      this.initData()
    }

  },
  data() {
    return {
      reset: {},
      model: {
        scientificNm: '',
        speciesNmKr: '',
        kindNmKr: '',
        speciesNmEn: '',
        kindNmEn: '',
        id: '',
        inputInfo: '',
      }
    }
  },
  methods: {
    initData() {
      let url = '/isg-oreo/api/species/' + this.model.id
      this.$axios.get(url, '').then((respoese) => {
        this.model = respoese.data
      })
    },
    resetData() {
      this.model = this.reset
    },
    isCreated() {
      return this.model.id == ''
    },
    title() {
      return this.isCreated ? '등록' : '수정'

    },
    submit() {
      console.log("11111?",this.model.id)
      if (this.model.id == '') {
        this.$axios.post('/isg-oreo/api/species', this.model).then(() => {
          this.$emit('saveOK', 'OK')
          this.$alert('', '저장 되었습니다.', 'info')
        })
      } else {

        this.$axios.put('/isg-oreo/api/species/' + this.model.id, this.model).then(() => {
          this.$emit('saveOK', 'OK')
          this.$alert('', '수정 되었습니다.', 'info')
        })

      }
      this.close()
    },
    close() {
      this.$bvModal.hide('SpeciesMerge')
    }
  }
}
</script>

