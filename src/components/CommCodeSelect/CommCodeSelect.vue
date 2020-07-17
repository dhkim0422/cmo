<template>
    <div class="CommCodeSelect">
        <pre v-text="$attrs"/>
    </div>
</template>

<script>
    export default {
        props: ['groupCode'],
    };
</script>
