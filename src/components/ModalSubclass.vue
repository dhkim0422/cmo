<template>
  <div class="modal fade" id="modal-subclass" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
          <h4 class="modal-title">Antibiotic Resistance Subclass 수정</h4>
        </div>
        <div class="modal-body">
          <table class="table-view">
            <colgroup>
              <col style="width: 167px;">
              <col>
              <col>
            </colgroup>
            <tbody>
              <tr>
                <th class="th-title">Class</th>
                <td class="td-components">
                  <vSelect
                    v-model="selectedArc"
                    label="arcNm"
                    :options="comboArcList"
                    :reduce="option => option"
                    @input="onInput"
                  ></vSelect>                  
                </td>
                <td class="td-components">
                  <vSelect
                    v-model="selectedArtp"
                    label="artp"
                    :options="comboArtpList"
                    :reduce="option => option"
                    resetOnOptionsChange
                  ></vSelect>                  
                </td>
              </tr>
              <tr>
                <th class="th-title">Description</th>
                <td colspan="2" class="td-components">{{ selectedArc != null ? selectedArc.arcDesc : '' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-show="isMessage" class="alert alert-danger mT-20" role="alert">
            <i class="xi-error"><span class="sr-only">경고</span></i> {{ message }}
          </div>             
        </div>
        <div class="modal-footer text-center">
          <button type="button" title="Cancel" data-dismiss="modal" class="btn btn-primary-border btn-radius">Cancel</button>
          <button @click="saveSubclass" type="button" title="Save" class="btn btn-primary btn-radius mL-20">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { mapGetters } from 'vuex'


export default {
  name: 'ModalSubclass',
  components: {
    vSelect,
  },
  data() {
    return {
      selectedArc: null,
      selectedArtp: null,
      message: '',
      isMessage: false,
    }
  },
  watch: {
    selectedArtp() {
      if (this.selectedArtp != null)
        this.isMessage = false
    }
  },
  computed: {
    ...mapGetters(['comboArcList', 'comboArtpList', 'result']),
  },  
  methods: {
    //class 값이 선택 되었을때 이벤트
    onInput(option) {
      if (option != null) {
        console.log('option', option)
        //항생제 내성 subclass 목록
        this.$store.dispatch('loadArtpList', {
          params: {
            arcId: option.arcId
          }
        })      
      }
    },
    saveSubclass() {
      if (this.selectedArc == null) {
        this.message = "class를 선택해 주세요."
        this.isMessage = true
        return;
      }

      if (this.selectedArtp == null) {
        this.message = "subclass를 선택해 주세요."
        this.isMessage = true        
        return;        
      }

      this.$emit('modal-subclass:input', this.selectedArtp)
      
      $('#modal-subclass').modal('hide')
    }
  }
}
</script>
