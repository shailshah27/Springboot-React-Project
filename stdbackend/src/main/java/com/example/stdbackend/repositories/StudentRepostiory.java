package com.example.stdbackend.repositories;

import com.example.stdbackend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepostiory extends JpaRepository<Student, Integer> {

}
