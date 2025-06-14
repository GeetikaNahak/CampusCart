import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: 'campus-cart-app-api',
  issuerBaseURL: 'https://dev-u4cexii23wkuqb3p.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});