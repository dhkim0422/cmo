<template>
    <div>
        <nav class="navbar-pagination" v-show="model.size() == 0">
            <ul class="pagination">
                <li class="page-item">
                    <a role="button"
                       class="page-link first"
                       @click="this.scrollFirst()">
                       <i class="xi-step-backward"></i>
                    </a>
                </li>
                <li class="page-item">
                    <a  role="button"
                        class="page-link previous"
                        @click="this.prev()">
                        <i class="xi-play"></i>
                    </a>
                </li>

                <li class="page-item" v-for="page in pageData.total">
                    <a  role="button"
                        ng-class="(pageHandler.getCurrentPage() == page) ? 'page-link active' : 'page-link'"
                        ng-disabled="pageHandler.getCurrentPage() == page"
                        ng-click="pageHandler.setCurrentPage(page, true)">
                        {{ page }}
                    </a>
                </li>

                <li class="page-item">
                    <a  role="button" class="page-link next"
                        ng-disabled="pageHandler.isNextDisabled()"
                        ng-click="pageHandler.next()">
                        <i class="xi-play"></i>
                    </a>
                </li>
                <li class="page-item">
                    <a  role="button" class="page-link last"
                        ng-disabled="pageHandler.isScrollLastDisabled()"
                        ng-click="pageHandler.scrollLast()">
                        <i class="xi-step-forward"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>


</template>

<script>
    export default {
        name: "PageNation",
        props: ['pageData'],
        methods:{

        }

    }
</script>

<style scoped>

</style>
