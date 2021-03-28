import { IWidget } from "@interfaces/widget.interface"

export interface IDashboardColumn {
  size: string;
  widgets: IWidget[];
}
