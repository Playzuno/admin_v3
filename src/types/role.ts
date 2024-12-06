export interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface RolePermissions {
  viewRole: boolean;
  modifyRole: boolean;
  deleteRole: boolean;
  addNewRole: boolean;
  viewProduct: boolean;
  modifyProduct: boolean;
  deleteProduct: boolean;
  addProduct: boolean;
}

export interface Role {
  id: string;
  code: string;
  name: string;
  permissions: RolePermissions;
  isActive: boolean;
}

export interface RoleGroup {
  name: string;
  permissions: Permission[];
}