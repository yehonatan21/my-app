import env from "env-var";

export const config = {
  FRONT_PORT: env.get("FRONT_PORT").default(8000).asInt(),
  FRONT_IP: env.get("FRONT_IP").default("127.0.0.1").asString(),
};
