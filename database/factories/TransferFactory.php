<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transfer>
 */
class TransferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'remitente' => fake()->name(),
            'destinatario' => fake()->name(),
            'fecha' => fake()->date(),
            'agente' => fake()->name(),
            'monto' => fake()->randomFloat(2, 10, 1000),
            'estado' => fake()->randomElement(['pendiente', 'completado']),
            'observacion' => fake()->sentence(),

        ];
    }
}