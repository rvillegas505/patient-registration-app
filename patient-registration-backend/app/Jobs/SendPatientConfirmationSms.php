<?php

namespace App\Jobs;

use App\Models\Patient;
use App\Services\Sms\SmsSender;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendPatientConfirmationSms implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public Patient $patient;

    public function __construct(Patient $patient)
    {
        $this->patient = $patient;
    }

    public function handle(SmsSender $smsSender): void
    {
        $to = $this->patient->phone;
        if (empty($to)) {
            return;
        }

        $message = 'Hi ' . $this->patient->full_name . ', your registration was successful.';
        $smsSender->send($to, $message);
    }
}


