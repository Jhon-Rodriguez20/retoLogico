import React, { useState, useEffect } from "preact/compat";
import { Form, Row, Col } from "react-bootstrap";

function CalculateCaloriesForm({ age, setAge, weight, setWeight, height, setHeight,
    calculateCalories, selectedOption, setSelectedOption }) {

    const [calories, setCalories] = useState(null);
    const [errors, setErrors] = useState({});

    const handleValidation = () => {
        const newErrors = {};
    
        const validateNumber = (value, fieldName, minValue, maxValue) => {
            const valueAsString = value.toString();
            if (isNaN(valueAsString) || valueAsString < minValue || valueAsString > maxValue) {
                newErrors[fieldName] = `Ingrese un número válido entre ${minValue} y ${maxValue}.`;
            }
        }        
    
        validateNumber(age, 'age', 16, 105);
        validateNumber(weight, 'weight', selectedOption === "1" ? 40.5 : 89.28, selectedOption === "1" ? 300 : 661.38);
        validateNumber(height, 'height', selectedOption === "1" ? 140 : 55.11, selectedOption === "1" ? 225 : 88.58);
        
        if (selectedOption === "1") {
            const heightValueMeters = parseFloat(height.replace(',', '.')) / 100;
            validateNumber(heightValueMeters, 'height', 1.4, 2.25);
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setCalories(null);
            return false;
        } else {
            setErrors({});
            const calculatedCalories = calculateCalories(weight, height, age, selectedOption);
            setCalories(calculatedCalories);
        }
    }      

    useEffect(() => {
        handleValidation();
    }, [age, weight, height, selectedOption]);   

    return (
        <Form>
            <Row>
                <Col md="6" lg="6" sm="12">
                    <Form.Group className="mb-3" controlId="sistemMetric">
                        <Form.Label className="fw-semibold fs-5">Sistema métrico preferido</Form.Label>
                        <Form.Select
                            required
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="">Seleccione</option>
                            <option value="1">Decimal (kilogramos y centímetros)</option>
                            <option value="2">Imperial (Libras y pulgadas)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md="6" lg="6" sm="12">
                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label className="fw-semibold fs-5">Edad (años)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese su edad en años"
                            pattern="[0-9]+"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            isInvalid={!!errors.age}
                        />
                        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            {selectedOption === "1" && (
                <Row>
                    <Col md="6" lg="6" sm="12">
                        <Form.Group className="mb-3" controlId="weight">
                            <Form.Label className="fw-semibold fs-5">Peso (kg)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su peso en kilogramos"
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                isInvalid={!!errors.weight}
                            />
                            <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md="6" xs="12">
                        <Form.Group className="mb-3" controlId="height">
                            <Form.Label className="fw-semibold fs-5">Altura (cm)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su altura en centímetros"
                                required
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                isInvalid={!!errors.height}
                            />
                            <Form.Control.Feedback type="invalid">{errors.height}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            )}
            {selectedOption === "2" && (
                <Row>
                    <Col md="6" lg="6" sm="12">
                        <Form.Group className="mb-3" controlId="weight">
                            <Form.Label className="fw-semibold fs-5">Peso (lb)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su peso en libras"
                                required
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                isInvalid={!!errors.weight}
                            />
                            <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md="6" lg="6" sm="12">
                        <Form.Group className="mb-3" controlId="height">
                            <Form.Label className="fw-semibold fs-5">Altura (in)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su altura en pulgadas"
                                required
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                isInvalid={!!errors.height}
                            />
                            <Form.Control.Feedback type="invalid">{errors.height}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
            )}
            {calories !== null && (
                <div className="text-center mt-5 mb-3">
                    <h3>Calorías recomendadas: {calories} kcal</h3>
                </div>
            )}
        </Form>
    )
}

export { CalculateCaloriesForm }