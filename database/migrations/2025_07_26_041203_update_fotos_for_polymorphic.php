<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('fotos', function (Blueprint $table) {
    $table->dropForeign(['transfer_id']);
    $table->dropColumn('transfer_id');

    $table->unsignedBigInteger('imageable_id');
    $table->string('imageable_type');
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};