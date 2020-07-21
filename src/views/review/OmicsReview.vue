<template>
    <div class="container" id="content">

        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="심의목록" active>
                    <omics-review-list :status="'REVIEW'"/>
                </b-tab>
                <b-tab title="승인 목록">
                    <omics-review-list :status="'CONFIRM'"/>
                </b-tab>

            </b-tabs>
        </div>
    </div>
</template>

<script>
    import OmicsReviewList from "./OmicsReviewList";
    export default {
        name: "omicsReview",
        components: {OmicsReviewList}
    }
</script>

<style scoped>

</style>
