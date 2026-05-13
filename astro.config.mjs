// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: cloudflare(),
    env: {
        schema: {
            CLIENT_ID: envField.string({
                    context: 'server',
                    access: 'secret',
                    default: ''
                }),
            CLIENT_SECRET: envField.string({
                    context: 'server',
                    access: 'secret',
                    default: ''
                }),
        }
    }
});
