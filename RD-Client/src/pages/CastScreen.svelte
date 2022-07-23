<script type="ts">
    import { InlineNotification, Toggle } from "carbon-components-svelte";

    export let config;
    export let purpose:string;

    var init = true;
</script>

<div>
    <hr />
    <div id={purpose + "_cast_scroll"} style="height:200px; overflow-y: scroll;">
        {#each config.data.casts as cast}
            {#if cast.type == "yellow_flag"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="warning"
                    title="Yellow Flag"
                    subtitle={cast.content}
                />
            {:else if cast.type == "green_flag"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="success"
                    title="Green Flag"
                    subtitle="Track Clear"
                />
            {:else if cast.type == "sc"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="warning-alt"
                    title="Safety Car"
                    subtitle={cast.content}
                />
            {:else if cast.type == "vsc"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="warning-alt"
                    title="Virtual Safety Car"
                    subtitle={cast.content}
                />
            {:else if cast.type == "red_flag"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="error"
                    title="Red Flag"
                    subtitle="Session Suspended"
                />
            {:else if cast.type == "fia"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="info"
                    title="FIA"
                    subtitle={cast.content}
                />
            {:else if cast.type == "fia_rc"}
                <InlineNotification
                    lowContrast
                    hideCloseButton
                    kind="info-square"
                    title="FIA Race Control"
                    subtitle={cast.content}
                />
            {:else if cast.type == "warning"}
                <InlineNotification
                    hideCloseButton
                    kind="warning"
                    title={cast.title + ": Warning"}
                    subtitle={cast.content}
                />
            {:else if cast.type == "penalty"}
                <InlineNotification
                    hideCloseButton
                    kind="error"
                    title={cast.title}
                    subtitle={cast.content}
                />
            {/if}
        {/each}
    </div>
    <Toggle toggled={true} on:toggle={(dat)=>{
        var el = document.getElementById(purpose + "_cast_scroll");
        setInterval(() => {
            if (dat.detail.toggled || init) el.scrollTop = el.scrollHeight;
        }, 1000);
    }} labelText="Scroll down" />
    <script>
        
    </script>
    <hr />
</div>
