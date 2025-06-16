import { Centurion, CenturionLogLevel } from "@rbxts/centurion";

const server = Centurion.server({
	logLevel: CenturionLogLevel.Debug,
});

//loading all commands from the Commands folder
const commands_folder = script.Parent!.WaitForChild("Commands") as Folder;
server.registry.load(commands_folder);

server.start();
