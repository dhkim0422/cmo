<template>
  <b-modal id="UserRegiset" size="xl" :title="'회원가입'" hide-footer>
    <div class="container" id="content">

      <!-- modal-body -->
      <div class="modal-body">
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <form name="joinForm" @submit.prevent="createUser">
            <h2 class="h2">사용자 정보</h2>
            <table class="view-table">
              <caption class="sr-only">신청자 정보</caption>
              <tbody>
              <tr>
                <th scope="row" class="form-group required control-label"><label>아이디</label></th>
                <td>
                  <validation-provider
                      name="사용자명"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.username"
                        placeholder="5~20문자 이내의 영문자, 숫자만 허용"
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
                <th scope="row" class="form-group required control-label"><label>비밀번호</label></th>
                <td>
                  <validation-provider
                      name="비밀번호"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.password"
                        placeholder="문자, 숫자, 특수문자 조합으로 최소 6자리에서 최대 20자로 지정"
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
                <th scope="row" class="form-group required control-label"><label>비밀번호 확인</label></th>
                <td>
                  <validation-provider
                      name="비밀번호 확인"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.pwConfirm"
                        placeholder="확인을 위해 이전과 동일한 비밀번호를 입력하세요"
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
                <th scope="row" class="form-group required control-label"><label>이름</label></th>
                <td>
                  <validation-provider
                      name="이름"
                      :rules="{ required: true }"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.userNm"
                        placeholder="ex)홍길동"
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
                <th scope="row" class="form-group required control-label"><label>이메일</label></th>
                <td>
                  <validation-provider
                      name="이메일"
                      :rules="{ required: true ,email:true}"
                      v-slot="validationContext"

                  >
                    <b-form-input
                        v-model="model.email"
                        placeholder="email"
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
              </tbody>
            </table>
            <!-- 아래 버튼 -->
            <div class="modal-footer">
              <input class="btn-outline-secondary" type="button" value="닫기" @click="close">
              <input class="btn-primary" type="submit" value="저장하기">
            </div>
          </form>
        </validation-observer>
      </div>

    </div>
  </b-modal>
</template>

<script>
export default {
  name: "UserRegiset",
  data() {
    return {
      model: {
        password: '',
        pwConfirm: '',
        userNm: '',
        email: '',
        username: ''
      }
    }
  },
  methods: {
    createUser() {
      this.$axios.post('/isg-oreo/public/api/users', this.model).catch((response) => {
        this.$alert('아이디가 중복되었습니다.', '문제가 발생했습니다.', 'warning')
      }).then(() => {
        this.$alert('', '등록되었습니다.', 'info')
        this.close()
      })

    },
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
    close() {
      this.model = {
        password: '',
        pwConfirm: '',
        userNm: '',
        email: '',
        username: ''
      }
      this.$bvModal.hide('UserRegiset')
    }
  }
}
</script>
