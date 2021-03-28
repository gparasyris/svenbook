import { IDashboardColumn } from "@interfaces/dashboard-column.interface"

export interface IDashboardLayout {
  type: string;
  columns: IDashboardColumn[];
}
