export enum ColumnId {
  User = 1,
  Group = 2,
  UserGroup = 3,
}

export interface ColumnDefinition {
  columnId: number;
  columnHeader: Array<string>;
  columnDataAlias: Object;
  filterable: boolean;
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

export const columnDefinition: ColumnDefinition[] = [
  {
    columnId: ColumnId.User,
    columnHeader: [
      'User Id',
      'First Name',
      'Last Name',
      'Login Name',
      'Password',
      'Email',
    ],
    columnDataAlias: '',
    filterable: true,
  },
  {
    columnId: ColumnId.Group,
    columnHeader: ['Group Id', 'Group Name', 'Description'],
    columnDataAlias: '',
    filterable: true,
  },
  {
    columnId: ColumnId.UserGroup,
    columnHeader: ['User Id', 'Group Id', 'Date of Relationship Creation'],
    columnDataAlias: '',
    filterable: true,
  },
];
