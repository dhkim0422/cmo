<template>
  <b-modal id="UserRegiset" size="xl" :title="'회원가입'" hide-footer>
    <div class="container" id="content">

      <!-- modal-body -->
      <div class="modal-body">
        <form name="joinForm" @submit.prevent="createUser">
          <h2 class="h2">사용자 정보</h2>
          <table class="view-table">
            <caption class="sr-only">신청자 정보</caption>
            <tbody>
            <tr>
              <th scope="row" class="form-group required control-label"><label>아이디</label></th>
              <td>
                <input type="text" v-model="model.username" name="username"
                       class="form-control"
                       placeholder="5~20문자 이내의 영문자, 숫자만 허용"
                       required="required" aria-invalid="true">
                <!-- ngIf: showMessage(joinForm.username) -->
              </td>
            </tr>
            <tr>
              <th scope="row" class="form-group required control-label"><label>비밀번호</label></th>
              <td>
                <input type="password" name="password" v-model="model.password"
                       class="form-control"
                       placeholder="문자, 숫자, 특수문자 조합으로 최소 6자리에서 최대 20자로 지정"
                       required="required" aria-invalid="true">
                <!-- ngIf: showMessage(joinForm.password) -->
              </td>
            </tr>
            <tr>
              <th scope="row" class="form-group required control-label"><label>비밀번호 확인</label></th>
              <td>
                <input type="password" name="pwConfirm" v-model="model.pwConfirm"
                       class="form-control

"
                       placeholder="확인을 위해 이전과 동일한 비밀번호를 입력하세요"
                       required="required" aria-invalid="true">
                <!-- ngIf: showMessage(joinForm.pwConfirm) -->
              </td>
            </tr>
            <tr>
              <th scope="row" class="form-group required control-label"><label>이름</label></th>
              <td>
                <input type="text" name="userNm" v-model="model.userNm"
                       class="form-control"
                       placeholder="ex)홍길동" required="required"
                       aria-invalid="true">
                <!-- ngIf: showMessage(joinForm.userNm) -->
              </td>
            </tr>
            <tr>
              <th scope="row" class="form-group required control-label"><label>이메일</label></th>
              <td>
                <input type="email"
                       class="form-control"
                       name="email" v-model="model.email"
                       required="required" aria-invalid="true">
                <!-- ngIf: showMessage(joinForm.email) -->
              </td>
            </tr>
            </tbody>
          </table>
          <!-- 아래 버튼 -->
          <div class="modal-footer">
            <input class="btn-outline-secondary" type="button" value="닫기" @click="close">
            <input class="btn-outline-secondary" type="reset" value="초기화">
            <input class="btn-primary" type="submit" value="저장하기" >
          </div>
        </form>
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
      this.$axios.post('/isg-oreo/public/api/users',this.model).catch((response)=>{
        this.$alert('아이디가 중복되었습니다.','문제가 발생했습니다.','warning')
      }).then(()=>{
        this.$alert('','등록되었습니다.','info')
        this.close()
      })

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
