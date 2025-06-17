import { CenturionType, Command, CommandContext, Group, Guard, Register } from "@rbxts/centurion";
import IsAdminGuard from "../Guards/IsAdminGuard";
import { Players } from "@rbxts/services";

@Register({ groups: [{ name: "Moderation" }] })
@Group("Moderation")
class ModerationCommands {
	@Command({
		name: "TempBan",
		description: "Ban a player temporaily from the game",
		aliases: ["Ban", "TimeBan"],
		arguments: [
			{
				name: "Player",
				description: "Player to ban",
				type: CenturionType.Player,
			},
			{
				name: "Duration",
				description: "The duration of the ban",
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
	Ban(ctx: CommandContext, player: Player, duration: number, reason: string) {
		Players.BanAsync({
			UserIds: [player.UserId],
			ApplyToUniverse: true,
			Duration: duration,
			DisplayReason: `You have been banned from ${ctx.executor.Name} for ${duration} seconds.`,
			PrivateReason: `Reason: ${reason}`,
		});
		ctx.reply(`Successfully banned ${player.Name} for ${duration} seconds. Reason: ${reason}`);
	}
	@Command({
		name: "PermanentBan",
		description: "Ban a player from the game",
		aliases: ["pBan"],
		arguments: [
			{
				name: "Player",
				description: "Player to ban",
				type: CenturionType.Player,
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
	PermanentBan(ctx: CommandContext, player: Player, reason: string) {
		Players.BanAsync({
			UserIds: [player.UserId],
			ApplyToUniverse: true,
			Duration: -1,
			DisplayReason: `You have been banned permanently from ${ctx.executor.Name}`,
			PrivateReason: `Reason: ${reason}`,
		});
		ctx.reply(`Successfully banned ${player.Name} permanently. Reason: ${reason}`);
	}
	@Command({
		name: "Unban",
		description: "Unban a player from the game",
		arguments: [
			{
				name: "Player",
				description: "Player to unban",
				type: CenturionType.Player,
			},
		],
	})
	@Guard(IsAdminGuard)
	Unban(ctx: CommandContext, player: Player) {
		Players.UnbanAsync({
			UserIds: [player.UserId],
			ApplyToUniverse: true,
		});
		ctx.reply(`Successfully unbanned ${player.Name}`);
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
	Kick(ctx: CommandContext, player: Player, reason: string) {
		player.Kick(
			`You have been kicked from the server by ${ctx.executor.Name}. Reason: ${reason}. You can rejoin the server.`,
		);
	}
}
