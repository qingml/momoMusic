let baseURL: string;

const devURL = "http://localhost:3000";

const proURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = devURL;
} else if (process.env.NODE_ENV === "production") {
  baseURL = proURL;
}

export { baseURL };
