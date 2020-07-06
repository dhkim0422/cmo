<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 class (ARC)">항생제</h3>
        <h4 class="h4 mB-20">항생제 등록</h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span class="required">항생제 계열</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <select class="form-control" v-model="abcInfo" @change="fnSelectSubClsass()">
                    <option value="">선택</option>
                    <option v-for="option in result" :value="option">{{option.abClass}}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span class="required">항생제 Subclass</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <select class="form-control" v-model="abInfoDetail">
                    <option value="">선택</option>
                    <option v-for="option in abSubClassList" :value="option">{{option.abSubclass}}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>    
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span class="required">항생제</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <input type="text" class="form-control" v-model="ab">
                </td>
              </tr>
            </tbody>
          </table>
        </div>            
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>상세설명</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <textarea type="text" class="form-control" v-model="abDesc" style="height: 200px;"> </textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>        

        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 60px">
              <col style="width: 310px">
              <col>
            </colgroup>
            <thead>
              <tr>
                <th colspan="3" class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>외부 데이터베이스 링크</span>
                      <button @click="addDblink" type="button" class="btn btn-default mL-15" title="추가">추가</button>
                      <button @click="deleteDblink" type="button" class="btn btn-default" title="삭제">삭제</button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dblink, index) in dblinks" :key="index">
                <th class="text-center"><input type="checkbox" v-model="chkDblink" title="" :value="index"></th>
                <td class="td-components">
                  <select class="form-control" v-model="dblink.refNm">
                    <option value="">선택</option>
                    <option value="kegg">KEGG DRUG</option>
                    <option value="chebi">ChEBI</option>
                    <option value="mesh">MeSH</option>
                  </select>
                </td>
                <td class="td-components"><input type="text" class="form-control" v-model="dblink.refId"></td>
              </tr>
            </tbody>
          </table>
        </div>        

        <div class="wrap-btn text-right mB-120">
          <button @click="$router.go(-1)" type="button" title="Cancel" class="btn btn-primary-border btn-radius mR-20">Cancel</button>
          <button @click="onSave" type="button" title="Save" class="btn btn-primary btn-radius">Save</button>
        </div>
      </section>
      <modal-alert :id="modalId" :message="message"></modal-alert>
    </div>
  
</template>

<script>
import { mapGetters} from 'vuex'
import ModalAlert from '@/components/ModalAlert.vue';

export default {
  name: 'AntiBioticRegister',
  components: {
      ModalAlert
  },
  data() {
    return {
      abDesc : '',
      ab : '',
      abcInfo:'',
      abInfoDetail : '',
      message:'',
      modalId: '0',
      dblinks: [],
      chkDblink: [],
      dblinkNo: 0,
    }
  },
  created() {
      this.$store.dispatch('loadOne', {
          url: '/api/database/selectAbcInfo.do',
          params: {
          }
      })

  },
 
  computed: {
      ...mapGetters(['result', 'genericList']),
      abSubClassList() {
          return this.genericList == null ? [] : this.genericList
      }
  },
  mounted() {
  },
  
  methods: {
    fnSelectSubClsass(){
        let params = {
            abClass: this.abcInfo.abClass,
        }
        this.$store.dispatch('loadGenericList', {
            url: '/api/database/selectAbcInfo.do',
            params: params
        }).then(() => {
        });
    },
    addDblink() {
      let dblink = {
        dblinkNo: this.dblinkNo++,
        refId:  '',
        refNm: '',
      }
      this.dblinks.push(dblink)
    },
    deleteDblink() {
      let result = this.chkDblink.sort((a, b) => b - a)
      result.forEach((element) => {
        this.dblinks.splice(element, 1)
      });
      this.chkDblink = []
    },
      onSave() {
          if (this.isValidator()) {
              let params = {
                  abDesc: this.abDesc,
                  ab: this.ab,
                  abcId: this.abInfoDetail.abcId,
                  refs: this.dblinks,
              }
          this.$store.dispatch('updateOne', {
              url: '/api/database/insertAbInfo.do',
              params: params
          }).then(() => {
              this.message = '저장 되었습니다.'
              this.modalId = '100'
              $('#modal-alert').modal('toggle')
              $('#modal-alert').on('hidden.bs.modal', e => {
                  if (e.target.dataset.id === '100')
                      this.$router.go(-1)
              })

          })
          }
      },
      isValidator() {
          this.modalId = '0'

          if (!this.abcInfo.abcId) {
              this.message = '항생제계열을 입력해 주세요.'
              $('#modal-alert').modal('toggle')
              return false
          }

          if (!this.abInfoDetail.abcId) {
              this.message = '항생제 Subclass를 입력해 주세요.'
              $('#modal-alert').modal('toggle')
              return false
          }

          if (!this.ab) {
              this.message = '항생제를 입력해 주세요.'
              $('#modal-alert').modal('toggle')
              return false
          }

          return true
      }
  }
}
</script>

