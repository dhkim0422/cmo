<template>
  <div class="container" >
    <page-head-info :root-menu-nm="'내정보'" :menu-nm="'종 관리 목록'"/>
    <search-box :filters="filter" @searchClick="changeParams"></search-box>
    <!-- 검색 목록 -->
    <div class="filter-group">
      <div class="group-item">
        <total-record-count :result-list="resultList"/>
      </div>
      <div class="group-item">
        <b-button lass="btn-outline-secondary-sm" title="삭제" @click="remove">
          <i class="xi-trash"></i><span class="sr-only">삭제</span>
        </b-button>
        <!-- 로우수를 넘겨주며 기본값을 10으로 설정 -->
        <page-unit :page-unit="resultList.data.numberOfRows"
                   @onChangePageUnit="onChangePageUnit"></page-unit>
        <span data-toggle="tooltip" data-placement="top" title="연구샘플_등록">
                    <!--등록은 id=registPopup 로연결되어 있음 -->
                    <b-button class="btn-primary-sm" v-b-modal.speciesSavePopup variant="primary"
                              @click="onClickCreateLink">
                        <i class="xi-file-add"></i><span class="sr-only">등록</span>
                    </b-button>
          <!--등록을 위한 페잊 컴포넌트-->
                    <species-merge />
                <div>
                </div>
                </span>
      </div>
    </div>

    <table class="data-table table-responsive">
      <caption class="sr-only">목록</caption>
      <thead>
      <tr>
        <th class="fixed-x" style="width: 70px;">
          <div class="custom-checkbox">
            <b-form-checkbox
                v-model="allSelected"
                :indeterminate="indeterminate"
                @change="toggleAll"
            >
              <label class="custom-control-label">
                <span class="sr-only">
                    전체선택
                </span>
              </label>
            </b-form-checkbox>
          </div>
        </th>
        <th class="fixed-x">등록번호</th>
        <th>학명</th>
        <th>종명</th>
        <th>품종명</th>
        <th>등록자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-show="resultList.data.list.length == 0">
        <td colspan="6">검색된 결과가 없습니다.</td>
      </tr>
      <tr v-for="item in resultList.data.list">
        <td class="fixed-x">
          <div class="custom-checkbox">
            <!--<input type="checkbox" class="custom-control-input" id="searchSmple{{item.id}}"
                   checklist-model="modelHandler.selectedIdList"
                   checklist-value="item.id" ng-change="modelHandler.select(item, onlyOne)" />-->
            <label class="custom-control-label" :for="'searchSmple'+item.id">
              <span class="sr-only">선택</span>
            </label>
          </div>
        </td>
        <!--<td class="fixed-x">{{ item.accession }}</td>
        <td>{{ item.target && item.target.accession }}</td>
        <td>{{ item.target && item.target.gender }}</td>
        <td>{{ item.uniqueNo }}</td>
        <td>{{ item.origin && item.origin.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.type && item.type.name }}</td>
        <td>{{ item.disease }}</td>-->
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SpeciesMerge from "@/views/species/SpeciesMerge";
import TotalRecordCount from "@/components/TotalRecordCount";
export default {
  name: "SpeciesTypeList",
  components: {TotalRecordCount, SpeciesMerge},
  data() {
    return {
      allSelected: false,
      indeterminate: false,
      resultList:{
        data:{
          tatal:0,
          numberOfRows:10,
          list:[],
          currentPage:1
        }
      },
      filter:{

      }


    }
  },
  methods: {
    onChangePageUnit(){

    },
    toggleAll() {

    },
    changeParams(){

    },
    onClickCreateLink(){

    }
  }
}
</script>
