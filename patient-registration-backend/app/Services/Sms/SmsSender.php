<?php

namespace App\Services\Sms;

interface SmsSender
{
    /**
     * Send an SMS message to a given phone number.
     */
    public function send(string $toPhoneE164, string $message): void;
}


