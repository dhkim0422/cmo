<template>
  <div class="container" id="content">
    <page-head-info :root-menu-nm="'종관리'" :menu-nm="'종관리 상세'"/>

    <br>
    <br>

    <div class="filter-group" style="margin-bottom: 0px;">

      <div class="group-item">
        <h2 class="h2">기본 정보</h2>
      </div>

      <div class="group-item">
                <span data-toggle="tooltip" data-placement="top" title="연구샘플 삭제">
                <button class="btn-outline-secondary-sm" type="button" @click="remove()">
                    <i class="xi-trash"></i>
                    <span class="sr-only">삭제</span>
                </button>
                </span>
        <!--<span data-toggle="tooltip" data-placement="top" title="연구샘플 수정">
        <button class="btn-primary-sm" type="button" @click="onClickChangeLink()">
            <i class="xi-pen"></i>
            <span class="sr-only">수정</span>
        </button>
        </span>-->
        <span data-toggle="tooltip" data-placement="top" title="연구샘플 수정">
                    <b-button class="btn-primary-sm" v-b-modal.SpeciesMerge variant="primary">
                        <i class="xi-pen"></i><span class="sr-only">수정</span>
                    </b-button>
                    <species-merge :species="model" @saveOK="updateOK"/>
                </span>
      </div>
    </div>
    <br>

    <table class="view-table">
      <caption class="sr-only">연구샘플_기본정보</caption>
      <tbody>
      <tr>
        <th>등록번호</th>
        <td>{{ model.id }}</td>
      </tr>
      <tr>
        <th>학명</th>
        <td>{{ model.scientificNm }}</td>
      </tr>
      <tr>
        <th>
          종명(국문)
        </th>
        <td>{{ model.speciesNmKr }}</td>
      </tr>
      <tr>
        <th>
          종명(국문)
        </th>
        <td>{{ model.speciesNmEn }}</td>
      </tr>
      <tr>
        <th>
          종명(국문)
        </th>
        <td>{{ model.kindNmKr }}</td>
      </tr>
      <tr>
        <th>
          종명(국문)
        </th>
        <td>{{ model.kindNmEn }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../../utils/axios";
import SpeciesMerge from "@/views/species/SpeciesMerge";

export default {
  name: "OmicsDetail",
  components: {SpeciesMerge},
  created() {
    this.initData()
  },
  data() {
    return {
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
    async initData() {
      let id = this.$route.params.id;
      console.log('id?',id)
      let summayrData = await axios.get(
          "/isg-oreo/api/species/" + id,
          {}
      );
      this.model = summayrData.data;
    },
    updateOK(){
      this.initData()
    }

  }
}

</script>

