interface Config {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

function getConfig(): Config {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  // API URL configuration
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (isDevelopment
      ? "http://localhost:3001"
      : "https://your-production-api-url.com");

  return {
    apiUrl,
    isDevelopment,
    isProduction,
  };
}

export const config = getConfig();
