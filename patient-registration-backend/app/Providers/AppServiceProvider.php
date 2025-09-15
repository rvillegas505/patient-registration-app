<?php

namespace App\Providers;

use App\Services\Sms\NullSmsSender;
use App\Services\Sms\SmsSender;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SmsSender::class, function () {
            // For now we only bind the NullSmsSender. In the future this can
            // read config('sms.provider') to return a real provider implementation
            return new NullSmsSender();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
