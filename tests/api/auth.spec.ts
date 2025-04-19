import { test } from "@playwright/test";
import { AuthAPI } from "../../pages/api/AuthAPI";
import { usersAPI } from "../../data/apiTestData";

test('Login should return status 200 and token', async ({ request }) => {
    const auth = new AuthAPI(request);
    await auth.login(usersAPI.admin);
    //invalid user
    await auth.login(usersAPI.invalid);
    //empty user
    await auth.login(usersAPI.empty);
    //missing username
    await auth.login(usersAPI.missingUsername);
    //missing password
    await auth.login(usersAPI.missingPassword);
    
});


