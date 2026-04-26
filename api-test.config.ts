

export const config = {

    apiUrl: process.env.API_BASE_URL ?? '',
    userEmail: process.env.USER_EMAIL ?? '',
    userPassword: process.env.USER_PASSWORD ?? ''
    webUrl: process.env.WEB_BASE_URL ?? ''

}

if (!config.apiUrl || !config.userEmail || !config.userPassword) {
  throw new Error('Missing environment variables. Check your .env file.');
}




