<template>
    <div v-show="this.pageData.length !== 0" class="text-center">
        <v-pagination
                v-model="pageData.data.currentPage"
                :length="pageData.data.total"
                :disabled="disabled"
                :total-visible=10
        ></v-pagination>
    </div>
</template>

<script>
    export default {
        name: 'pagination',
        props: ['pageData'],
        data() {
            return {
                circle: false,
                disabled: false,
                length: this.pageData.length,
                nextIcon: 'navigate_next',
                nextIcons: ['mdi-chevron-right', 'mdi-arrow-right', 'mdi-menu-right'],
                prevIcon: 'navigate_before',
                prevIcons: ['mdi-chevron-left', 'mdi-arrow-left', 'mdi-menu-left'],
                page: this.pageData.page,
                totalVisible: this.pageData.totalVisible | 10 ,
            }
        },
    }
</script>
