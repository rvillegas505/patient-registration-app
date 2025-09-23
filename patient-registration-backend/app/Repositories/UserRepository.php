<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository
{

    function findByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    function create(array $data)
    {
        return User::create($data);
    }
}