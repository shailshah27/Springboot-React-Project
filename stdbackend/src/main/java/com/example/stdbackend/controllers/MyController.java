package com.example.stdbackend.controllers;

import com.example.stdbackend.models.Student;
import com.example.stdbackend.repositories.StudentRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MyController {

    @Autowired
    StudentRepostiory studentRepostiory; //Dependency injection

    @GetMapping
    public String getWelcomeMessage() {
        return "<h1>Welcome to your application</h1>";
    }

    @GetMapping("/students") //http://localhost:8080/students
    public List<Student> getListOfStudents() {
        return studentRepostiory.findAll(); //select * from student;
    }

    @PostMapping("/student") //HTTP Post http://localhost:8080/student {Body - Student's data}
    public String addStudent(@RequestBody Student student) {
        boolean studentExists = studentRepostiory.existsById(student.getId());
        if(!studentExists) {
            studentRepostiory.save(student); //insert into student values (?, ?, ?)
            return "Record saved successfully";
        } else {
            return "Student already exists";
        }
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudent(@PathVariable Integer id) {
        boolean studentExists = studentRepostiory.existsById(id);
        if(studentExists) {
            studentRepostiory.deleteById(id);
            return "Record deleted successfully";
        } else {
            return "Student does not exist";
        }
    }

    @PutMapping("/student/{id}")
    public String updateStudent(@RequestBody Student student, @PathVariable Integer id) {
        Student existingStudent = studentRepostiory.findById(id).get();
        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        studentRepostiory.save(existingStudent);
        return "Record updated successfully";
    }

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable Integer id) {
        return studentRepostiory.findById(id).get();
    }
}
