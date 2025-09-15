<?php
namespace App\Repositories;

use App\Models\Patient;

class PatientRepository
{
    public function create(array $data): Patient
    {
        return Patient::create($data);
    }

    public function findByEmail(string $email): ?Patient
    {
        return Patient::where('email', $email)->first();
    }

    public function getAll() 
    {
        return Patient::all();
    }

}
