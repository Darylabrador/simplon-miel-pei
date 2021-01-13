<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgottenPassword extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $identity;
    public $resetUrl;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($identity, $resetUrl)
    {
        $this->identity = $identity;
        $this->resetUrl = $resetUrl;
        $this->subject('Miel Péi - Réinitialisation mot de passe');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.forgottenPassword');
    }
}
