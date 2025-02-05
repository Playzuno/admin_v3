export interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface RolePermissions {
  // Super Admin Access
  viewRole: boolean;
  modifyRole: boolean;
  deleteRole: boolean;
  addNewRole: boolean;

  // Brand/Product
  viewProduct: boolean;
  modifyProduct: boolean;
  deleteProduct: boolean;
  addProduct: boolean;

  // Transaction Management
  viewTransaction: boolean;
  exportTransaction: boolean;
  deleteTransaction: boolean;
  managePayments: boolean;

  // Settings Management
  viewSettings: boolean;
  modifySettings: boolean;
  manageIntegrations: boolean;
  manageNotifications: boolean;
}

export interface Role {
  id?: string;
  description: string;
  name: string;
  permissions: string[];
  status: string;
}

export interface RoleGroup {
  name: string;
  permissions: Permission[];
}
