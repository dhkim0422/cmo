<template>
<div class="modal fade" id="modal-sequence" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
        <h4 class="modal-title">서열</h4>
      </div>
      <div class="modal-body">
          <table class="table-view table-thead">
            <tbody>
              <tr>
                <td class="td-components font-family-courier" v-html="$options.filters.htmlSeqFormat(seq)"></td>
              </tr>
            </tbody>
          </table>
      </div>

      <div class="modal-footer">
        <button type="button" name="button" title="Close" data-dismiss="modal" class="btn btn-primary-border btn-radius">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ModalSequence',
  props: {
    seq: {
      type: String,
      default: '',
    },
  },
}
</script>
