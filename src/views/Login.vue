<template>
    <div class="container fullHeight">
        <div class="account-box login">
            <h2 class="mT-0 mB-30 text-left">로그인</h2>
            <form @submit.prevent="login">
                <div class="form-group mB-5">
                    <label for="account-id" class="sr-only">아이디</label>
                    <input v-model="username" type="text" class="form-control" id="account-id"
                           aria-describedby="emailHelp" placeholder="아이디">
                </div>
                <div class="form-group mB-20">
                    <label for="account-pw" class="sr-only">비밀번호</label>
                    <input v-model="password" type="password" class="form-control" id="account-pw" placeholder="비밀번호">
                </div>
                <button type="submit" class="btn btn-primary">로그인</button>
            </form>
            <!-- <p class="text-right mT-15"><a href="#" title="회원가입">회원가입</a> <span class="text-lighter mL-5 mR-5">|</span> <a href="#" title="ID/비밀번호 찾기">ID/비밀번호 찾기</a></p> -->
        </div>
    </div>
</template>

<script>
    import axios from '@/utils/axios.js'

    export default {
        name: 'Login',
        comments: {
            axios
        },
        data: () => ({
            username: '',
            password: ''
        }),
        created: function () {
        },
        mounted: function () {
            const headerH = $('header').outerHeight();
            const footerH = $('footer').outerHeight();
            let bodyH = $('body').outerHeight();
            let contentH = bodyH - headerH - footerH;
            $('.fullHeight').css('height', contentH);
        },
        methods: {
            async login(event) {
                try {
                    let url = '/isg-oreo/api/login.do'
                    const {headers} = await axios.post(url, {username: this.username, password: this.password});
                    localStorage.setItem("x-auth-token", headers['x-auth-token'])
                    await this.$store.dispatch('setIsLoginAt', true)
                    this.$router.push({path: '/'})


                } catch (e) {

                }

            }
        }
    }
</script>
