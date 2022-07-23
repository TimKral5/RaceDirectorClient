<script type="ts">
    import { Content, PasswordInput, SideNavDivider, SideNavLink, SideNavMenu, SideNavMenuItem, TextInput } from "carbon-components-svelte";
    import Tab from "../../HQuery/Tab.svelte";
    import TabGroup from "../../HQuery/TabGroup.svelte";

    import TabLink from "../../HQuery/TabLink.svelte";

    import Nav from "../../Nav.svelte";
    import Form from "../Form.svelte";

    export let user_info;
</script>

<Nav>
    <TabLink tabgroup="mainmenu" tabid="dash">
        <SideNavLink text="Dashboard" />
    </TabLink>
    <SideNavMenu text="Login As">
        <TabLink tabgroup="mainmenu" tabid="login@admin">
            <SideNavMenuItem text="Admin" />
        </TabLink>
        <TabLink tabgroup="mainmenu" tabid="login@constr">
            <SideNavMenuItem text="Constructor" />
        </TabLink>
        <TabLink tabgroup="mainmenu" tabid="login@driver">
            <SideNavMenuItem text="Driver" />
        </TabLink>
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink text="Link 4" />
</Nav>
<Content>
    <TabGroup tabgroup="mainmenu">
        <Tab tabid="dash">
            <h1>Dashboard</h1>
        </Tab>
        <Tab tabid="login@admin">
            <!-- svelte-ignore missing-declaration -->
            <Form onsubmit={(values) => {
                var token = "";
                    values.forEach((x) => {
                        if (x.name == "token") token = x.value;
                    });
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/login/admin/" + token, false);
                    xhttp.send();

                    console.log(xhttp.responseText);
                    if (xhttp.responseText == "succeeded") {
                        $: user_info.type = "admin";
                        $: user_info.token = token;
                        hq_setActiveTab("content", "dash@admin");
                    }
                    console.log(values);
                }}>
                <h2>Login as Admin:</h2>
            </Form>
        </Tab>
        <Tab tabid="login@constr">
            <!-- svelte-ignore missing-declaration -->
            <Form
                onsubmit={(values) => {
                    var token = "";
                    values.forEach((x) => {
                        if (x.name == "token") token = x.value;
                    });
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/login/constructor/" + token, false);
                    xhttp.send();

                    console.log(xhttp.responseText);
                    if (xhttp.responseText == "succeeded") {
                        $: user_info.type = "constructor";
                        $: user_info.token = token;
                        hq_setActiveTab("content", "dash@constructor");
                    }
                    console.log(values);
                }}>
                <h2>Login as Constructor:</h2>
            </Form>
        </Tab>
        <Tab tabid="login@driver">
            <!-- svelte-ignore missing-declaration -->
            <Form
                onsubmit={(values) => {
                    var token = "";
                    values.forEach((x) => {
                        if (x.name == "token") token = x.value;
                    });
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/login/driver/" + token, false);
                    xhttp.send();

                    console.log(xhttp.responseText);
                    if (xhttp.responseText == "succeeded") {
                        $: user_info.type = "driver";
                        $: user_info.token = token;
                        hq_setActiveTab("content", "dash@driver");
                    }
                    console.log(values);
                }}>
                <h2>Login as Driver:</h2>
            </Form>
        </Tab>
    </TabGroup>
</Content>