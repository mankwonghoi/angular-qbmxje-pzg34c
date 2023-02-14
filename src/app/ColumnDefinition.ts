export enum TabId {
  User = 1,
  Group = 2,
  UserGroup = 3,
}

export interface Group {
  groupId: string;
  groupName: string;
  description: string;
}

export interface UserAccess {
  userId: string;
  groupId: string;
  dateOfRelationshipCreation: string;
}

export const columnDefinition: any[] = [
  {
    tabId: TabId.User,
    columnId: 'userId',
    columnHeader: 'User Id',
    columnDataAlias: '',
    filterable: true,
  },
  {
    tabId: TabId.User,
    columnId: 'firstName',
    columnHeader: 'First Name',
    columnDataAlias: '',
    filterable: true,
  },
  {
    tabId: TabId.User,
    columnId: 'LastName',
    columnHeader: 'Last Name',
    columnDataAlias: '',
    filterable: true,
  },
  {
    tabId: TabId.User,
    columnId: 'LoginName',
    columnHeader: 'Login Name',
    columnDataAlias: '',
    filterable: true,
  },
  {
    tabId: TabId.User,
    columnId: 'password',
    columnHeader: 'Password',
    columnDataAlias: '',
    filterable: false,
  },
  {
    tabId: TabId.User,
    columnId: 'email',
    columnHeader: 'Email',
    columnDataAlias: '',
    filterable: true,
  },
];
