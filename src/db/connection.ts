import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { type App } from "electron";

// Die Verbindung wird hergestellt und db zurückgegeben
export async function connection(app: App): Promise<Low<DBData>> {
  const dbPath = path.join(__dirname, "db.json");
  const adapter = new JSONFile<DBData>(dbPath);
  const db = new Low<DBData>(adapter, { ghosts: [] });

  await db.read();
  if (!db.data) {
    db.data = { ghosts: [] };
  }
  console.log("DB connected" + db.data);
  return db;
}
