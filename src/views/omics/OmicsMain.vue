<template>
    <div class="container" id="content">
        <ul class="tab-menu m-t-75">

            <li class="menu-item active">
                <a data-toggle="tab" class="menu-link"  href="#tab1">NGS</a>
            </li>
            <li class="menu-item">
                <a data-toggle="tab" class="menu-link"  href="#tab2">Microarray</a>
            <li class="menu-item">
            <li>
                <a data-toggle="tab" class="menu-link"  href="#tab3">Metabolome</a>
            </li>
        </ul>
        <div class="tab-content">
            <div id="tab1" class="tab-pane active">
                <span class="sr-only">NGS</span>
                <omics-regist-list :omics-type="'NGS'" ></omics-regist-list>
            </div>
            <div id="tab2" class="tab-pane">
                <span class="sr-only">Microarray</span>
                <omics-regist-list :omics-type="'Microarray'" ></omics-regist-list>
            </div>
            <div id="tab3" class="tab-pane">
                <span class="sr-only">metabolome</span>
                <omics-regist-list :omics-type="Metabolome"  ></omics-regist-list>
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
                tab: 1
            }
        },
    }
</script>


