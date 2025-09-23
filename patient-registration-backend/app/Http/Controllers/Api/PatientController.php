<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PatientService;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    protected $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    public function index()
    {
        $patients = $this->patientService->getAllPatients();
        return response()->json([
            'data' => $patients
        ]);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required|string|max:20',
            'document_photo' => 'required|image|mimes:jpg,jpeg|max:2048',
        ]);

        $patient = $this->patientService->register($validated);

        return response()->json([
            'message' => 'Patient registered successfully',
            'data' => $patient
        ], 201);
    }
}
