import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import RippleClient from "../../Ripple/Client";

export default class extends Command {
    public constructor() {
        const name = "autorole";
        super(name, {
            aliases: [name, "joinrole"],
            userPermissions: "MANAGE_ROLES",
            clientPermissions: "MANAGE_ROLES",
            cooldown: 3,
            description: {
                content: "Sets a role to be assigned upon a user joining.",
                usage: "<role?>"
            },
            args: [
                {
                    id: "role",
                    type: "role"
                }
            ],
        });
    }

    public async exec(msg: Message, { role }: { role: Role }) {
        const client = this.client as RippleClient;

        if (!role) {
            await client.Set(msg, "autorole", null);
            return msg.reply(
                client.Success()
                    .setDescription(`Successfully disabled autorole.`)
            );
        }

        return client.Set(msg, "autorole", role.id)
            .then(success => {
                if (success)
                    return msg.reply(
                        client.Success()
                            .setDescription(`Successfully set autorole to ${role}.`)
                    );
            }).catch(err => client.Logger.DatabaseError(msg, err));
    }
}