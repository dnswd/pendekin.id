import { Entry, newEntry, parse } from "./module/uri.ts";
import { Random } from "https://deno.land/x/random@v1.1.2/Random.js";
import { prompt } from "./module/cli.ts";

let db = new Map<string, Entry>();
let bucket: string[] = [];

let banner: string = `
  _____               _      _    _         _     _ 
 |  __ \\             | |    | |  (_)       (_)   | |
 | |__) |__ _ __   __| | ___| | ___ _ __    _  __| |
 |  ___/ _ \\ '_ \\ / _  |/ _ \\ |/ / | '_ \\  | |/ _  |
 | |  |  __/ | | | (_| |  __/   <| | | | |_| | (_| |
 |_|   \\___|_| |_|\\__,_|\\___|_|\\_\\_|_| |_(_)_|\\__,_|                                                 
===================================================
Welcome to Pendekin.id console!
Type "\\exit" to exit the console.
`;

/**
 * Entry point.
 */
if (import.meta.main) {
  console.log(banner);

  while (true) {
    let cmd = await prompt(">> ");
    let parsed = parse(cmd);

    switch (parsed.command) {
      case "/shorten":
        shorten(parsed.url, parsed.short);
        break;
      case "/redirect":
        redirect(parsed.flag, parsed.url_path);
        break;
      case "/delete":
        del(parsed.flag, parsed.url_path);
        break;
      case "/count":
        count(parsed.flag, parsed.url_path);
        break;
      case "/exit":
        Deno.exit(0);
      default:
        break;
    }
    console.log();
  }
}

function shorten(url: string | null, short: string | null) {
  if (url === null) return;
  if (bucket.includes(url)) {
    db.forEach((k, v) => {
      let [in_url, hit] = v;
      if (in_url === url) {
        console.log("https://pendekin.id/" + k);
        return;
      }
    });
  }
  if (short === null) {
    const r = new Random();
    short = r.string(5, Random.LOWER_ALPHA_NUMERICS);
  }

  db.set(short, newEntry(url));
  bucket.push(url);
  console.log("https://pendekin.id/" + short);
}

// Functions below could be refactored but I don't have time for that :/
function redirect(flag: boolean, url_path: string | null) {
  if (flag && url_path !== null) {
    if (db.has(url_path)) {
      console.log(db.get(url_path)!.url);
      db.get(url_path)!.hits++;
    } else console.log(`Error: ${url_path} not found in the service`);
  } else {
    console.log("Error: 404 Not found");
  }
}

function del(flag: boolean, url_path: string | null) {
  if (flag && url_path !== null) {
    if (db.has(url_path)) {
      var success = db.delete(url_path);
      if (success) console.log("Success");
      else console.log("Failed to delete, the element may still exist on db");
    } else console.log(`Error: ${url_path} not found in the service`);
  } else {
    console.log("Error: 404 Not found");
  }
}

function count(flag: boolean, url_path: string | null) {
  if (flag && url_path !== null) {
    if (db.has(url_path)) console.log(db.get(url_path)?.hits);
    else console.log(`Error: ${url_path} not found in the service`);
  } else {
    console.log("Error: 404 Not found");
  }
}
