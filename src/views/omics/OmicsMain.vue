<template>
<div>

    <ul class="tab-menu m-t-75">
        <li class="menu-item"><a class="menu-link" :class="css(1)" @click="click(1)">NGS</a></li>
        <li class="menu-item"><a class="menu-link" :class="css(2)" @click="click(2)">Microarray</a></li>
        <li class="menu-item"><a class="menu-link" :class="css(3)" @click="click(3)">대사체</a></li>
    </ul>
    <div class="tab-content">
        <div v-show="currentTab === 1">
            <span class="sr-only">NGS</span>
            <omics-regist-list :omics-type="'NGS'"></omics-regist-list>
        </div>
        <div v-show="currentTab === 2">
            <span class="sr-only">Microarray</span>
            <omics-regist-list :omics-type="'Microarray'"></omics-regist-list>
        </div>
        <div v-show="currentTab === 3">
            <span class="sr-only">Metabolome</span>
            <omics-regist-list :omics-type="'Metabolome'"></omics-regist-list>
        </div>

    </div>
</div>
</template>

<script>
    import OmicsRegistList from "./OmicsRegistList";

    export default {
        name: "OmicsMain",
        components: {OmicsRegistList},
        data() {
            return {
                currentTab: 1
            }
        },
        computed: {

        },

        methods: {
            css(tapNo) {
                if (tapNo == this.currentTab) {
                    return "active"
                } else {
                    return ''
                }
            },

            click(tabNo) {
                this.currentTab = tabNo
            }

        }
    }
</script>


