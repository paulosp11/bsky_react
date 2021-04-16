import { Server, hasMany, belongsTo, Response, Factory, Model } from "miragejs";
import * as user from "./routes/user";
import * as diary from "./routes/diary";

export const handleErrors = (
  error: any,
  message = "An error occured"
): Response => {
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
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        user: "test",
        password: "test1234",
        email: "test@gmail.com",
      }),
    },

    seeds: (server): any => {
      server.create("user");
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";
      this.get("/diaries/entry/:id", diary.getEntries);
      this.get("/diaries/:id", diary.getDiaries);
      this.post("/diaries/", diary.create);
      this.post("/diaries/entry/:id", diary.addEntry);
      this.post("/auth/login", user.login);
      this.post("/auth/signup", user.signup);
      this.put("/diaries/entry/:id", diary.updateEntry);
      this.put("/diaries/:id", diary.updateDiary);
    },
  });
};
