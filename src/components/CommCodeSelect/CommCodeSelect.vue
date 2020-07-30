<template>
    <div class="CommCodeSelect">
        <pre v-text="$attrs"/>
    </div>
</template>

<script>
    import axios from "../../utils/axios";

    export default {
        props: ['groupCode'],
        data() {
            return {
                code: {}
            }
        },
        created() {
            this.initCode()
        },
        methods: {
            async initCode() {
                let codeList = ['GEN']
                for (const item of codeList) {
                    let url = '/isg-oreo/ajax/codeGroups/' + this.groupCode
                    const codeData = await axios.get(url, {})
                    this.code[item] = codeData.data.data.resultList
                }
            }
        }
    };
</script>
