import { Story, Group } from "@storybook/api/dist/ts3.9/lib/stories";

export const getColorControls = (data: Story | Group, additionalApplyColorTo: string[]) => {
	const argTypes = (data.parameters as Record<string, any>)?.argTypes;
	const argTypesArray = Object.entries(argTypes);

	if (!argTypesArray.length) {
		return
	}

	const filteredArgTypes = argTypesArray.filter(arg =>
		(arg[1] as Record<string, any>).control?.type === 'color'
	);
	const colorControls = filteredArgTypes.map(arg => arg[0]);

	if (additionalApplyColorTo?.length) {
		const storyControls = argTypesArray.map(arg => arg[0]);
		const filteredAdditional = additionalApplyColorTo.filter(a =>
			storyControls.includes(a) && argTypes[a].control?.type === 'text'
		);

		const extendedControls = new Set(colorControls.concat(filteredAdditional));
		return Array.from(extendedControls);
	}

	return colorControls
}