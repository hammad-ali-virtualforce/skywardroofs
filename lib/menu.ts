import type { MenuItem } from "@/lib/site-data";

export function getMenuItemHref(item: MenuItem): string {
  if (item.path) {
    return item.path;
  }

  if (item.uri) {
    return item.uri;
  }

  if (item.url) {
    return item.url;
  }

  return "#";
}