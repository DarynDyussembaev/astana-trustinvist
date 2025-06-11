export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  actions?: {
    delete?: boolean;
    edit?: boolean;
    view?: boolean;
  };
}
