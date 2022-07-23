<script type="ts">
	import {
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		Content,
	} from "carbon-components-svelte";

	import Tab from "./HQuery/Tab.svelte";
	import TabGroup from "./HQuery/TabGroup.svelte";
	import TabLink from "./HQuery/TabLink.svelte";

	import Nav from "./Nav.svelte";

	import AdminInterface from "./pages/interfaces/AdminInterface.svelte";
	import DriverInterface from "./pages/interfaces/DriverInterface.svelte";
	import LoginInterface from "./pages/interfaces/LoginInterface.svelte";

	var config: {
		data: {
			teams: [{
				name: string, 
				token: string, 
				driver1: {
					name: string, 
					short: string, 
					number: string
				},
				driver2: {
					name: string, 
					short: string, 
					number: string
				}
			}],
			session: {
				status: string,
				type: string,
				laps: string,
				current_lap: string,
				info: string
			}
		}};

	const update = () => {
        const xhttp = new XMLHttpRequest();
	    xhttp.open("GET", "/data/all", false);
	    xhttp.send();
	    config = JSON.parse(xhttp.responseText);
    };
    setInterval(update, 1000);
    update();

	let user_info = {
		type:"null",
		token:"null",
		name: "",
	};

	/// <reference path="./HQuery/hQuery.js" />
</script>
<TabGroup tabgroup="content">
	<Tab tabid="login">
		<LoginInterface bind:user_info/>
	</Tab>
	<Tab tabid="dash@driver">
		<DriverInterface config={config} bind:user_info/>
	</Tab>
	<Tab tabid="dash@constructor">
		<Nav>
			<SideNavLink text="logged in as: Constructor" />
			<SideNavDivider/>
			<TabLink tabgroup="mainmenu@constructor" tabid="dash">
				<SideNavLink text="Dashboard" />
			</TabLink>
			<SideNavMenu text="Form As">
				<TabLink tabgroup="mainmenu@constructor" tabid="login@admin">
					<SideNavMenuItem text="Admin" />
				</TabLink>
				<TabLink tabgroup="mainmenu@constructor" tabid="login@constr">
					<SideNavMenuItem text="Constructor" />
				</TabLink>
				<TabLink tabgroup="mainmenu@constructor" tabid="login@driver">
					<SideNavMenuItem text="Driver" />
				</TabLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavLink text="Link 4" />
		</Nav>
		<Content>
			<TabGroup tabgroup="mainmenu@constructor">
				<Tab tabid="dash">
					<h1>Dashboard</h1>
				</Tab>
				<Tab tabid="login@admin" />
			</TabGroup>
		</Content>
	</Tab>
	<Tab tabid="dash@admin">
		<AdminInterface config = {config} bind:user_info/>
	</Tab>
</TabGroup>
