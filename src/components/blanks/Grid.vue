<template lang="pug">
    include ../../tools/mixins.pug

    +b.grid
        +e.item
            +e.column
        +e.item
            +e.column
        +e.item
            +e.column
        +e.item
            +e.column
        +e.item
            +e.column
        +e.item
            +e.column
        +e.item
            +e.column

</template>

<script>
    export default {
        name: "grid"
    }
</script>
