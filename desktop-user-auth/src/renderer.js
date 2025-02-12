/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

// console.log(window.electronAPI);


// window.bridge.send("tesing asd;kfldsj;l");


window.addEventListener('DOMContentLoaded', () => {
    const regFormElement = document.querySelector('#registrationForm');
    // const button = document.querySelector('button');
    const submitResponseElement = document.querySelector('#submitResponse');

    regFormElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        // console.log("Registration form submit", event.target);

        const regFormData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        console.log(regFormData);

        if (regFormData.password.length < 6) {
            submitResponseElement.innerHTML = "Password must be at least 6 characters";
            return;
        }

        // send data to main process
        const renRes = await window.bridge.formData(regFormData);
        console.log({ renRes });
        if (!renRes.id) {
            submitResponseElement.innerHTML = renRes.error;
            return;
        }

        submitResponseElement.innerHTML = `You have successfully registered with Email: ${renRes.email}`
    })

})


// window.bridge.formData('');