<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('users')->insert([
            'name' => 'Administrador Root',
            'email' => 'root@email.com',
            'password' => Hash::make('@Areia2020'), 
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
            'root' => true,
            'status' => true
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')->where('email', 'root@example.com')->delete();
    }
};
