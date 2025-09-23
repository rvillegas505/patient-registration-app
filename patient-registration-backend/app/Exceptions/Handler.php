<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        // Always return a JSON response for API routes
        $status = 500;
        $message = 'Server Error';

        if ($e instanceof AuthenticationException) {
            $status = 401;
            $message = 'Unauthenticated';
        } elseif ($e instanceof NotFoundHttpException) {
            $status = 404;
            $message = 'Not Found';
        } elseif ($e instanceof MethodNotAllowedHttpException) {
            $status = 405;
            $message = 'Method Not Allowed';
        } elseif ($e instanceof HttpException) {
            $status = $e->getStatusCode();
            $message = $e->getMessage() ?: 'Http Error';
        } elseif (config('app.debug')) {
            // En modo debug muestro el mensaje real para facilitar desarrollo
            $message = $e->getMessage();
        }

        return response()->json([
            'message' => $message,
        ], $status);
    }
}
