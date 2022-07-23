<script type="ts">
    import { 
        Column, 
        Content, 
        Grid, 
        InlineNotification, 
        Row, 
        SideNavDivider, 
        SideNavLink, 
        SideNavMenu, 
        SideNavMenuItem, 
        StructuredList, 
        StructuredListBody, 
        StructuredListCell, 
        StructuredListHead, 
        StructuredListRow, 
Toggle
    } from "carbon-components-svelte";
import { each } from "svelte/internal";

    import Tab from "../../HQuery/Tab.svelte";
    import TabGroup from "../../HQuery/TabGroup.svelte";
    import TabLink from "../../HQuery/TabLink.svelte";
    import Nav from "../../Nav.svelte";
import CastScreen from "../CastScreen.svelte";

    export let config;
    export let user_info;

    var driver_data = {
        driver: {
            name: "", 
            short: "", 
            number: "", 
            team: "", 
            token: ""
        }
    };
    
    $: if (user_info.type == "driver") {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/data/driver/" + user_info.token, false);
        xhttp.send();

        driver_data = JSON.parse(xhttp.responseText);
    }
</script>

<Nav>
    <SideNavLink text="logged in as: Driver" />
    <SideNavLink text={`User: ${driver_data.driver.name} (${driver_data.driver.short} / ${driver_data.driver.number})`} />
    <SideNavDivider/>
    <TabLink tabgroup="mainmenu@driver" tabid="dash">
        <SideNavLink text="Dashboard" />
    </TabLink>
    <SideNavMenu text="Dashboard Layouts">
        <TabLink tabgroup="mainmenu@driver" tabid="dash@1">
            <SideNavMenuItem text="Layout 1" />
        </TabLink>
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink text="Link 4" />
</Nav>
<Content>
    <TabGroup tabgroup="mainmenu@driver">
        <Tab tabid="dash">
            <h2>Dashboard</h2>

        </Tab>
        <Tab tabid="dash@1">
            <Grid>
                <Row>
                    <Column>
                        <hr>
                        <span>Session: {config.data.session.type.toUpperCase()}</span><br>
                          <span>Session Status: {config.data.session.status}</span><br>
                        <span>Laps: {config.data.session.current_lap + "/" + config.data.session.laps}</span><br>
                          <span>Info Status: {config.data.session.info}</span>
                        <hr>
                    </Column>
                    <Column/>
                    <Column/>
                </Row>
                <Row>
                    <Column>
                        <CastScreen bind:config purpose="drivermenu"/>
                    </Column>
                </Row>
            </Grid>
        </Tab>
    </TabGroup>
</Content>