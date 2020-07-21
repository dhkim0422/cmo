<template>
    <div class="container" id="content">

        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="NGS" active>
                    <omics-regist-list :omics-type="'NGS'"></omics-regist-list>
                </b-tab>
                <b-tab title="Microarray">
                    <omics-regist-list :omics-type="'Microarray'"></omics-regist-list>
                </b-tab>
                <b-tab title="Metabolome">
                    <omics-regist-list :omics-type="'Metabolome'"></omics-regist-list>
                </b-tab>
            </b-tabs>

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
                tab: 1
            }
        },
    }
</script>


