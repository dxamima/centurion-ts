import { Centurion } from "@rbxts/centurion";
import { CenturionUI } from "@rbxts/centurion-ui";

const client = Centurion.client({
	shortcutsEnabled: true,
});

client
	.start()
	.then(() => {
		CenturionUI.start(Centurion.client(), {});
	})
	.catch((error_message) => {
		warn("Failed to start Centurion client:", error_message);
	});
