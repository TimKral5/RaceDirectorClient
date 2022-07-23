<script type="ts">
    export let style: string = "";
    export let id: string = "";
    export let _class: string = "";
    export let hq_query: string = "";
    export let tabid: string;
</script>

<div data-hq data-hq_query="{hq_query}tab={tabid};" {style} {id} class={_class} >
    <slot />
</div>