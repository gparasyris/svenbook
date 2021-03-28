import { IWidgetConfiguration } from "@interfaces/widget-configuration.interface";

export interface IWidget {
  type: string;
  configuration: IWidgetConfiguration;
}
