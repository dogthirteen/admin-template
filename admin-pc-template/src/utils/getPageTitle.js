import defaultSettings from "@/settings";

const title = defaultSettings.title || "后台管理模板";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
