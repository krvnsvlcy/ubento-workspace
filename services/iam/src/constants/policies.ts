import { ubentoAuth } from "@ubento/primitives";

export const policies = {
  [ubentoAuth.roles.root.user]: {
    permissions: [ubentoAuth.actions.team.create],
  },
  [ubentoAuth.roles.root.admin]: {
    permissions: ["*"],
    roles: [ubentoAuth.roles.root.user],
  },
  [ubentoAuth.roles.team.member]: {
    permissions: [
      // team
      ubentoAuth.actions.team.read,
      // app
      ubentoAuth.actions.app.create,
    ],
    roles: [ubentoAuth.roles.app.viewer],
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
    roles: [ubentoAuth.roles.team.member, ubentoAuth.roles.app.admin],
  },
  [ubentoAuth.roles.team.owner]: {
    permissions: [ubentoAuth.actions.team.delete],
    roles: [ubentoAuth.roles.team.admin],
  },
  [ubentoAuth.roles.app.viewer]: {
    permissions: [
      ubentoAuth.actions.app.read,
      ubentoAuth.actions.page.read,
      ubentoAuth.actions.page.list,
      ubentoAuth.actions.component.read,
      ubentoAuth.actions.component.list,
    ],
  },
  [ubentoAuth.roles.app.editor]: {
    permissions: [
      ubentoAuth.actions.app.update,
      ubentoAuth.actions.page.create,
      ubentoAuth.actions.page.update,
      ubentoAuth.actions.page.delete,
      ubentoAuth.actions.component.create,
      ubentoAuth.actions.component.update,
      ubentoAuth.actions.component.delete,
    ],
    roles: [ubentoAuth.roles.app.viewer],
  },
  [ubentoAuth.roles.app.admin]: {
    permissions: [],
    roles: [ubentoAuth.roles.app.editor],
  },
  [ubentoAuth.roles.app.owner]: {
    permissions: [ubentoAuth.actions.app.delete],
    roles: [ubentoAuth.roles.app.admin],
  },
};
