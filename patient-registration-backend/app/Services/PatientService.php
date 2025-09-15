<?php

namespace App\Services;

use App\Repositories\PatientRepository;
use App\Jobs\SendPatientConfirmationEmail;
use Illuminate\Support\Facades\Storage;

class PatientService
{
    protected $patientRepository;

    public function __construct(PatientRepository $patientRepository)
    {
        $this->patientRepository = $patientRepository;
    }

    public function register(array $data)
    {
        $path = $data['document_photo']->store('documents', 'public');
        $data['document_photo'] = $path;

        $patient = $this->patientRepository->create($data);

        dispatch(new SendPatientConfirmationEmail($patient));

        return $patient;
    }

    public function getAllPatients() 
    {
        return $this->patientRepository->getAll();
    }
}
