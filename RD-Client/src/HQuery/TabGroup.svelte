<script type="ts">
    export let style: string = "";
    export let id: string = "";
    export let _class: string = "";
    export let hq_query: string = "";
    export let tabgroup: string;
</script>

<div data-hq data-hq_query="{hq_query}tabgroup={tabgroup};" {style} {id} class={_class} >
    <slot />
</div>