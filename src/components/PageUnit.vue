<template>
    <select
            @change="onChangePageUnit"
            v-model="pageUnit"
            class="length"
            aria-invalid="false"
    >
        <option label="10개씩 보기" value="10">10개씩 보기</option>
        <option label="25개씩 보기" value="25">25개씩 보기</option>
        <option label="50개씩 보기" value="50">50개씩 보기</option>
        <option label="100개씩 보기" value="100">100개씩 보기</option>
    </select>
</template>

<script>
    export default {
        props: ['pageUnit'],

        name: 'PageUnit',
        methods: {
            onChangePageUnit() {
                this.$emit('onChangePageUnit', this.pageUnit);
            }
        }
    }
</script>
