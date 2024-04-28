import React, { useState } from "preact/compat";
import { Col, Container, Row } from "react-bootstrap";
import { CalculateCaloriesForm } from "../components/calculateCaloriesForm";

function CalculateCalories() {
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");    
    const [calories, setCalories] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");

    const calculateCalories = (weight, height, age, selectedOption) => {
        let weightValue = parseFloat(weight.replace(',', '.'));
        let heightValue = parseFloat(height.replace(',', '.'));
    
        if (selectedOption === "1") {
            weightValue *= 2.2046; // equivalencia de kilogramos a libras
            heightValue *= 0.3937; // equivalencia de centimetros a pulgadas
        }
    
        let factor = weightValue < 165 ? 1.6 : weightValue >= 165 && weightValue <= 200 ? 1.4 : weightValue > 200 && weightValue <= 220 ? 1.2 : 1;
    
        const calculatedCalories = ((10 * weightValue) + (6.25 * heightValue) - (10 * age) + 5) * factor;
        return calculatedCalories.toFixed(2);
    }     

    return (
        <Container>
            <Row className="justify-content-md-center mt-3 mb-3">
                <Col sm="12" md="10" lg="6">
                    <h3 className="text-center mt-5 mb-5 fw-bold fs-3 text-uppercase">Calcular calorías</h3>
                    <CalculateCaloriesForm
                        age={age}
                        setAge={setAge}
                        weight={weight}
                        setWeight={setWeight}
                        height={height}
                        setHeight={setHeight}
                        setCalories={setCalories}
                        calculateCalories={calculateCalories}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
                </Col>
            </Row>
            {calories !== null && (
                <div className="text-center mt-5 mb-3">
                    <h3>Calorías recomendadas: {calories} kcal</h3>
                </div>
            )}
        </Container>
    )
}

export { CalculateCalories }