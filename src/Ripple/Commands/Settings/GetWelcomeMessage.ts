import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Ripple from "../../Client";

export default class extends Command<Ripple> {
    public constructor() {
        const name = "getwelcomemessage";
        super(name, {
            aliases: [name, "currentwelcomemessage", "currentwelcomemsg", "getwelcomemsg",  "getautowelcome"],
            userPermissions: "MANAGE_GUILD",
            clientPermissions: "MANAGE_GUILD",
            cooldown: 3e3,
            description: "Returns the welcome message said when a user joins the server.",
        });
    }

    public async exec(msg: Message) {
        return this.client.WelcomeMessage.Get(msg, "Welcome message is disabled for this server.")
            .then(welcomeMessage => msg.reply(
                this.client.Embed(`Welcome Message In \`${msg.guild.name}\``)
                    .setDescription(welcomeMessage)
            ));
    }
}