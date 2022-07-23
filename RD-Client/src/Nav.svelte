<script type="ts">
    import {
		Header,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
	} from "carbon-components-svelte";
    let isSideNavOpen = false;
</script>

<Header
	company="Kingsoft"
	platformName="FIA - Race Director Client"
	bind:isSideNavOpen
>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<slot></slot>
	</SideNavItems>
</SideNav>