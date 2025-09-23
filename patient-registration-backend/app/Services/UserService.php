<?php
namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;


class UserService
{
    private $userRepo;

    public function __construct(UserRepository $userRepo) {
        $this->userRepo = $userRepo;
    }

    public function findByEmail(string $email) {
        return $this->userRepo->findByEmail($email);
    }

    public function register(array $data) {
        if ($this->findByEmail($data['email'])) {
            return response()->json(['message' => 'Email already registered'], 409);
        }

        $user = $this->userRepo->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            ]
        );
        return $user;
    }
}