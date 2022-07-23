<script type="ts">
    import { Form, PasswordInput, Button } from "carbon-components-svelte";

    import { onMount } from "svelte";

    export let onsubmit: (values: [{name:string, value:string}]) => void;

    let form_element: Element;

    var input_keys: string[] = [];
    var input_values: string[] = [];

    var input_elements: NodeListOf<HTMLInputElement>;

    onMount(() => {
        console.log(form_element);
        input_elements = <NodeListOf<HTMLInputElement>>form_element.querySelectorAll(".data-input");
    });
    function prepare(ev: Event) {
        var values: [{name:string, value:string}] | any[] = [];
        for (const item of input_elements) {
            values.push({name: item.name, value:item.value});
        }
        onsubmit(<[{name:string, value:string}]>values);
    }
</script>

<div class="bx--form" bind:this={form_element}>
    <slot />
    <Button on:click={prepare}>Submit</Button>
</div>
