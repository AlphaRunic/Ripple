"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSystemManager = exports.ChatFilterManager = exports.AFKManager = exports.PurgeManager = exports.EconomyManager = exports.TimeQueueManager = exports.BankManager = exports.CashManager = exports.TagManager = exports.WelcomeChannelManager = exports.UserBlacklistManager = exports.ReputationManager = exports.PrestigeRoleManager = exports.PremiumManager = exports.PrefixManager = exports.NotesManager = exports.ModLogsManager = exports.ModLogIDManager = exports.ModLogsChannelManager = exports.LevelSystemManager = exports.LevelUpChannelManager = exports.LevelManager = exports.InfractionManager = exports.GoodbyeChannelManager = exports.EditSniperManager = exports.DeleteSniperManager = exports.CommandChannelManager = exports.ChatReviveRoleManager = exports.AutoWelcomeManager = exports.AutoGoodbyeManager = exports.AutoRoleManager = void 0;
const ReputationManager_1 = require("./Managers/GuildMember/ReputationManager");
Object.defineProperty(exports, "ReputationManager", { enumerable: true, get: function () { return ReputationManager_1.ReputationManager; } });
const PrefixManager_1 = require("./Managers/Guild/PrefixManager");
Object.defineProperty(exports, "PrefixManager", { enumerable: true, get: function () { return PrefixManager_1.PrefixManager; } });
const AutoWelcomeManager_1 = require("./Managers/Guild/AutoWelcomeManager");
Object.defineProperty(exports, "AutoWelcomeManager", { enumerable: true, get: function () { return AutoWelcomeManager_1.AutoWelcomeManager; } });
const AutoRoleManager_1 = require("./Managers/Guild/AutoRoleManager");
Object.defineProperty(exports, "AutoRoleManager", { enumerable: true, get: function () { return AutoRoleManager_1.AutoRoleManager; } });
const PremiumManager_1 = require("./Managers/User/PremiumManager");
Object.defineProperty(exports, "PremiumManager", { enumerable: true, get: function () { return PremiumManager_1.PremiumManager; } });
const LevelManager_1 = require("./Managers/GuildMember/LevelManager");
Object.defineProperty(exports, "LevelManager", { enumerable: true, get: function () { return LevelManager_1.LevelManager; } });
const NotesManager_1 = require("./Managers/User/NotesManager");
Object.defineProperty(exports, "NotesManager", { enumerable: true, get: function () { return NotesManager_1.NotesManager; } });
const InfractionManager_1 = require("./Managers/GuildMember/InfractionManager");
Object.defineProperty(exports, "InfractionManager", { enumerable: true, get: function () { return InfractionManager_1.InfractionManager; } });
const LevelUpChannelManager_1 = require("./Managers/Guild/LevelUpChannelManager");
Object.defineProperty(exports, "LevelUpChannelManager", { enumerable: true, get: function () { return LevelUpChannelManager_1.LevelUpChannelManager; } });
const WelcomeChannelManager_1 = require("./Managers/Guild/WelcomeChannelManager");
Object.defineProperty(exports, "WelcomeChannelManager", { enumerable: true, get: function () { return WelcomeChannelManager_1.WelcomeChannelManager; } });
const LevelSystemManager_1 = require("./Managers/Guild/LevelSystemManager");
Object.defineProperty(exports, "LevelSystemManager", { enumerable: true, get: function () { return LevelSystemManager_1.LevelSystemManager; } });
const ChatReviveRoleManager_1 = require("./Managers/Guild/ChatReviveRoleManager");
Object.defineProperty(exports, "ChatReviveRoleManager", { enumerable: true, get: function () { return ChatReviveRoleManager_1.ChatReviveRoleManager; } });
const PrestigeRoleManager_1 = require("./Managers/GuildRole/PrestigeRoleManager");
Object.defineProperty(exports, "PrestigeRoleManager", { enumerable: true, get: function () { return PrestigeRoleManager_1.PrestigeRoleManager; } });
const CommandChannelManager_1 = require("./Managers/Guild/CommandChannelManager");
Object.defineProperty(exports, "CommandChannelManager", { enumerable: true, get: function () { return CommandChannelManager_1.CommandChannelManager; } });
const DeleteSniperManager_1 = require("./Managers/GuildChannel/DeleteSniperManager");
Object.defineProperty(exports, "DeleteSniperManager", { enumerable: true, get: function () { return DeleteSniperManager_1.DeleteSniperManager; } });
const EditSniperManager_1 = require("./Managers/GuildChannel/EditSniperManager");
Object.defineProperty(exports, "EditSniperManager", { enumerable: true, get: function () { return EditSniperManager_1.EditSniperManager; } });
const UserBlacklistManager_1 = require("./Managers/GuildMember/UserBlacklistManager");
Object.defineProperty(exports, "UserBlacklistManager", { enumerable: true, get: function () { return UserBlacklistManager_1.UserBlacklistManager; } });
const ModLogsManager_1 = require("./Managers/Guild/ModLogsManager");
Object.defineProperty(exports, "ModLogsManager", { enumerable: true, get: function () { return ModLogsManager_1.ModLogsManager; } });
const ModLogsChannelManager_1 = require("./Managers/Guild/ModLogsChannelManager");
Object.defineProperty(exports, "ModLogsChannelManager", { enumerable: true, get: function () { return ModLogsChannelManager_1.ModLogsChannelManager; } });
const ModLogIDManager_1 = require("./Managers/Guild/ModLogIDManager");
Object.defineProperty(exports, "ModLogIDManager", { enumerable: true, get: function () { return ModLogIDManager_1.ModLogIDManager; } });
const GoodbyeChannelManager_1 = require("./Managers/Guild/GoodbyeChannelManager");
Object.defineProperty(exports, "GoodbyeChannelManager", { enumerable: true, get: function () { return GoodbyeChannelManager_1.GoodbyeChannelManager; } });
const AutoGoodbyeManager_1 = require("./Managers/Guild/AutoGoodbyeManager");
Object.defineProperty(exports, "AutoGoodbyeManager", { enumerable: true, get: function () { return AutoGoodbyeManager_1.AutoGoodbyeManager; } });
const TagManager_1 = require("./Managers/Guild/TagManager");
Object.defineProperty(exports, "TagManager", { enumerable: true, get: function () { return TagManager_1.TagManager; } });
const CashManager_1 = require("./Managers/GuildMember/CashManager");
Object.defineProperty(exports, "CashManager", { enumerable: true, get: function () { return CashManager_1.CashManager; } });
const BankManager_1 = require("./Managers/GuildMember/BankManager");
Object.defineProperty(exports, "BankManager", { enumerable: true, get: function () { return BankManager_1.BankManager; } });
const TimeQueueManager_1 = require("./Managers/GuildMember/TimeQueueManager");
Object.defineProperty(exports, "TimeQueueManager", { enumerable: true, get: function () { return TimeQueueManager_1.TimeQueueManager; } });
const EconomyManager_1 = require("./Managers/Guild/EconomyManager");
Object.defineProperty(exports, "EconomyManager", { enumerable: true, get: function () { return EconomyManager_1.EconomyManager; } });
const PurgeManager_1 = require("./Managers/Guild/PurgeManager");
Object.defineProperty(exports, "PurgeManager", { enumerable: true, get: function () { return PurgeManager_1.PurgeManager; } });
const AFKManager_1 = require("./Managers/GuildMember/AFKManager");
Object.defineProperty(exports, "AFKManager", { enumerable: true, get: function () { return AFKManager_1.AFKManager; } });
const ChatFilterManager_1 = require("./Managers/Guild/ChatFilterManager");
Object.defineProperty(exports, "ChatFilterManager", { enumerable: true, get: function () { return ChatFilterManager_1.ChatFilterManager; } });
const FilterSystemManager_1 = require("./Managers/Guild/FilterSystemManager");
Object.defineProperty(exports, "FilterSystemManager", { enumerable: true, get: function () { return FilterSystemManager_1.FilterSystemManager; } });
