import { TextChannel } from "discord.js";
import { GuildChannelDataManager } from "../../Base/GuildChannelDataManager.ts";
import { Snipe } from "../../../DataInterfaces/Snipe";
import Ripple from "../../../../Client";

export class EditSniperManager implements GuildChannelDataManager<Snipe> {
    public readonly Tag = "editsniper"

    public constructor(
        public Client: Ripple
    ) {}

    public async Get(channel: TextChannel): Promise<Snipe> {
        return this.Client.Get(channel, this.Tag, undefined);
    }

    public async Set(channel: TextChannel, value: Snipe): Promise<boolean> {
        return this.Client.Set(channel, this.Tag, value);
    }
}