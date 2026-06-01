import { ubentoAuth } from "@ubento/services.primitives";

export const roles = {
  // Root level
  [ubentoAuth.roles.root.user]: {
    permissions: [ubentoAuth.actions.team.create],
  },
  [ubentoAuth.roles.root.admin]: {
    permissions: ["*"],
    roles: [ubentoAuth.roles.root.user],
  },
  // Public level
  [ubentoAuth.roles.public.guest]: {
    permissions: [
      ubentoAuth.actions.module.list,
      ubentoAuth.actions.module.read,
      ubentoAuth.actions.moduleCollection.list,
      ubentoAuth.actions.moduleCollection.read,
    ],
  },
  // Team level
  [ubentoAuth.roles.team.member]: {
    permissions: [
      // team
      ubentoAuth.actions.team.read,
      // app
      ubentoAuth.actions.workspace.list,
      ubentoAuth.actions.workspace.create,
      // modules
      ubentoAuth.actions.module.list,
      ubentoAuth.actions.module.source.read,
      ubentoAuth.actions.module.source.update,
      ubentoAuth.actions.module.create,
      ubentoAuth.actions.module.delete,
      ubentoAuth.actions.module.read,
      ubentoAuth.actions.module.update,
      // module collections
      ubentoAuth.actions.moduleCollection.list,
      ubentoAuth.actions.moduleCollection.read,
      ubentoAuth.actions.moduleCollection.create,
      ubentoAuth.actions.moduleCollection.update,
      ubentoAuth.actions.moduleCollection.delete,
    ],
    roles: [ubentoAuth.roles.workspace.viewer],
  },
  [ubentoAuth.roles.team.admin]: {
    permissions: [
      // team
      ubentoAuth.actions.team.update,
      // team invite
      ubentoAuth.actions.teamInvite.create,
      ubentoAuth.actions.teamInvite.list,
      ubentoAuth.actions.teamInvite.revoke,
      ubentoAuth.actions.teamInvite.read,
    ],
    roles: [ubentoAuth.roles.team.member, ubentoAuth.roles.workspace.admin],
  },
  [ubentoAuth.roles.team.owner]: {
    permissions: [ubentoAuth.actions.team.delete],
    roles: [ubentoAuth.roles.team.admin],
  },
  // Workspace level
  [ubentoAuth.roles.workspace.viewer]: {
    permissions: [
      ubentoAuth.actions.workspace.read,
      ubentoAuth.actions.board.read,
      ubentoAuth.actions.board.list,
      ubentoAuth.actions.component.read,
      ubentoAuth.actions.component.list,
    ],
  },
  [ubentoAuth.roles.workspace.editor]: {
    permissions: [
      ubentoAuth.actions.workspace.update,
      ubentoAuth.actions.board.create,
      ubentoAuth.actions.board.update,
      ubentoAuth.actions.board.delete,
      ubentoAuth.actions.component.create,
      ubentoAuth.actions.component.update,
      ubentoAuth.actions.component.delete,
    ],
    roles: [ubentoAuth.roles.workspace.viewer],
  },
  [ubentoAuth.roles.workspace.admin]: {
    permissions: [],
    roles: [ubentoAuth.roles.workspace.editor],
  },
  [ubentoAuth.roles.workspace.owner]: {
    permissions: [ubentoAuth.actions.workspace.delete],
    roles: [ubentoAuth.roles.workspace.admin],
  },
};
