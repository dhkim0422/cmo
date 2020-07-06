<template>
  <div class="modal fade" id="modal-class" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
          <h4 class="modal-title">Antibiotic Resistance Class 수정</h4>
        </div>
        <div class="modal-body">
          <table class="table-view">
            <colgroup>
              <col style="width: 167px;">
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
                    :clearSearchOnSelect="false"
                  ></vSelect>                  
                </td>
              </tr>
              <tr>
                <th class="th-title">Description</th>
                <td class="td-components">{{ selectedArc != null ? selectedArc.arcDesc : '' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-show="isMessage" class="alert alert-danger mT-20" role="alert">
            <i class="xi-error"><span class="sr-only">경고</span></i> {{ message }}
          </div>             
        </div>
        <div class="modal-footer text-center">
          <button type="button" title="Cancel" data-dismiss="modal" class="btn btn-primary-border btn-radius">Cancel</button>
          <button @click="saveClass" type="button" title="Save" class="btn btn-primary btn-radius mL-20">Save</button>
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
  name: 'ModalAntibiotic',
  components: {
    vSelect,
  },
  data() {
    return {
      selectedArc: null,
      message: '',
      isMessage: false,
    }
  },
  watch: {
    selectedArc() {
      if (this.selectedArc != null)
        this.isMessage = false
    }
  },
  computed: {
    ...mapGetters(['comboArcList']),
  },  
  methods: {
    saveClass() {
      if (this.selectedArc == null) {
        this.message = "class를 선택해 주세요."
        this.isMessage = true
        return;
      }

      // this.result.artp = this.selectedArtp
      this.$emit('modal-class:input', this.selectedArc)
      $('#modal-class').modal('hide')
    }
  }
}
</script>
