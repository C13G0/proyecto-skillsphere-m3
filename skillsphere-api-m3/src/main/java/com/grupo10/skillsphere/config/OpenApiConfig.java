package com.grupo10.skillsphere.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SkillSphere API")
                        .description("API REST para la plataforma SkillSphere: gestión de estudiantes, certificados y ofertas laborales.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipo SkillSphere")
                                .email("skillsphere@grupo10.com")));
    }
}