<template>
    <div class="container" id="content">

        <!-- 탭 -->
        <ul class="tab-menu m-t-75">
            <li class="menu-item">
                <a class="menu-link" href="#tab1">NGS</a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="#tab2">Microarray</a>
            </li>
            <li class="menu-item">
                <a class="menu-link" href="#tab3">metabolome</a>
            </li>
        </ul>


        <!-- 탭내용 -->
        <div class="tab-content">
            <div class="tab-pane show" id="tab1" >
                <span class="sr-only">NGS</span>
                <omics-regist-list :omics-type="'NGS'" ></omics-regist-list>
            </div>

            <div class="tab-pane fade show" id="tab2">
                <span class="sr-only">Microarray</span>
                <omics-regist-list :omics-type="'Microarray'" ></omics-regist-list>
            </div>

            <div class="tab-pane fade show" id="tab3">
                <span class="sr-only">metabolome</span>
                <omics-regist-list :omics-type="'Metabolome'"  ></omics-regist-list>
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


