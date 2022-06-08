import { GuildObject } from "../../../../Util";
import { GuildDataManager } from "../../Base/GuildDataManager";
import Ripple from "../../../../Client";

export class LevelUpChannelManager implements GuildDataManager<string> {
    public Tag = "levelupchannel";

    public constructor(
        public readonly Client: Ripple
    ) {}

    public async Get(m: GuildObject): Promise<string> {
        return this.Client.Get<string>(m, this.Tag, undefined);
    }

    public async Set(m: GuildObject, value: string): Promise<boolean> {
        return this.Client.Set(m, this.Tag, value);
    }
}