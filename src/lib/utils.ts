import { format } from "date-fns";

export const chatHrefConstructor = (id1: string, id2: string) => {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
};

export enum DateFormat {
  HHmm = "HH:mm",
}
export const formatDate = (time: any, dateFormat: DateFormat) => {
  return format(time, dateFormat);
};

export const toPusherKey = (key: string) => {
  return key.replace(/:/g, "__");
};
