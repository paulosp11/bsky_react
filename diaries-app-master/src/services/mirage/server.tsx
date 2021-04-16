import { Server, Model, Factory, belongsTo, hasMany, Response } from "miragejs";
import user from "../routes/user";
import * as diary from "../routes/diary";
import * as entry from "../routes/entry";

export const handleErrors = (error: any, message = "An error ocurred") => {
  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "development",

    models: {
      user: Model.extend({
        diary: hasMany(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        dairy: belongsTo(),
      }),
      entry: Model.extend({
        diary: belongsTo(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: "test",
        password: "12345",
        email: "diary@gmail.com",
      }),
    },

    seeds: (server): any => {
      server.create("user");
    },
    routes(): void {
      this.urlPrefix = "https://localhost:3000";

      this.get("/diaries/entries/:id", entry.getEntries);
      this.get("/diaries/:id", diary.getDiaries);

      this.post("/login", user.login);
      this.post("/signup", user.signUp);
      this.post("/diaries/", diary.create);
      this.post("/diaries/entry/:id", entry.addEntry);

      this.put("/diaries/entry/:id", entry.updateEntry);
      this.put("/diaries/:id", diary.updateDiary);
    },
  });
};
