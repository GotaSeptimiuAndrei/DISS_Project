// This file catches ALL requests sent to /api/*
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // 1. Define your Spring Boot backend URL
  // (Change this to your actual Fly.io, Render, or local backend URL)
  const BACKEND_URL = "https://mentormatch-backend.fly.dev"; 

  // 2. Construct the new destination URL
  // Example: converts https://localhost/api/auth/login 
  // to https://mentormatch-backend.fly.dev/api/auth/login
  const targetUrl = BACKEND_URL + url.pathname + url.search;

  // 3. Forward the exact request (including POST data, JWT headers, etc.)
  const modifiedRequest = new Request(targetUrl, request);
  
  return fetch(modifiedRequest);
}