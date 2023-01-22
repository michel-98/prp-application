package it.cgm.prp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("it.cgm.prp.model")
@EnableJpaRepositories("it.cgm.prp.repository")
public class PrpApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrpApplication.class, args);
    }

}
