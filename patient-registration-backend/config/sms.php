<?php

return [
    'enabled' => env('SMS_ENABLED', false),

    // Placeholder for future providers like twilio, vonage, messagebird, etc.
    'provider' => env('SMS_PROVIDER', 'null'),

    // Optional sender id/number if provider supports it
    'from' => env('SMS_FROM', ''),
];


