import { CenturionType, Command, CommandContext, Group, Guard, Register } from "@rbxts/centurion";
import IsAdminGuard from "../Guards/IsAdminGuard";
import { Players } from "@rbxts/services";

@Register({ groups: [{ name: "Moderation" }] })
@Group("Moderation")
class ModerationCommands {
	@Command({
		name: "Ban",
		description: "Ban a player from the game",
		arguments: [
			{
				name: "Player",
				description: "Player to ban",
				type: CenturionType.Player,
			},
			{
				name: "Duration",
				description: "The duration of the ban (-1 for permanent ban)",
				type: CenturionType.Duration,
			},
			{
				name: "Reason",
				description: "The reason of the ban",
				type: CenturionType.String,
				optional: true,
			},
		],
	})
	@Guard(IsAdminGuard)
	Ban(ctx: CommandContext, player: Player, duration: -1, reason: "No reason provided") {
		Players.BanAsync({
			UserIds: [player.UserId],
			ApplyToUniverse: true,
			Duration: duration,
			DisplayReason: `You have been banned from ${ctx.executor.Name}`,
			PrivateReason: `Reason: ${reason}`,
		});
		if (duration === -1) {
			ctx.reply(`Successfully banned ${player.Name} permanently. Reason: ${reason}`);
		}
		ctx.reply(`Successfully banned ${player.Name} for ${duration}. Reason: ${reason}`);
	}
	@Command({
		name: "Kick",
		description: "Kick a player from the server",
		arguments: [
			{
				name: "Player",
				description: "Player to kick",
				type: CenturionType.Player,
			},
			{
				name: "Reason",
				description: "The reason of the kick",
				type: CenturionType.String,
				optional: true,
			},
		],
	})
	@Guard(IsAdminGuard)
	Kick(ctx: CommandContext, player: Player, reason: "No reason provided") {
		player.Kick(
			`You have been kicked from the server by ${ctx.executor.Name}. Reason: ${reason}. You can rejoin the server.`,
		);
	}
}
