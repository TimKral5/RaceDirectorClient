<script type="ts">
    import { Button, Column, Content, Grid, ListItem, Row, SideNavDivider, SideNavLink, SideNavMenu, SideNavMenuItem, StructuredList, StructuredListBody, StructuredListCell, StructuredListRow, TextInput, TextInputSkeleton, UnorderedList } from "carbon-components-svelte";
    import Tab from "../../HQuery/Tab.svelte";
    import TabGroup from "../../HQuery/TabGroup.svelte";
    import TabLink from "../../HQuery/TabLink.svelte";

    import Nav from "../../Nav.svelte";
import CastScreen from "../CastScreen.svelte";
import EmptyForm from "../EmptyForm.svelte";
    import Form from "../Form.svelte";

    export let config;
    export let user_info;
    
    var admin_data = {
        teams: [{
            token: "",
            obj: {
                name: "",
                driver1:{
                    name: "",
                    short: "",
                    number: ""
                },
                driver2:{
                    name: "",
                    short: "",
                    number: ""
                }
            }
        }],
        drivers: [{
            name: "", 
            short: "", 
            number: "", 
            team: "", 
            token: ""
        }]
    };

    $: if (user_info.type == "admin") {
        setInterval(() => {
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", "/data/admindata/" + user_info.token, false);
            xhttp.send();

            admin_data = JSON.parse(xhttp.responseText);
        }, 1000);
    }

    function print_form_feedback(bool: boolean) {
		document.querySelectorAll(".form_feedback").forEach(y=>{
			if (bool) {
				y.setAttribute("style", "color: green");
				y.innerHTML = "Request succeeded!";
				setTimeout(() => y.innerHTML = "", 2000);
			}
			else {
				y.setAttribute("style", "color: red");
				y.innerHTML = "Request failed!";
				setTimeout(() => y.innerHTML = "", 2000);
			}					
		});
	}
</script>

<Nav>
    <SideNavLink text="logged in as: Admin" />
    <SideNavDivider/>
    <TabLink tabgroup="mainmenu@admin" tabid="dash">
        <SideNavLink text="Dashboard" />
    </TabLink>
    <TabLink tabgroup="mainmenu@admin" tabid="actionmenu">
        <SideNavLink text="Action-Menu" />
    </TabLink>
    <SideNavMenu text="Data">
        <TabLink tabgroup="mainmenu@admin" tabid="register@team">
            <SideNavMenuItem text="Register new Team" />
        </TabLink>
        <TabLink tabgroup="mainmenu@admin" tabid="set@session_data">
            <SideNavMenuItem text="Set Session Data" />
        </TabLink>
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink text="Link 4" />
</Nav>
<Content>
    <TabGroup tabgroup="mainmenu@admin">
        <Tab tabid="dash">
            <h2>Dashboard</h2>
            <StructuredList>
                <StructuredListBody>
                      <StructuredListRow>
                        <StructuredListCell noWrap>Session</StructuredListCell>
                        <StructuredListCell>
                              <span>Session: {config.data.session.type.toUpperCase()}</span><br>
                              <span>Session Status: {config.data.session.status}</span><br>
                              <span>Laps: {config.data.session.current_lap + "/" + config.data.session.laps}</span><br>
                              <span>Info Status: {config.data.session.info}</span>
                        </StructuredListCell>
                      </StructuredListRow>
                      <StructuredListRow>
                        <StructuredListCell noWrap>Teams</StructuredListCell>
                        <StructuredListCell>
                            <UnorderedList>
                                {#each admin_data.teams as team}
                                    <ListItem>{team.obj.name} [{team.token}]: <br>
                                        Driver 1: {team.obj.driver1.name} ({team.obj.driver1.short} / {team.obj.driver1.number}) <br>
                                        Driver 2: {team.obj.driver2.name} ({team.obj.driver2.short} / {team.obj.driver2.number})
                                    </ListItem>
                                {/each}
                            </UnorderedList>
                        </StructuredListCell>
                      </StructuredListRow>
                      <StructuredListRow>
                        <StructuredListCell noWrap>Drivers</StructuredListCell>
                        <StructuredListCell>
                            {#each admin_data.drivers as driver}
                            <ListItem>({driver.team}): {driver.name} ({driver.short} / {driver.number}) [{driver.token}]</ListItem>
                            {/each}
                        </StructuredListCell>
                      </StructuredListRow>
                </StructuredListBody>
            </StructuredList>
            <hr>
            <CastScreen bind:config purpose="admindash"/>
        </Tab>
        <Tab tabid="register@team">
            <h1>Register new Team</h1>
            <!-- svelte-ignore missing-declaration -->
            <Form token={user_info.token} onsubmit={(values) => {
                    var token = "";
                    var team_name = "";
                    var team_token = "";

                    var driver1_name = "";
                    var driver1_short = "";
                    var driver1_number = "";
                    var driver1_token = "";

                    var driver2_name = "";
                    var driver2_short = "";
                    var driver2_number = "";
                    var driver2_token = "";


                    values.forEach((x) => {
                        if (x.name == "token") token = x.value;
                        if (x.name == "team-name") team_name = x.value;
                        if (x.name == "team-token") team_token = x.value;

                        if (x.name == "driver1-name") driver1_name = x.value;
                        if (x.name == "driver1-short") driver1_short = x.value;
                        if (x.name == "driver1-number") driver1_number = x.value;
                        if (x.name == "driver1-token") driver1_token = x.value;

                        if (x.name == "driver2-name") driver2_name = x.value;
                        if (x.name == "driver2-short") driver2_short = x.value;
                        if (x.name == "driver2-number") driver2_number = x.value;
                        if (x.name == "driver2-token") driver2_token = x.value;
                    });
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("GET", "/data/" + token + "/add/team/" + team_name + "/" + team_token + "/" + 
                    driver1_name + "/" + driver1_short + "/" + driver1_number + "/" + driver1_token + "/" + 
                    driver2_name + "/" + driver2_short + "/" + driver2_number + "/" + driver2_token, 
                    false);
                    xhttp.send();

                    console.log("create team: " + xhttp.responseText);

                    print_form_feedback(xhttp.responseText == "succeeded");

                    console.log(values);
                }}>
                <TextInput
                    class="data-input"
                    name="team-name"
                    labelText="Name"
                    placeholder="Enter new Team-Name..."
                />
                <TextInput
                    class="data-input"
                    name="team-token"
                    labelText="Team-Token"
                    placeholder="Enter new Team-Token..."
                />
                <hr>
                <h3>Driver 1</h3>
                <TextInput
                    class="data-input"
                    name="driver1-name"
                    labelText="Name"
                    placeholder="Enter new Driver-Name..."
                />
                <TextInput
                    class="data-input"
                    name="driver1-short"
                    labelText="Short"
                    placeholder="Enter new Driver-Short..."
                />
                <TextInput
                    class="data-input"
                    name="driver1-number"
                    labelText="Number"
                    placeholder="Enter new Driver-Number..."
                />
                <TextInput
                    class="data-input"
                    name="driver1-token"
                    labelText="Token"
                    placeholder="Enter new Driver-Token..."
                />
                <hr>
                <h3>Driver 2</h3>
                <TextInput
                    class="data-input"
                    name="driver2-name"
                    labelText="Name"
                    placeholder="Enter new Driver-Name..."
                />
                <TextInput
                    class="data-input"
                    name="driver2-short"
                    labelText="Short"
                    placeholder="Enter new Driver-Short..."
                />
                <TextInput
                    class="data-input"
                    name="driver2-number"
                    labelText="Number"
                    placeholder="Enter new Driver-Number..."
                />
                <TextInput
                    class="data-input"
                    name="driver2-token"
                    labelText="Token"
                    placeholder="Enter new Driver-Token..."
                />
                <span class="form_feedback" style="color: green;"></span>
            </Form>
        </Tab>
        <Tab tabid="set@session_data">
            <script>
                var data = {};
            </script>
            <h1>Set Session-Data</h1>
            <!-- svelte-ignore missing-declaration -->
            <Form token={user_info.token} onsubmit={(_values) => {
                    var token = "";
                    var keys = [];
                    var values = [];
                    _values.forEach((x) => {

                        if (x.value != "") switch (x.name) {
                            case "token":
                                token = x.value;
                                break;
                            case "session-status":
                                keys.push("status");
                                values.push(x.value);
                                break;
                            case "session-type":
                                keys.push("type");
                                values.push(x.value);
                                break;
                            case "session-laps":
                                keys.push("laps");
                                values.push(x.value);
                                break;
                            case "session-clap":
                                keys.push("current_lap");
                                values.push(x.value);
                                break;
                            case "session-info":
                                keys.push("info");
                                values.push(x.value);
                                break;
                        }
                    });

                    var res = true;

                    for (let i = 0; i < keys.length; i++) {
                        const key = keys[i];
                        const value = values[i];
                        const xhttp = new XMLHttpRequest();
                        xhttp.open("GET", "/data/" + token + "/set/session/" + key + "/" + value, false);
                        xhttp.send();
                        if (xhttp.responseText != "succeeded") res = false;
                    }

                    print_form_feedback(res);

                    //update();
                }}>
                <TextInput
                    class="data-input"
                    name="session-status"
                    labelText="Status"
                    placeholder="Enter new Session-Status..."
                />
                <h6>current: {config.data.session.status}</h6>
                <TextInput
                    class="data-input"
                    name="session-type"
                    labelText="Type"
                    placeholder="Enter new Session-Type..."
                />
                <h6>current: {config.data.session.type}</h6>
                <TextInput
                    class="data-input"
                    name="session-laps"
                    labelText="Laps"
                    placeholder="Enter new Session-Lap-length..."
                />
                <h6>current: {config.data.session.laps}</h6>
                <TextInput
                    class="data-input"
                    name="session-clap"
                    labelText="Current Lap"
                    placeholder="Enter new Current-Lap Value..."
                />
                <h6>current: {config.data.session.current_lap}</h6>
                <TextInput
                    class="data-input"
                    name="session-info"
                    labelText="Session Info"
                    placeholder="Enter new Session-Info-String..."
                />
                <h6>current: {config.data.session.info}</h6>
                <br>
                <span class="form_feedback" style="color: green;"></span>
            </Form>
        </Tab>
        <Tab tabid="actionmenu">
            <Grid>
                <Row>
                    <Column>
                        <h4>Session-Status: </h4>
                    </Column>
                </Row>
                <hr>
                <Row>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            var sectors = "";
                            values.forEach((x) => {
                                if (x.name == "yf-sectors") sectors = x.value;
                            });
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/yellow_flag//" + sectors, false);
                            xhttp.send();
                        }}>
                            <h4>Yellow Flag:</h4>
                            <TextInput 
                                class="data-input"
                                name="yf-sectors"
                                labelText="Sectors"
                                placeholder="Enter involved Sectors"
                            />
                        </EmptyForm>
                    </Column>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/green_flag//", false);
                            xhttp.send();
                        }}>
                            <h4>Green Flag:</h4>
                            <TextInputSkeleton/>
                        </EmptyForm>
                    </Column>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/red_flag//", false);
                            xhttp.send();
                        }}>
                            <h4>Red Flag:</h4>
                            <TextInputSkeleton/>
                        </EmptyForm>
                    </Column>
                </Row>
                <hr>
                <Row>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            var content = "";

                            function replace(self, str, val) {
                                var parts = self.split(str);
                                var res = parts[0];
                                for (let i = 1; i < parts.length; i++) {
                                    const part = parts[i];
                                    res += val + part;
                                }
                                return res;
                            }

                            values.forEach((x) => {
                                if (x.name == "sc-content") content = replace(x.value, " ", "%20");
                            });
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/sc//" + content, false);
                            xhttp.send();
                        }}>
                            <h4>Safety Car:</h4>
                            <TextInput 
                                class="data-input"
                                name="sc-content"
                                labelText="Speedlimit"
                                placeholder="Speedlimit & additional Information"
                            />
                        </EmptyForm>
                    </Column>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            var content = "";
                            values.forEach((x) => {
                                if (x.name == "vsc-content") content = x.value;
                            });
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/vsc//" + content, false);
                            xhttp.send();
                        }}>
                            <h4>Virtual Safety Car:</h4>
                            <TextInput 
                                class="data-input"
                                name="vsc-content"
                                labelText="Speedlimit"
                                placeholder="Speedlimit & additional Information"
                            />
                        </EmptyForm>
                    </Column>
                </Row>
                <hr>
                <Row>
                    <Column>
                        <h4>Penalties:</h4>
                    </Column>
                </Row>
                <hr>
                <Row>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            var content = "";
                            var target = "";
                            values.forEach((x) => {
                                if (x.name == "warning-content") content = x.value;
                                if (x.name == "warning-target") target = x.value;
                            });
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/warning/" + target + "/" + content, false);
                            xhttp.send();
                        }}>
                            <h4>Warning: </h4>
                            <Grid>
                                <Row>
                                    <Column>
                                        <TextInput 
                                            class="data-input"
                                            name="warning-target"
                                            labelText="Target"
                                            placeholder="Enter Target..."
                                        />
                                    </Column>
                                    <Column>
                                        <TextInput 
                                            class="data-input"
                                            name="warning-content"
                                            labelText="Reason"
                                            placeholder="Enter Explanation..."
                                        />
                                    </Column>
                                </Row>
                            </Grid>
                        </EmptyForm>
                    </Column>
                    <Column>
                        <!-- svelte-ignore missing-declaration -->
                        <EmptyForm onsubmit={(values) => {
                            var content = "";
                            var reason = "";
                            values.forEach((x) => {
                                if (x.name == "penalty-content") content = x.value;
                                if (x.name == "penalty-reson") reason = x.value;
                            });
                            const xhttp = new XMLHttpRequest();
                            xhttp.open("GET", "/admin/broadcast/" + user_info.token + "/penalty/" + content + "/" + reason, false);
                            xhttp.send();
                        }}>
                            <h4>penalty: </h4>
                            <Grid>
                                <Row>
                                    <Column>
                                        <TextInput 
                                            class="data-input"
                                            name="penalty-content"
                                            labelText="Penalty"
                                            placeholder="Enter Penalty..."
                                        />
                                    </Column>
                                    <Column>
                                        <TextInput 
                                            class="data-input"
                                            name="penalty-reason"
                                            labelText="Reason"
                                            placeholder="Enter Explanation..."
                                        />
                                    </Column>
                                </Row>
                            </Grid>
                        </EmptyForm>
                    </Column>
                </Row>
            </Grid>
        </Tab>
    </TabGroup>
</Content>