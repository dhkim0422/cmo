<template>
  <header>
    <nav class="navbar navbar-expand-md">
      <h1 class="navbar-brand pointer" @click="goto('/')">
        <a home>
          <span class="sr-only">로고</span>
        </a>
      </h1>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="http://example.com"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li class="dropdown-submenu">
                <a
                  class="dropdown-item dropdown-toggle"
                  href="http://google.com"
                  >Google</a
                >
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Submenu</a></li>
                  <li><a class="dropdown-item" href="#">Submenu0</a></li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#"
                      >Submenu 1</a
                    >
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu1</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a class="dropdown-item dropdown-toggle" href="#"
                      >Submenu 2</a
                    >
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                      <li><a class="dropdown-item" href="#">Subsubmenu2</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <a
              class="nav-link"
              @click="goto('/analysis/analysis')"
              title="ANALYSIS"
              >ANALYSIS</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click="goto('/blast/blastSearch')"
              title="내정보"
              >내정보</a
            >
            <ul></ul>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click="goto('/project/projectList')"
              title="과제 목록"
              >과제 목록</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click="goto('/targets/targetList')"
              title="연구대상자 목록"
              >연구대상자 목록</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              @click="goto('/samples/samplesList')"
              title="샘플 목록"
              >샘플 목록</a
            >
          </li>
          <li class="nav-item">
            <a
              v-if="$store.getters.loginAt"
              class="nav-link"
              @click="logout()"
              title="LOGOUT"
              :class="loginBtnClass"
              >LOGOUT</a
            >
            <a
              v-else
              class="nav-link"
              @click="$router.push({ name: 'login' })"
              title="LOG IN"
              :class="loginBtnClass"
              >LOG IN</a
            >
          </li>
        </ul>
      </div>
    </nav>
    <div class="bg-container bg-sm ng-scope">
      <div class="container">
        <!-- 제목 -->
        <ol class="path">
          <li class="path-item">대메뉴</li>
          <li class="path-item"><h1 class="h1">제목</h1></li>
        </ol>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "@/utils/axios.js";

export default {
  name: "vHeader",
  created() {
    //생성시 토큰이 존재하는지 확인 후 토큰이 있으면 로그인 된것으로 판단한다.
    if (localStorage.getItem("x-auth-token") != null)
      this.$store.dispatch("setIsLoginAt", true);

    //처음에 공통코드를 전부 불러온다.
    //this.$store.dispatch('setCodeArr', {})
  },

  computed: {
    loginBtnClass() {
      return {
        "btn btn-radius": this.$route.name === "home",
        "btn btn-primary btn-radius": this.$route.name !== "home",
      };
    },
  },

  methods: {
    async logout(event) {
      localStorage.removeItem("x-auth-token");
      this.$store.dispatch("setIsLoginAt", false);
      this.$router.push({ path: "/" });
    },
    goto(path) {
      if (this.$route.path !== path) {
        this.$store.dispatch("setParams", {});
        this.$store.dispatch("initPaginationAndList", {
          resultList: [],
          paginationInfo: {},
        });
      }
      this.$router.push({ path: path });
    },
  },
};
</script>

<style lang="scss">
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
