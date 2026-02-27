-- appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    expert_id INT REFERENCES expert(id),
    appointment_date DATE,
    status VARCHAR(50)
);