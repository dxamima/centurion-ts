import { CommandContext } from "@rbxts/centurion";

export const AllowedUserIDs = [3284442274, 154769185];
export default function IsAdminGuard(ctx: CommandContext) {
	const executor: Player = ctx.executor;

	for (const userID of AllowedUserIDs) {
		if (executor.UserId === userID) {
			return true;
		}
	}
	ctx.error("You do not have permission to execute this command!");
	return false;
}
