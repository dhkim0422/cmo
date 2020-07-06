<template>
<div class="modal fade" id="modal-alert" tabindex="-1" role="dialog" :data-id="id">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn close" data-dismiss="modal" aria-label="Close"><i class="xi-close"></i><span class="sr-only">Close</span></button>
        <h4 class="modal-title">알림</h4>
      </div>
      <div class="modal-body">
        <p class="text-center mB-0 pB-20 pT-10" style="font-size: 16px;">{{ message }}</p>
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
  name: 'ModalAlert',
  props: {
    message: '',
    id: '',
  },
}
</script>
