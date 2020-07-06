<script>
    // MonthlyIncome.vue
    import { Bar } from 'vue-chartjs'

    export default {
        extends: Bar,
        props: ['data'],
        watch: {
            data(newData) {
                this.renderChart(newData,this.options);
            }
        }
    }
</script>

