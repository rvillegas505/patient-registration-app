<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;

Route::get('/patients', [PatientController::class, 'index'])->middleware('auth:sanctum');
Route::post('/patients', [PatientController::class, 'store']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
