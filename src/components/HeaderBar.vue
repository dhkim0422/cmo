<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <nav class="navbar navbar-expand-md">
      <h1 class="navbar-brand pointer" @click="goto('/')">
        <a home>
          <span class="sr-only">로고</span>
        </a>
      </h1>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="goto('/analysis/analysis')" title="ANALYSIS">ANALYSIS</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="http://example.com"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >내정보</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a class="nav-link" @click="goto('/project/projectList')" title="과제 목록">과제 목록</a>
              </li>
              <li>
                <a class="nav-link" @click="goto('/targets/targetList')" title="객체 목록">객체 목록</a>
              </li>
              <li>
                <a class="nav-link" @click="goto('/targets/targetList')" title="가계도 관리">가계도 관리</a>
              </li>
              <li>
                <a class="nav-link" @click="goto('/samples/samplesList')" title="샘플 목록">샘플 목록</a>
              </li>
              <li>
                <a class="nav-link" @click="goto('/omics/omics')" title="오믹스 데이터 등록내역">오믹스 데이터</a>
              </li>
              <!--<li>
                <a class="nav-link" @click="goto('/omics/omicsReview')" title="심의/승인">오믹스 심의</a>
              </li>-->
              <li class="nav-item">
                <a class="nav-link" @click="goto('/species/speciesList')" title="종관리">종관리</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click="goto('/storage/storageList')" title="저장고">저장고</a>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a
              v-if="$store.getters.loginAt"
              class="nav-link"
              @click="logout()"
              title="LOGOUT"
              :class="loginBtnClass"
            >LOGOUT</a>
            <a
              v-else
              class="nav-link"
              @click="$router.push({ name: 'login' })"
              title="LOG IN"
              :class="loginBtnClass"
            >LOG IN</a>
          </li>
        </ul>
      </div>
    </nav>

  </header>
</template>

<script>
import axios from "@/utils/axios.js";

export default {
  name: "vHeader",
  data() {
    return {
      menuList: [
        { path: "/", rootMenuNm: "Dashboard", menuNm: "Dashboard" },
        {
          path: "/analysis/analysis",
          rootMenuNm: "ANALYSIS",
          menuNm: "ANALYSIS"
        },
        { path: "/blast/blastSearch", rootMenuNm: "내정보", menuNm: "내정보" },
        { path: "/project/projectList", rootMenuNm: "과제", menuNm: "과제" },
        {
          path: "/targets/targetList",
          rootMenuNm: "객체",
          menuNm: "객체"
        },
        { path: "/samples/samplesList", rootMenuNm: "샘플", menuNm: "샘플" },
        {
          path: "/omics/omics",
          rootMenuNm: "마이페이지",
          menuNm: "오믹스 데이터 등록내역"
        },
        {
          path: "/omics/omicsReview",
          rootMenuNm: "내정보",
          menuNm: "등록의뢰 심의/승인"
        },

      ],
      rootMenuNm: "",
      menuNm: ""
    };
  },
  async created() {
    //생성시 토큰이 존재하는지 확인 후 토큰이 있으면 로그인 된것으로 판단한다.
    if (localStorage.getItem("x-auth-token") != null) {
      const response = await axios.post(
        "/isg-oreo/public/api/getTokenStatus.do"
      );
      if (response.data !== "TRUE") {
        this.$store.dispatch("setIsLoginAt", false);
      } else {
        this.$store.dispatch("setIsLoginAt", true);
      }
    }

    //처음에 공통코드를 전부 불러온다.
    //this.$store.dispatch('setCodeArr', {})
  },

  computed: {
    loginBtnClass() {
      return {
        "btn btn-radius": this.$route.name === "home",
        "btn btn-primary btn-radius": this.$route.name !== "home"
      };
    }
  },
  methods: {
    async logout(event) {
      localStorage.removeItem("x-auth-token");
      this.$store.dispatch("setIsLoginAt", false);
      this.$router.push({ path: "/" });
    },
    goto(path) {
      //   if (this.$route.path !== path) {
      // this.$store.dispatch("setParams", {});
      // this.$store.dispatch("initPaginationAndList", {
      //   resultList: [],
      //   paginationInfo: {},
      // });
      //   }
      //같은 페이지로 라우팅하면 에러발생하여 수정
      //   this.$router.push({ path: path });
      this.$router.push({ path: path }).catch(() => {});

      //메뉴명 설정
      /*const { rootMenuNm, menuNm } = this.menuList.find(
        item => item.path === path
      );
      this.rootMenuNm = rootMenuNm;
      this.menuNm = menuNm;*/

    },
    getRootMenuNm() {
      return this.menuList.find(item => item.path === this.$route.path);
    },
    getMenuNm() {}
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.navbar-nav li:hover > ul.dropdown-menu {
  display: block;
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
}

/* rotate caret on hover */
.dropdown-menu > li > a:hover:after {
  text-decoration: underline;
  transform: rotate(-90deg);
}
</style>
