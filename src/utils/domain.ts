
const DEVELOPMENT_DOMAIN = "http://localhost:3000/"
const PRODUCTION_DOMAIN = ""

export const Domain = process.env.NODE_ENV === "production" ? PRODUCTION_DOMAIN : DEVELOPMENT_DOMAIN ;