/**
 * Module to handle URI stuffs.
 */

export interface Entry {
  url: string;
  hits: number;
}

export interface Parsed {
  command: string;
  url: string | null;
  url_path: string | null;
  short: string | null;
  flag: boolean;
}

/**
 * Create new entry
 * @param url long url
 */
export function newEntry(url: string) {
  let entry: Entry = {
    url: "",
    hits: 0,
  };
  entry.url = url;
  return entry;
}

/**
 * Parse input string.
 * @param input input string as specifiec in metricsui.com
 * @return Parsed object
 */
export function parse(input: string): Parsed {
  const host = "http://localhost";
  const url = new URL(host + input);
  let parsed: Parsed = {
    command: "",
    url: "",
    url_path: "",
    short: "",
    flag: false,
  };

  parsed.command = url.pathname;
  parsed.url = url.searchParams.get("url");
  parsed.short = url.searchParams.get("short_path");

  if (parsed.url !== null) {
    var temp = new URL(parsed.url);
    if (temp.host === "pendekin.id") parsed.flag = true;
    parsed.url_path = (temp.pathname.slice(1) === "")
      ? null
      : temp.pathname.slice(1);
  }

  return parsed;
}
