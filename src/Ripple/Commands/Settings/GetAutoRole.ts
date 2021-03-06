import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { Role } from "../../Util";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getautorole";
        super(name, {
            aliases: [name, "currentjoinrole", "currentautorole", "getjoinrole"],
            cooldown: 3e3,
            description: "Returns the role applied to a user when they join."
        });
    }

    public async exec(msg: Message) {
        const roleID = await this.client.AutoRole.Get(msg);
        return msg.reply(
            this.client.Embed("Autorole")
                .setDescription(`The current role set for autorole is: ${roleID ? Role(roleID) : "None"}`)
        );
    }
}