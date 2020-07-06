<template>
<div class="modal fade" id="modalTaxonTree" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
        <h4 class="modal-title">Taxon 트리</h4>
      </div>
      <div class="modal-body" style="min-height: 500px;">
        <treeselect v-model="value" valueFormat="object"  :multiple="isMultiple" :options="taxonTreeList" :flat="isFlat" :max-height="430">
          <label slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName }" :class="labelClassName">
              <span v-if="node.raw.nodeRank == 'species'" v-bind:style="{color : 'blue'}"> {{node.label}} </span>
              <span v-if="node.raw.nodeRank != 'species'" > {{node.label}} </span>
          </label>          
        </treeselect>
      </div>

      <div class="modal-footer">
        <button type="button" name="button" title="Close" data-dismiss="modal" class="btn btn-primary-border btn-radius">Close</button>
        <button type="button" name="button" title="Save" data-dismiss="modal" v-on:click="onInput()" class="btn btn-primary btn-radius mL-20">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { mapGetters} from 'vuex'

export default {
  //목록을 조회 한다.
  components: { Treeselect },
  props: {
    isMultiple: {
      type: Boolean,
      default: false,
    },
    isFlat: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: null,
    }
  },

  created() {
      this.$store.dispatch('loadATaxonTreeList')
  },

  computed: {
    ...mapGetters(['taxonTreeList']),
  },

  methods: {
    onInput() {
      this.$emit('taxontree:input', this.value)
    }
  }
}
</script>
