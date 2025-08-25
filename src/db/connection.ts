import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { type App } from "electron";

// Die Verbindung wird hergestellt und db zurückgegeben
export async function connection(app: App): Promise<Low<DBData>> {
  const dbPath = path.join(app.getAppPath(), "src", "db", "db.json"); // kein führender Slash
  console.log(dbPath);
  const adapter = new JSONFile<DBData>(dbPath);
  const db = new Low<DBData>(adapter, { ghosts: [] });

  await db.read();
  if (!db.data) {
    db.data = { ghosts: [] };
  }
  console.log("DB connected");
  try {
    const ghosts = db.data.ghosts;
    if (!ghosts || ghosts.length === 0) {
      throw Error("no Data");
    }
  } catch (error: any) {
    console.log(error);
  }
  return db;
}
