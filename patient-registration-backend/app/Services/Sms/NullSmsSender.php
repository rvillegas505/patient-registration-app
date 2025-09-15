<?php

namespace App\Services\Sms;

use Illuminate\Support\Facades\Log;

class NullSmsSender implements SmsSender
{
    public function send(string $toPhoneE164, string $message): void
    {
        // Intentionally do nothing; useful for local/dev and for deferring provider decisions
        Log::info('NullSmsSender: skipping SMS send', [
            'to' => $toPhoneE164,
            'message' => $message,
        ]);
    }
}


