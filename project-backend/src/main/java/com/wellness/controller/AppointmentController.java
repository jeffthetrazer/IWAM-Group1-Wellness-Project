package com.wellness.controller;

import com.wellness.dao.AppointmentRequest;
import com.wellness.model.Appointment;
import com.wellness.model.User;
import com.wellness.service.AppointmentService;
import com.wellness.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins="http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;
    
    @Autowired
    private UserService userService;

//    @PostMapping("/book")
//    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest request) {
//        String email = request.getEmail();
//        Appointment appointment = request.getAppointment();
//        Appointment bookedAppointment = appointmentService.bookAppointment(email, appointment);
//        return ResponseEntity.ok(bookedAppointment);
//    }
    
    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        // Extract email and other details from the request body
        String email = appointmentRequest.getEmail();
        Appointment appointment = new Appointment();
        appointment.setCourseName(appointmentRequest.getCourseName());
        appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
        appointment.setAppointmentTime(appointmentRequest.getAppointmentTime());

        // Fetch user and set to appointment
        User user = userService.findByEmail(email);
        if (user != null) {
            appointment.setUser(user);
            appointmentService.save(appointment);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.findById(id);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserEmail(@PathVariable String email) {
        List<Appointment> appointments = appointmentService.getAppointmentsByUserEmail(email);
        if (appointments.isEmpty()) {
            return ResponseEntity.noContent().build(); // No appointments found
        }
        return ResponseEntity.ok(appointments);
    }
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteAppointmentByEmail(@PathVariable String email) {
        // Find user by email
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Fetch appointments associated with the user
        List<Appointment> appointments = appointmentService.getAppointmentsByUserEmail(email);

        if (appointments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No appointments found for this user");
        }

        // Assume you want to delete the first appointment found (modify logic if needed)
        Appointment appointmentToDelete = appointments.get(0);

        // Delete the appointment
        appointmentService.deleteAppointment(appointmentToDelete.getId());

        return ResponseEntity.ok("Appointment deleted successfully");
    }


    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateAppointmentByEmail(
        @PathVariable String email, 
        @RequestBody AppointmentRequest appointmentRequest
    ) {
        // Find user by email
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Fetch appointments associated with the user
        List<Appointment> appointments = appointmentService.getAppointmentsByUserEmail(email);

        if (appointments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No appointments found for this user");
        }

        // Assume you want to update the first appointment found (modify logic if needed)
        Appointment appointmentToUpdate = appointments.get(0);

        // Update the appointment details
        appointmentToUpdate.setCourseName(appointmentRequest.getCourseName());
        appointmentToUpdate.setAppointmentDate(appointmentRequest.getAppointmentDate());
        appointmentToUpdate.setAppointmentTime(appointmentRequest.getAppointmentTime());

        // Save the updated appointment
        appointmentService.save(appointmentToUpdate);

        return ResponseEntity.ok(appointmentToUpdate);
    }

}
