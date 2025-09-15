<?php

namespace App\Mail;

use App\Models\Patient;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PatientConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $patient;

    public function __construct(Patient $patient)
    {
        $this->patient = $patient;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Registration Successful',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.patient_confirmation',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

