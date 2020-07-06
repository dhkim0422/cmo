<template>
    <div class="container">
      <section class="mT-60">
        <h3 class="h3 title-section mB-30"><img src="../images/arg-database-ico-s.png" alt="항생제 내성 유전자 class (ARC)">항생제</h3>
        <h4 class="h4 mB-20">{{ antiBioticsDblinks.ab }} 상세보기</h4>
        <div class="mB-20">
          <table class="table-view table-thead">
            <thead>
              <tr>
                <th class="th-title">
                  <div class="row">
                    <div class="col-xs-6">
                      <span>항생제 계열</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td> {{ antiBioticsDblinks.abClass }} </td>
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
                      <span>항생제 Subclass</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td> {{ antiBioticsDblinks.abSubclass }} </td>
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
                      <span>항생제</span>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr>
                <td class="td-components">
                  <input type="text" v-model="ab" class="form-control">
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
              <tr class="td-components">
                <td>
                  <textarea type="text" v-model="abDesc" class="form-control" style="height: 200px;"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>        
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 100px">
              <col style="width: 120px">
              <col>
            </colgroup>            
            <thead>
              <tr>
                <th colspan="3" class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>치료에 사용되는 질병</span>
                      <button @click="isAntiBioticDs=!isAntiBioticDs" type="button" class="btn btn-default mL-15">{{ isAntiBioticDs ? '숨기기' : '보이기' }}</button>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr v-show="isAntiBioticDs" v-for="(antiBioticDs, index) in antiBioticDsList" :key="index">
                <td class="text-center">{{ antiBioticDs.dsKeggId }}</td>
                <td>{{ antiBioticDs.dsName }}</td>
                <td>{{ antiBioticDs.dsDesc }}</td>
              </tr>
            </tbody>
          </table>
        </div>            
        <div class="mB-20">
          <table class="table-view table-thead">
            <colgroup>
              <col style="width: 150px">
              <col>
            </colgroup>            
            <thead>
              <tr>
                <th colspan="2" class="th-title">
                  <div class="row">
                    <div class="col-xs-12">
                      <span>항생제 내성 subclass</span>
                      <button @click="isAntiBioticArtp=!isAntiBioticArtp" type="button" class="btn btn-default mL-15">{{ isAntiBioticArtp ? '숨기기' : '보이기' }}</button>
                    </div>
                  </div>
                </th>
              </tr>              
            </thead>
            <tbody>
              <tr v-show="isAntiBioticArtp" v-for="(antiBioticArtp, index) in antiBioticArtpList" :key="index">
                <td>{{ antiBioticArtp.artp }}</td>
                <td>{{ antiBioticArtp.arcDesc }}</td>
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
                <th colspan="4" class="th-title">
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
              <tr v-for="(dblink, index) in antiBioticsRefDblinks" :key="index">
                <th class="text-center"><input type="checkbox" v-model="chkDblink" title="" :value="index"></th>
                <td class="td-components">
                  <select class="form-control" v-model="dblink.refNm">
                    <option value="">선택</option>
                    <option value="kegg">KEGG DRUG</option>
                    <option value="chebi">ChEBI</option>
                    <option value="mesh">MeSH</option>
                  </select>
                </td>
                <td class="td-components">
                  <input v-show="!dblinks[index]" type="text" class="form-control" v-model="dblink.refId" >
                  <a v-if="dblink.refNm=='kegg'" v-bind:href='"https://www.kegg.jp/dbget-bin/www_bget?dr:"+dblink.refId' v-show="dblinks[index]" type="text" v-text="dblink.refId"></a>
                  <a v-if="dblink.refNm=='chebi'" v-bind:href='"https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:"+dblink.refId' v-show="dblinks[index]" type="text" v-text="dblink.refId"></a>
                  <a v-if="dblink.refNm=='mesh'" v-bind:href='"https://www.ncbi.nlm.nih.gov/mesh/"+dblink.refId' v-show="dblinks[index]" type="text" v-text="dblink.refId"></a>
                </td>
                <td class="td-components">
                  <button @click="modifyKegg(index)" type="button" class="btn btn-default mL-15" title="수정">수정</button>
                </td>
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

export default {
  name: 'AntiBioticDetail',
  components: {
  },
  data() {
    return {
      isAntiBioticArtp: true,
      isAntiBioticDs: true,
      dblinks: [],
      chkDblink: [],
      dblinkNo: 0,
      ab : '',
      abDesc : '',
      abId : this.$route.params.abId,
      message:'',
      modalId: '0',

    }
  },
  created() {
    //    
    this.$store.dispatch('loadAntiBioticDsList', {
      params: {
        abId: this.$route.params.abId
      }
    })

    this.$store.dispatch('loadAntiBioticArtpList', {
      params: {
        abId: this.$route.params.abId
      }
    })

      this.$store.dispatch('loadOne', {
          url: '/api/database/selectAbInfo.do',
          params: {
              abId: this.$route.params.abId
          }
      })


  },
 
  computed: {
    ...mapGetters(['antiBioticDsList', 'antiBioticArtpList', 'result']),

      antiBioticsRefDblinks() {
          if(this.result.abRefList == null){
              return {};
          }

          return this.result.abRefList;
      },
      antiBioticsDblinks(){
          if(this.result.abInfo == null){
              return {};
          }
          this.ab = this.result.abInfo[0].ab;
          this.abDesc =this.result.abInfo[0].abDesc;
          return this.result.abInfo[0];
      }
  },
  mounted() {
  },
  
  methods: {
      modifyKegg(index) {
          this.dblinks[index] =  !this.dblinks[index]
          this.dblinks = [...this.dblinks]
      },
    addDblink() {
      let dblink = {
        dblinkNo: this.dblinkNo++,
        refNm:  '',
        refId: '',
      }
      this.antiBioticsRefDblinks.push(dblink)
    },
    deleteDblink() {
      let result = this.chkDblink.sort((a, b) => b - a)
      result.forEach((element) => {
        this.antiBioticsRefDblinks.splice(element, 1)
      });
      this.chkDblink = []
    },
    onSave() {
        if (this.isValidator()) {
            let params = {
                abDesc: this.abDesc,
                ab: this.ab,
                abId : this.abId,
                refs: this.antiBioticsRefDblinks,
            }
            console.log(params);
            this.$store.dispatch('updateOne', {
                url: '/api/database/updateAbInfo.do',
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

