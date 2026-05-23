package com.grupo10.skillsphere.config;

import com.grupo10.skillsphere.model.entity.Usuario;
import com.grupo10.skillsphere.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initData(UsuarioRepository usuarioRepository) {
        return args -> {
            if (usuarioRepository.count() == 0) {

                // Crear usuario administrador inicial (Contraseña directa en texto plano)
                Usuario admin = Usuario.builder()
                        .username("admin")
                        .password("admin123")
                        .role("ROLE_ADMIN")
                        .build();

                // Crear usuario común inicial (Contraseña directa en texto plano)
                Usuario user = Usuario.builder()
                        .username("user")
                        .password("user123")
                        .role("ROLE_USER")
                        .build();

                usuarioRepository.save(admin);
                usuarioRepository.save(user);

                System.out.println("✅ Usuarios iniciales creados (sin seguridad).");
            }
        };
    }
}